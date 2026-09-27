#!/usr/bin/env node

import { promises as dns } from "node:dns";
import { once } from "node:events";
import https from "node:https";
import { BlockList, isIP } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SERVER_NAME = "reference-preview";
export const TOOL_NAME = "fetch_reference_preview_image";
export const MAX_IMAGE_BYTES = 92 * 1024;
export const MAX_IMAGE_DIMENSION = 4_096;
export const MAX_IMAGE_PIXELS = 8_388_608;
export const MAX_JSONRPC_LINE_BYTES = 1_048_576;
export const MAX_CONCURRENT_REQUESTS = 8;
export const REQUEST_TIMEOUT_MS = 8_000;
export const MAX_REDIRECTS = 3;

const DEFAULT_PROTOCOL_VERSION = "2025-11-25";
const SUPPORTED_PROTOCOL_VERSIONS = new Set([
  "2025-06-18",
  "2025-11-25",
]);
const SUPPORTED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const SOURCE_HOSTS = {
  pinterest: "pinterest.com",
};
const PREVIEW_HOSTS = {
  pinterest: new Set(["i.pinimg.com"]),
};
const PINTEREST_SIZE_SEGMENTS = new Set(["originals", "236x", "474x", "564x", "736x"]);
const INPUT_KEYS = new Set([
  "id",
  "provider",
  "title",
  "preview_image_url",
  "source_url",
  "original_source_url",
  "creator",
  "query",
  "fit_note",
  "visual_dna",
  "width",
  "height",
]);

const BLOCKED_IPS = new BlockList();
for (const [address, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.88.99.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
]) {
  BLOCKED_IPS.addSubnet(address, prefix, "ipv4");
}
for (const [address, prefix] of [
  ["::", 128],
  ["::1", 128],
  ["100::", 64],
  ["2001:db8::", 32],
  ["fc00::", 7],
  ["fe80::", 10],
  ["ff00::", 8],
]) {
  BLOCKED_IPS.addSubnet(address, prefix, "ipv6");
}

const REFERENCE_OUTPUT_PROPERTIES = {
  id: { type: "string" },
  provider: { type: "string" },
  title: { type: "string" },
  source_url: { type: "string" },
  preview_image_url: { type: "string" },
  fetched_preview_url: { type: "string" },
  final_preview_url: { type: "string" },
  original_source_url: { type: ["string", "null"] },
  creator: { type: "string" },
  query: { type: "string" },
  fit_note: { type: "string" },
  visual_dna: { type: "string" },
  reported_width: { type: "integer" },
  reported_height: { type: "integer" },
  mime_type: { type: "string" },
  byte_length: { type: "integer" },
  intrinsic_width: { type: "integer" },
  intrinsic_height: { type: "integer" },
  provenance_mapping_verified: { type: "boolean" },
  display_transport: { const: "mcp-image-content" },
  rights_status: { const: "direction-only" },
};

export const TOOL_DEFINITION = {
  name: TOOL_NAME,
  title: "Fetch Pinterest Reference Preview Image",
  description:
    "Fetch one public Pinterest preview and return it as an inline MCP image with Pinterest-scoped provenance. Call once per finalist. Image-to-Pin mapping remains caller-supplied and must be verified by discovery. This read-only tool accepts only Pinterest Pin pages and i.pinimg.com previews; it never follows outbound Pin destinations, searches other providers, authenticates, scrapes protected pages, or fetches full-resolution assets.",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["id", "preview_image_url", "source_url"],
    properties: {
      id: { type: "string", minLength: 1, maxLength: 200 },
      provider: {
        type: "string",
        enum: ["pinterest", "Pinterest"],
      },
      title: { type: "string", maxLength: 300 },
      preview_image_url: { type: "string", format: "uri", maxLength: 1024 },
      source_url: { type: "string", format: "uri", maxLength: 1024 },
      original_source_url: {
        description:
          "Disabled compatibility field. Omit it or pass null; outbound Pin destinations are never accepted or returned.",
        anyOf: [
          { type: "string", format: "uri", maxLength: 1024 },
          { type: "null" },
        ],
      },
      creator: { type: "string", maxLength: 300 },
      query: { type: "string", maxLength: 300 },
      fit_note: { type: "string", maxLength: 600 },
      visual_dna: { type: "string", maxLength: 1000 },
      width: { type: "integer", minimum: 1, maximum: 100000 },
      height: { type: "integer", minimum: 1, maximum: 100000 },
    },
  },
  outputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["reference"],
    properties: {
      reference: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "provider",
          "source_url",
          "preview_image_url",
          "fetched_preview_url",
          "final_preview_url",
          "mime_type",
          "byte_length",
          "intrinsic_width",
          "intrinsic_height",
          "provenance_mapping_verified",
          "display_transport",
          "rights_status",
        ],
        properties: REFERENCE_OUTPUT_PROPERTIES,
      },
    },
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
};

class UserFacingError extends Error {}

function objectLike(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function boundedString(value, name, { required = false, max = 300 } = {}) {
  if (value === undefined || value === null) {
    if (required) throw new UserFacingError(`${name} is required.`);
    return undefined;
  }
  if (typeof value !== "string") throw new UserFacingError(`${name} must be a string.`);
  const trimmed = value.trim();
  if (required && trimmed.length === 0) throw new UserFacingError(`${name} must not be empty.`);
  if (trimmed.length > max) {
    throw new UserFacingError(`${name} must not exceed ${max} characters.`);
  }
  return trimmed;
}

function parseHttpsUrl(value, name) {
  const text = boundedString(value, name, { required: true, max: 1024 });
  let parsed;
  try {
    parsed = new URL(text);
  } catch {
    throw new UserFacingError(`${name} must be a valid HTTPS URL.`);
  }
  if (parsed.protocol !== "https:") throw new UserFacingError(`${name} must use HTTPS.`);
  if (parsed.username || parsed.password) {
    throw new UserFacingError(`${name} must not contain credentials.`);
  }
  if (parsed.port && parsed.port !== "443") {
    throw new UserFacingError(`${name} must use the standard HTTPS port.`);
  }
  if (parsed.hash) throw new UserFacingError(`${name} must not contain a fragment.`);
  return parsed;
}

function isHostOrSubdomain(hostname, base) {
  return hostname === base || hostname.endsWith(`.${base}`);
}

function providerFromSourceUrl(sourceUrl) {
  const host = sourceUrl.hostname.toLowerCase();
  if (!isHostOrSubdomain(host, SOURCE_HOSTS.pinterest)) {
    throw new UserFacingError(
      "source_url must point to a public Pinterest (pinterest.com) Pin page.",
    );
  }
  if (
    !/^\/pin\/(?:[1-9][0-9]*|[a-z0-9][a-z0-9-]{0,300}--[1-9][0-9]*)\/?$/i.test(
      sourceUrl.pathname,
    )
  ) {
    throw new UserFacingError("source_url must point to a public Pinterest /pin/<id>/ page.");
  }
  return "pinterest";
}

function assertAllowedPreviewHost(url, provider, name) {
  const host = url.hostname.toLowerCase();
  if (!PREVIEW_HOSTS[provider].has(host)) {
    throw new UserFacingError(
      `${name} for ${provider} must use an approved public preview CDN (${[
        ...PREVIEW_HOSTS[provider],
      ].join(", ")}).`,
    );
  }
}

export function normalizePreviewUrl(inputUrl, provider, name = "preview_image_url") {
  if (provider !== "pinterest") {
    throw new UserFacingError("provider must be Pinterest.");
  }
  const url = inputUrl instanceof URL ? new URL(inputUrl.href) : parseHttpsUrl(inputUrl, name);
  assertAllowedPreviewHost(url, provider, name);
  const segments = url.pathname.split("/");

  if (segments.length < 3 || !PINTEREST_SIZE_SEGMENTS.has(segments[1])) {
    throw new UserFacingError(`${name} must use a recognized Pinterest image-size path.`);
  }
  segments[1] = "236x";

  url.pathname = segments.join("/");
  url.search = "";
  url.hash = "";
  return url;
}

function optionalPositiveInteger(value, name) {
  if (value === undefined) return undefined;
  if (!Number.isInteger(value) || value < 1 || value > 100000) {
    throw new UserFacingError(`${name} must be an integer from 1 to 100000.`);
  }
  return value;
}

export function validateArguments(args) {
  if (!objectLike(args)) throw new UserFacingError("Tool arguments must be an object.");
  const unexpected = Object.keys(args).find((key) => !INPUT_KEYS.has(key));
  if (unexpected) throw new UserFacingError(`${unexpected} is not supported.`);

  const id = boundedString(args.id, "id", { required: true, max: 200 });
  const sourceUrl = parseHttpsUrl(args.source_url, "source_url");
  const provider = providerFromSourceUrl(sourceUrl);
  const suppliedProvider = boundedString(args.provider, "provider", { max: 20 });
  if (suppliedProvider && !["pinterest", "Pinterest"].includes(suppliedProvider)) {
    throw new UserFacingError("provider must be Pinterest.");
  }
  const previewUrl = parseHttpsUrl(args.preview_image_url, "preview_image_url");
  const fetchedPreviewUrl = normalizePreviewUrl(previewUrl, provider);

  if (args.original_source_url !== undefined && args.original_source_url !== null) {
    throw new UserFacingError(
      "original_source_url is disabled; the Pinterest Pin page is the only allowed provenance.",
    );
  }

  return {
    id,
    provider,
    title: boundedString(args.title, "title", { max: 300 }),
    preview_image_url: previewUrl.href,
    fetched_preview_url: fetchedPreviewUrl.href,
    provenance_mapping_verified: false,
    source_url: sourceUrl.href,
    original_source_url: null,
    creator: boundedString(args.creator, "creator", { max: 300 }),
    query: boundedString(args.query, "query", { max: 300 }),
    fit_note: boundedString(args.fit_note, "fit_note", { max: 600 }),
    visual_dna: boundedString(args.visual_dna, "visual_dna", { max: 1000 }),
    width: optionalPositiveInteger(args.width, "width"),
    height: optionalPositiveInteger(args.height, "height"),
  };
}

function isPublicIp(address) {
  const family = isIP(address);
  if (family === 4) return !BLOCKED_IPS.check(address, "ipv4");
  if (family !== 6) return false;
  const nat64 = address
    .toLowerCase()
    .match(/^64:ff9b::([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (nat64) {
    const high = Number.parseInt(nat64[1], 16);
    const low = Number.parseInt(nat64[2], 16);
    const mappedIpv4 = `${high >>> 8}.${high & 0xff}.${low >>> 8}.${low & 0xff}`;
    return !BLOCKED_IPS.check(mappedIpv4, "ipv4");
  }
  if (BLOCKED_IPS.check(address, "ipv6")) return false;
  const firstGroup = Number.parseInt(address.split(":", 1)[0] || "0", 16);
  return firstGroup >= 0x2000 && firstGroup <= 0x3fff;
}

export async function resolvePublicAddresses(hostname, lookup = dns.lookup) {
  let records;
  try {
    records = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new UserFacingError("The preview CDN hostname could not be resolved.");
  }
  const normalized = (Array.isArray(records) ? records : [records]).map((record) =>
    typeof record === "string" ? { address: record, family: isIP(record) } : record,
  );
  if (
    normalized.length === 0 ||
    normalized.some(
      (record) => !objectLike(record) || !isPublicIp(record.address) || ![4, 6].includes(record.family),
    )
  ) {
    throw new UserFacingError("The preview CDN resolved to a local or non-public network address.");
  }
  return normalized;
}

function headerValue(headers, name) {
  const direct = headers[name];
  const value =
    direct ??
    Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1];
  return Array.isArray(value) ? value[0] : value;
}

function pinnedLookup(records) {
  return (_hostname, options, callback) => {
    if (typeof options === "function") {
      options(null, records[0].address, records[0].family);
      return;
    }
    if (options?.all) {
      callback(null, records);
      return;
    }
    const requestedFamily = typeof options === "number" ? options : options?.family;
    const record = records.find((item) => !requestedFamily || item.family === requestedFamily) ?? records[0];
    callback(null, record.address, record.family);
  };
}

export async function requestOnce(
  url,
  {
    lookup = dns.lookup,
    httpsRequest = https.request,
    timeoutMs = REQUEST_TIMEOUT_MS,
    maxBytes = MAX_IMAGE_BYTES,
  } = {},
) {
  const startedAt = Date.now();
  let resolutionTimer;
  const records = await Promise.race([
    resolvePublicAddresses(url.hostname, lookup),
    new Promise((_, reject) => {
      resolutionTimer = setTimeout(
        () => reject(new UserFacingError("The preview request timed out during DNS resolution.")),
        timeoutMs,
      );
    }),
  ]).finally(() => clearTimeout(resolutionTimer));
  const remainingMs = timeoutMs - (Date.now() - startedAt);
  if (remainingMs <= 0) throw new UserFacingError("The preview request timed out.");

  return new Promise((resolve, reject) => {
    let settled = false;
    let request;
    let timer;
    const finish = (callback, value) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      callback(value);
    };

    try {
      request = httpsRequest(
        url,
        {
          method: "GET",
          agent: false,
          lookup: pinnedLookup(records),
          headers: {
            Accept: "image/jpeg, image/png, image/webp",
            "Accept-Encoding": "identity",
            "User-Agent": "reference-preview/1.0",
          },
        },
        (response) => {
          const statusCode = response.statusCode ?? 0;
          const headers = response.headers ?? {};
          const location = headerValue(headers, "location");
          if ([301, 302, 303, 307, 308].includes(statusCode)) {
            finish(resolve, { statusCode, headers, location, body: Buffer.alloc(0) });
            response.destroy();
            return;
          }

          const declaredLength = Number(headerValue(headers, "content-length"));
          if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
            finish(reject, new UserFacingError(`Preview exceeds the ${maxBytes}-byte size limit.`));
            response.destroy();
            return;
          }
          const contentEncoding = headerValue(headers, "content-encoding");
          if (contentEncoding && contentEncoding.toLowerCase() !== "identity") {
            finish(reject, new UserFacingError("Compressed preview responses are not accepted."));
            response.destroy();
            return;
          }

          const chunks = [];
          let byteLength = 0;
          response.on("data", (chunk) => {
            if (settled) return;
            const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
            byteLength += bytes.length;
            if (byteLength > maxBytes) {
              finish(reject, new UserFacingError(`Preview exceeds the ${maxBytes}-byte size limit.`));
              response.destroy();
              return;
            }
            chunks.push(bytes);
          });
          response.on("end", () => {
            finish(resolve, {
              statusCode,
              headers,
              location,
              body: Buffer.concat(chunks, byteLength),
            });
          });
          response.on("error", () => {
            finish(reject, new UserFacingError("The preview response could not be read."));
          });
        },
      );
    } catch {
      finish(reject, new UserFacingError("The preview image could not be fetched."));
      return;
    }
    timer = setTimeout(() => {
      finish(reject, new UserFacingError("The preview request timed out."));
      request.destroy();
    }, remainingMs);
    request.on("error", () => {
      finish(reject, new UserFacingError("The preview image could not be fetched."));
    });
    request.end();
  });
}

function normalizeMime(value) {
  if (typeof value !== "string") return undefined;
  const mime = value.split(";", 1)[0].trim().toLowerCase();
  return mime === "image/jpg" ? "image/jpeg" : mime;
}

function sniffMime(body) {
  if (body.length >= 3 && body[0] === 0xff && body[1] === 0xd8 && body[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    body.length >= 8 &&
    body.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return "image/png";
  }
  if (
    body.length >= 12 &&
    body.subarray(0, 4).toString("ascii") === "RIFF" &&
    body.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  return undefined;
}

function jpegDimensions(body) {
  if (body.length < 4 || body[0] !== 0xff || body[1] !== 0xd8) return undefined;
  let offset = 2;
  while (offset + 1 < body.length) {
    if (body[offset] !== 0xff) return undefined;
    while (offset < body.length && body[offset] === 0xff) offset += 1;
    if (offset >= body.length) return undefined;
    const marker = body[offset];
    offset += 1;
    if (marker === 0xd9 || marker === 0xda) return undefined;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (offset + 1 >= body.length) return undefined;
    const segmentLength = body.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > body.length) return undefined;
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isStartOfFrame) {
      if (segmentLength < 11) return undefined;
      const components = body[offset + 7];
      if (components < 1 || segmentLength !== 8 + 3 * components) return undefined;
      return {
        width: body.readUInt16BE(offset + 5),
        height: body.readUInt16BE(offset + 3),
      };
    }
    offset += segmentLength;
  }
  return undefined;
}

function pngDimensions(body) {
  if (
    body.length < 33 ||
    body.readUInt32BE(8) !== 13 ||
    body.subarray(12, 16).toString("ascii") !== "IHDR"
  ) {
    return undefined;
  }
  const bitDepth = body[24];
  const colorType = body[25];
  const validDepths = {
    0: new Set([1, 2, 4, 8, 16]),
    2: new Set([8, 16]),
    3: new Set([1, 2, 4, 8]),
    4: new Set([8, 16]),
    6: new Set([8, 16]),
  };
  if (
    !validDepths[colorType]?.has(bitDepth) ||
    body[26] !== 0 ||
    body[27] !== 0 ||
    ![0, 1].includes(body[28])
  ) {
    return undefined;
  }
  return { width: body.readUInt32BE(16), height: body.readUInt32BE(20) };
}

function webpDimensions(body) {
  if (body.length < 20 || body.readUInt32LE(4) + 8 !== body.length) return undefined;
  const fourcc = body.subarray(12, 16).toString("ascii");
  const chunkLength = body.readUInt32LE(16);
  const dataOffset = 20;
  if (dataOffset + chunkLength + (chunkLength % 2) > body.length) return undefined;
  if (fourcc === "VP8X") {
    if (
      chunkLength !== 10 ||
      (body[dataOffset] & 0xc3) !== 0 ||
      body[dataOffset + 1] !== 0 ||
      body[dataOffset + 2] !== 0 ||
      body[dataOffset + 3] !== 0
    ) {
      return undefined;
    }
    return {
      width: 1 + body.readUIntLE(dataOffset + 4, 3),
      height: 1 + body.readUIntLE(dataOffset + 7, 3),
    };
  }
  if (
    fourcc === "VP8 " &&
    chunkLength >= 10 &&
    (body[dataOffset] & 0x01) === 0 &&
    body.subarray(dataOffset + 3, dataOffset + 6).equals(Buffer.from([0x9d, 0x01, 0x2a]))
  ) {
    return {
      width: body.readUInt16LE(dataOffset + 6) & 0x3fff,
      height: body.readUInt16LE(dataOffset + 8) & 0x3fff,
    };
  }
  if (fourcc === "VP8L" && chunkLength >= 5 && body[dataOffset] === 0x2f) {
    const bits = body.readUInt32LE(dataOffset + 1);
    if (bits >>> 29 !== 0) return undefined;
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >>> 14) & 0x3fff) + 1,
    };
  }
  return undefined;
}

export function imageDimensions(body, mimeType) {
  if (mimeType === "image/jpeg") return jpegDimensions(body);
  if (mimeType === "image/png") return pngDimensions(body);
  if (mimeType === "image/webp") return webpDimensions(body);
  return undefined;
}

function assertSafeImageDimensions(body, mimeType) {
  const dimensions = imageDimensions(body, mimeType);
  if (!dimensions || dimensions.width < 1 || dimensions.height < 1) {
    throw new UserFacingError("Preview image dimensions could not be verified.");
  }
  if (
    dimensions.width > MAX_IMAGE_DIMENSION ||
    dimensions.height > MAX_IMAGE_DIMENSION ||
    dimensions.width > MAX_IMAGE_PIXELS / dimensions.height
  ) {
    throw new UserFacingError(
      `Preview dimensions exceed the ${MAX_IMAGE_DIMENSION}-pixel edge or ${MAX_IMAGE_PIXELS}-pixel area limit.`,
    );
  }
  return dimensions;
}

async function fetchValidatedImage(candidate, dependencies) {
  const fetchOnce = dependencies.fetchOnce ?? requestOnce;
  const now = dependencies.now ?? Date.now;
  const deadline = now() + REQUEST_TIMEOUT_MS;
  let currentUrl = new URL(candidate.fetched_preview_url);

  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects += 1) {
    const remainingMs = deadline - now();
    if (remainingMs <= 0) throw new UserFacingError("The preview request timed out.");
    const response = await fetchOnce(currentUrl, {
      lookup: dependencies.lookup,
      httpsRequest: dependencies.httpsRequest,
      timeoutMs: remainingMs,
      maxBytes: MAX_IMAGE_BYTES,
    });
    const statusCode = response.statusCode ?? 0;

    if ([301, 302, 303, 307, 308].includes(statusCode)) {
      if (redirects === MAX_REDIRECTS) {
        throw new UserFacingError(`Preview exceeded the ${MAX_REDIRECTS}-redirect limit.`);
      }
      const location = response.location ?? headerValue(response.headers ?? {}, "location");
      if (!location) throw new UserFacingError("Preview redirect did not include a destination.");
      let redirected;
      try {
        redirected = new URL(location, currentUrl);
      } catch {
        throw new UserFacingError("Preview redirect destination is invalid.");
      }
      if (
        redirected.protocol !== "https:" ||
        redirected.username ||
        redirected.password ||
        redirected.hash
      ) {
        throw new UserFacingError(
          "Every preview redirect must use HTTPS without credentials or fragments.",
        );
      }
      if (redirected.port && redirected.port !== "443") {
        throw new UserFacingError("Every preview redirect must use the standard HTTPS port.");
      }
      currentUrl = normalizePreviewUrl(redirected, candidate.provider, "Redirect target");
      continue;
    }

    if (statusCode !== 200) {
      throw new UserFacingError(`Preview CDN returned HTTP ${statusCode || "error"}.`);
    }
    if (!Buffer.isBuffer(response.body) || response.body.length === 0) {
      throw new UserFacingError("Preview CDN returned no image bytes.");
    }
    if (response.body.length > MAX_IMAGE_BYTES) {
      throw new UserFacingError(`Preview exceeds the ${MAX_IMAGE_BYTES}-byte size limit.`);
    }
    const declaredMime = normalizeMime(headerValue(response.headers ?? {}, "content-type"));
    const detectedMime = sniffMime(response.body);
    if (!declaredMime || !SUPPORTED_MIME_TYPES.has(declaredMime)) {
      throw new UserFacingError("Preview must declare JPEG, PNG, or WebP image content.");
    }
    if (!detectedMime || detectedMime !== declaredMime) {
      throw new UserFacingError("Preview bytes do not match the declared image MIME type.");
    }
    const dimensions = assertSafeImageDimensions(response.body, detectedMime);
    return { body: response.body, mimeType: detectedMime, finalUrl: currentUrl.href, dimensions };
  }
  throw new UserFacingError("Preview redirect handling failed.");
}

function captionFor(candidate) {
  const lines = [
    `Pinterest reference | ${candidate.id}`,
    `Provided source page: ${candidate.source_url}`,
    "Image-to-Pin mapping: supplied by discovery; not verified by preview fetch",
  ];
  if (candidate.title) lines.splice(1, 0, `Title: ${candidate.title}`);
  if (candidate.creator) lines.push(`Creator: ${candidate.creator}`);
  if (candidate.query) lines.push(`Query: ${candidate.query}`);
  if (candidate.fit_note) lines.push(`Fit: ${candidate.fit_note}`);
  if (candidate.visual_dna) lines.push(`Visual DNA: ${candidate.visual_dna}`);
  return lines.join("\n");
}

function referenceMetadata(candidate, image) {
  return Object.fromEntries(
    Object.entries({
      id: candidate.id,
      provider: "Pinterest",
      title: candidate.title,
      source_url: candidate.source_url,
      preview_image_url: candidate.preview_image_url,
      fetched_preview_url: candidate.fetched_preview_url,
      final_preview_url: image.finalUrl,
      original_source_url: candidate.original_source_url,
      creator: candidate.creator,
      query: candidate.query,
      fit_note: candidate.fit_note,
      visual_dna: candidate.visual_dna,
      reported_width: candidate.width,
      reported_height: candidate.height,
      mime_type: image.mimeType,
      byte_length: image.body.length,
      intrinsic_width: image.dimensions.width,
      intrinsic_height: image.dimensions.height,
      provenance_mapping_verified: candidate.provenance_mapping_verified,
      display_transport: "mcp-image-content",
      rights_status: "direction-only",
    }).filter(([, value]) => value !== undefined),
  );
}

export async function fetchReferencePreviewImage(args, dependencies = {}) {
  const candidate = validateArguments(args);
  let image;
  try {
    image = await fetchValidatedImage(candidate, dependencies);
  } catch (error) {
    const detail = error instanceof UserFacingError ? error.message : "Unexpected preview fetch failure.";
    throw new UserFacingError(
      `Reference ${candidate.id} could not be displayed: ${detail} Replace it with another public preview candidate.`,
    );
  }
  const reference = referenceMetadata(candidate, image);
  return {
    content: [
      {
        type: "image",
        data: image.body.toString("base64"),
        mimeType: image.mimeType,
        annotations: { audience: ["user"], priority: 1 },
      },
      { type: "text", text: captionFor(candidate) },
    ],
    structuredContent: { reference },
  };
}

function toolError(message) {
  return { isError: true, content: [{ type: "text", text: message }] };
}

function protocolError(id, code, message) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

export function createProtocolHandler(dependencies = {}) {
  return async (message) => {
    if (!objectLike(message) || message.jsonrpc !== "2.0" || typeof message.method !== "string") {
      return protocolError(message?.id, -32600, "Invalid Request");
    }
    if (!Object.prototype.hasOwnProperty.call(message, "id")) return null;

    switch (message.method) {
      case "initialize": {
        const requested = message.params?.protocolVersion;
        return {
          jsonrpc: "2.0",
          id: message.id,
          result: {
            protocolVersion: SUPPORTED_PROTOCOL_VERSIONS.has(requested)
              ? requested
              : DEFAULT_PROTOCOL_VERSION,
            capabilities: { tools: {} },
            serverInfo: { name: SERVER_NAME, version: "1.2.0" },
            instructions:
              "Call fetch_reference_preview_image once for each shortlisted Pinterest finalist; the workflow defaults to six but honors an explicit positive user-requested count.",
          },
        };
      }
      case "ping":
        return { jsonrpc: "2.0", id: message.id, result: {} };
      case "tools/list":
        return { jsonrpc: "2.0", id: message.id, result: { tools: [TOOL_DEFINITION] } };
      case "tools/call": {
        if (message.params?.name !== TOOL_NAME) {
          return {
            jsonrpc: "2.0",
            id: message.id,
            result: toolError(`Unknown tool: ${String(message.params?.name ?? "")}`),
          };
        }
        try {
          const result = await fetchReferencePreviewImage(message.params?.arguments, dependencies);
          return { jsonrpc: "2.0", id: message.id, result };
        } catch (error) {
          const detail = error instanceof UserFacingError ? error.message : "Preview rendering failed.";
          return { jsonrpc: "2.0", id: message.id, result: toolError(detail) };
        }
      }
      default:
        return protocolError(message.id, -32601, "Method not found");
    }
  };
}

async function writeJsonLine(output, value) {
  if (!output.write(`${JSON.stringify(value)}\n`)) await once(output, "drain");
}

async function* boundedLines(input) {
  let pending = Buffer.alloc(0);
  for await (const chunk of input) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    pending = pending.length === 0 ? bytes : Buffer.concat([pending, bytes]);
    let newline;
    while ((newline = pending.indexOf(0x0a)) >= 0) {
      const line = pending.subarray(0, newline);
      pending = pending.subarray(newline + 1);
      if (line.length > MAX_JSONRPC_LINE_BYTES) {
        throw new UserFacingError("JSON-RPC request exceeds the input size limit.");
      }
      yield line.toString("utf8").replace(/\r$/, "");
    }
    if (pending.length > MAX_JSONRPC_LINE_BYTES) {
      throw new UserFacingError("JSON-RPC request exceeds the input size limit.");
    }
  }
  if (pending.length > 0) yield pending.toString("utf8").replace(/\r$/, "");
}

export async function runStdio({ input = process.stdin, output = process.stdout, dependencies = {} } = {}) {
  const handle = createProtocolHandler(dependencies);
  const inFlight = new Set();
  let writeTail = Promise.resolve();
  const queueWrite = (value) => {
    const queued = writeTail.then(() => writeJsonLine(output, value));
    writeTail = queued.catch(() => {});
    return queued;
  };
  const dispatch = (line) => {
    const task = (async () => {
      let response;
      try {
        response = await handle(JSON.parse(line));
      } catch {
        response = protocolError(null, -32700, "Parse error");
      }
      if (response !== null) await queueWrite(response);
    })();
    inFlight.add(task);
    task.then(
      () => inFlight.delete(task),
      () => inFlight.delete(task),
    );
  };
  try {
    for await (const line of boundedLines(input)) {
      if (!line.trim()) continue;
      while (inFlight.size >= MAX_CONCURRENT_REQUESTS) await Promise.race(inFlight);
      dispatch(line);
    }
  } catch (error) {
    const message = error instanceof UserFacingError ? error.message : "Input transport failed.";
    await queueWrite(protocolError(null, -32700, message));
  }
  await Promise.all(inFlight);
  await writeTail;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runStdio().catch(() => {
    process.exitCode = 1;
  });
}
