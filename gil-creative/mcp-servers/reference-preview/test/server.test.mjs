import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { PassThrough, Readable } from "node:stream";
import test from "node:test";

import {
  MAX_IMAGE_BYTES,
  MAX_CONCURRENT_REQUESTS,
  MAX_IMAGE_DIMENSION,
  MAX_JSONRPC_LINE_BYTES,
  TOOL_NAME,
  createProtocolHandler,
  fetchReferencePreviewImage,
  imageDimensions,
  normalizePreviewUrl,
  requestOnce,
  resolvePublicAddresses,
  runStdio,
  validateArguments,
} from "../server.mjs";

function jpeg(width = 2, height = 2) {
  const body = Buffer.from([
    0xff, 0xd8,
    0xff, 0xc0, 0x00, 0x11, 0x08,
    0x00, 0x00, 0x00, 0x00,
    0x03, 0x01, 0x11, 0x00, 0x02, 0x11, 0x00, 0x03, 0x11, 0x00,
    0xff, 0xd9,
  ]);
  body.writeUInt16BE(height, 7);
  body.writeUInt16BE(width, 9);
  return body;
}

function png(width = 2, height = 2) {
  const body = Buffer.alloc(33);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(body);
  body.writeUInt32BE(13, 8);
  body.write("IHDR", 12, "ascii");
  body.writeUInt32BE(width, 16);
  body.writeUInt32BE(height, 20);
  body[24] = 8;
  body[25] = 2;
  return body;
}

function webpVp8x(width = 2, height = 2) {
  const body = Buffer.alloc(30);
  body.write("RIFF", 0, "ascii");
  body.writeUInt32LE(22, 4);
  body.write("WEBP", 8, "ascii");
  body.write("VP8X", 12, "ascii");
  body.writeUInt32LE(10, 16);
  body.writeUIntLE(width - 1, 24, 3);
  body.writeUIntLE(height - 1, 27, 3);
  return body;
}

const JPEG = jpeg();
const PNG = png();

function pinterestCandidate(overrides = {}) {
  return {
    id: "pin-456",
    provider: "pinterest",
    title: "Clean skincare campaign",
    preview_image_url: "https://i.pinimg.com/originals/aa/bb/cc/image.png",
    source_url: "https://www.pinterest.com/pin/123456789/",
    original_source_url: null,
    creator: "Studio Example",
    query: "Skincare Product Photography",
    fit_note: "Quiet palette and strong copy space",
    visual_dna: "Centered bottle, soft side light, pale stone surface",
    width: 1200,
    height: 1500,
    ...overrides,
  };
}

test("normalizes only recognized Pinterest CDN paths to small preview variants", () => {
  assert.equal(
    normalizePreviewUrl("https://i.pinimg.com/736x/aa/bb/a.webp", "pinterest").href,
    "https://i.pinimg.com/236x/aa/bb/a.webp",
  );
  assert.throws(
    () => normalizePreviewUrl("https://i.pinimg.com/not-a-size/a.jpg", "pinterest"),
    /recognized Pinterest image-size path/,
  );
  assert.throws(
    () =>
      normalizePreviewUrl(
        "https://i.pinimg.com/736x/aa/bb/a.jpg#fragment",
        "pinterest",
      ),
    /must not contain a fragment/,
  );
  assert.throws(
    () =>
      normalizePreviewUrl(
        "https://mir-s3-cdn-cf.behance.net/project_modules/2800/a.jpg",
        "behance",
      ),
    /provider must be Pinterest/,
  );
});

test("accepts only Pinterest Pin provenance, provider agreement, and CDN host", () => {
  assert.throws(
    () =>
      validateArguments(
        pinterestCandidate({ original_source_url: "https://example.com/editorial/source" }),
      ),
    /original_source_url is disabled/,
  );
  assert.throws(
    () =>
      validateArguments(
        pinterestCandidate({ original_source_url: "https://www.pinterest.com/ideas/skincare" }),
      ),
    /original_source_url is disabled/,
  );
  assert.throws(
    () => validateArguments(pinterestCandidate({ source_url: "https://example.com/pin/123" })),
    /public Pinterest/,
  );
  assert.throws(
    () => validateArguments(pinterestCandidate({ source_url: "http://www.pinterest.com/pin/123" })),
    /must use HTTPS/,
  );
  assert.throws(
    () => validateArguments(pinterestCandidate({ provider: "Behance" })),
    /provider must be Pinterest/,
  );
  assert.throws(
    () =>
      validateArguments(
        pinterestCandidate({ source_url: "https://www.pinterest.com/pin/123#hidden" }),
      ),
    /must not contain a fragment/,
  );
  assert.throws(
    () =>
      validateArguments(
        pinterestCandidate({ preview_image_url: "https://images.example.com/236x/a.jpg" }),
      ),
    /approved public preview CDN/,
  );
  assert.throws(
    () =>
      validateArguments(
        pinterestCandidate({
          preview_image_url: "https://mir-s3-cdn-cf.behance.net/project_modules/2800/a.jpg",
        }),
      ),
    /approved public preview CDN/,
  );
  assert.throws(
    () => validateArguments(pinterestCandidate({ source_url: "https://www.pinterest.com/ideas/skincare" })),
    /public Pinterest.*pin/,
  );
  assert.throws(
    () => validateArguments(pinterestCandidate({ source_url: "https://www.pinterest.com/" })),
    /public Pinterest.*pin/,
  );
  assert.equal(
    validateArguments(
      pinterestCandidate({
        source_url: "https://www.pinterest.com/pin/flat-lay-product-photo--713116922250111916/",
      }),
    ).provider,
    "pinterest",
  );
  assert.throws(
    () =>
      validateArguments(
        pinterestCandidate({ source_url: "https://www.behance.net/gallery/123/example" }),
      ),
    /public Pinterest/,
  );
});

test("returns the image first with accurate MIME and structured provenance", async () => {
  const calls = [];
  const result = await fetchReferencePreviewImage(pinterestCandidate(), {
    fetchOnce: async (url, options) => {
      calls.push({ url: url.href, options });
      return {
        statusCode: 200,
        headers: { "Content-Type": "image/jpeg; charset=binary" },
        body: JPEG,
      };
    },
  });

  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].url,
    "https://i.pinimg.com/236x/aa/bb/cc/image.png",
  );
  assert.equal(calls[0].options.maxBytes, MAX_IMAGE_BYTES);
  assert.equal(result.content[0].type, "image");
  assert.equal(result.content[0].mimeType, "image/jpeg");
  assert.equal(result.content[0].data, JPEG.toString("base64"));
  assert.equal(result.content[1].type, "text");
  assert.match(result.content[1].text, /Provided source page: https:\/\/www\.pinterest\.com/);
  assert.match(result.content[1].text, /Image-to-Pin mapping: supplied by discovery/);
  assert.doesNotMatch(result.content[1].text, /outbound source/i);
  assert.deepEqual(result.structuredContent.reference, {
    id: "pin-456",
    provider: "Pinterest",
    title: "Clean skincare campaign",
    source_url: "https://www.pinterest.com/pin/123456789/",
    preview_image_url: "https://i.pinimg.com/originals/aa/bb/cc/image.png",
    fetched_preview_url: "https://i.pinimg.com/236x/aa/bb/cc/image.png",
    final_preview_url: "https://i.pinimg.com/236x/aa/bb/cc/image.png",
    original_source_url: null,
    creator: "Studio Example",
    query: "Skincare Product Photography",
    fit_note: "Quiet palette and strong copy space",
    visual_dna: "Centered bottle, soft side light, pale stone surface",
    reported_width: 1200,
    reported_height: 1500,
    mime_type: "image/jpeg",
    byte_length: JPEG.length,
    intrinsic_width: 2,
    intrinsic_height: 2,
    provenance_mapping_verified: false,
    display_transport: "mcp-image-content",
    rights_status: "direction-only",
  });
});

test("labels Pinterest image-to-Pin provenance as caller-supplied rather than connector-verified", async () => {
  const result = await fetchReferencePreviewImage(
    pinterestCandidate({
      preview_image_url:
        "https://i.pinimg.com/736x/aa/bb/cc/unrelated-image.jpg",
      source_url: "https://www.pinterest.com/pin/999999999/",
    }),
    {
      fetchOnce: async () => ({
        statusCode: 200,
        headers: { "content-type": "image/jpeg" },
        body: JPEG,
      }),
    },
  );
  assert.equal(result.structuredContent.reference.provenance_mapping_verified, false);
  assert.match(result.content[1].text, /supplied by discovery/);
});

test("validates and normalizes every redirect before fetching it", async () => {
  const urls = [];
  const result = await fetchReferencePreviewImage(pinterestCandidate(), {
    fetchOnce: async (url) => {
      urls.push(url.href);
      if (urls.length === 1) {
        return {
          statusCode: 302,
          headers: { location: "https://i.pinimg.com/736x/dd/ee/ff/redirected.png" },
          body: Buffer.alloc(0),
        };
      }
      return { statusCode: 200, headers: { "content-type": "image/png" }, body: PNG };
    },
  });

  assert.deepEqual(urls, [
    "https://i.pinimg.com/236x/aa/bb/cc/image.png",
    "https://i.pinimg.com/236x/dd/ee/ff/redirected.png",
  ]);
  assert.equal(result.structuredContent.reference.final_preview_url, urls[1]);

  await assert.rejects(
    fetchReferencePreviewImage(pinterestCandidate(), {
      fetchOnce: async () => ({
        statusCode: 302,
        headers: { location: "https://attacker.example/image.png" },
        body: Buffer.alloc(0),
      }),
    }),
    /approved public preview CDN/,
  );
});

test("rejects oversized, unsupported, and MIME-spoofed responses", async () => {
  await assert.rejects(
    fetchReferencePreviewImage(pinterestCandidate(), {
      fetchOnce: async () => ({
        statusCode: 200,
        headers: { "content-type": "image/jpeg" },
        body: Buffer.alloc(MAX_IMAGE_BYTES + 1, 0xff),
      }),
    }),
    /size limit/,
  );
  await assert.rejects(
    fetchReferencePreviewImage(pinterestCandidate(), {
      fetchOnce: async () => ({
        statusCode: 200,
        headers: { "content-type": "text/html" },
        body: JPEG,
      }),
    }),
    /declare JPEG, PNG, or WebP/,
  );
  await assert.rejects(
    fetchReferencePreviewImage(pinterestCandidate(), {
      fetchOnce: async () => ({
        statusCode: 200,
        headers: { "content-type": "image/png" },
        body: JPEG,
      }),
    }),
    /do not match/,
  );
});

test("parses JPEG, PNG, and WebP dimensions and rejects pixel bombs or truncated headers", async () => {
  assert.deepEqual(imageDimensions(jpeg(320, 240), "image/jpeg"), { width: 320, height: 240 });
  assert.deepEqual(imageDimensions(png(320, 240), "image/png"), { width: 320, height: 240 });
  assert.deepEqual(imageDimensions(webpVp8x(320, 240), "image/webp"), {
    width: 320,
    height: 240,
  });
  assert.deepEqual(
    imageDimensions(
      Buffer.from("524946461600000057454250565038200a0000000000009d012a4001f000", "hex"),
      "image/webp",
    ),
    { width: 320, height: 240 },
  );
  assert.deepEqual(
    imageDimensions(
      Buffer.from("5249464612000000574542505650384c050000002f3fc13b0000", "hex"),
      "image/webp",
    ),
    { width: 320, height: 240 },
  );
  assert.equal(imageDimensions(Buffer.from([0xff, 0xd8, 0xff, 0xd9]), "image/jpeg"), undefined);
  assert.equal(
    imageDimensions(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), "image/png"),
    undefined,
  );

  await assert.rejects(
    fetchReferencePreviewImage(pinterestCandidate(), {
      fetchOnce: async () => ({
        statusCode: 200,
        headers: { "content-type": "image/png" },
        body: png(MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION),
      }),
    }),
    /dimensions exceed/,
  );
  await assert.rejects(
    fetchReferencePreviewImage(pinterestCandidate(), {
      fetchOnce: async () => ({
        statusCode: 200,
        headers: { "content-type": "image/png" },
        body: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      }),
    }),
    /dimensions could not be verified/,
  );
});

test("keeps the largest permitted MCP tool result below 150,000 JSON characters", async () => {
  const body = Buffer.alloc(MAX_IMAGE_BYTES);
  body.set(JPEG, 0);
  const result = await fetchReferencePreviewImage(
    pinterestCandidate({
      id: "i".repeat(200),
      title: "t".repeat(300),
      source_url: `https://www.pinterest.com/pin/${"s".repeat(300)}--123456789/`,
      preview_image_url: `https://i.pinimg.com/originals/aa/bb/${"p".repeat(880)}.jpg`,
      original_source_url: null,
      creator: "c".repeat(300),
      query: "q".repeat(300),
      fit_note: "f".repeat(600),
      visual_dna: "v".repeat(1000),
    }),
    {
      fetchOnce: async () => ({
        statusCode: 200,
        headers: { "content-type": "image/jpeg" },
        body,
      }),
    },
  );

  assert.ok(JSON.stringify({ jsonrpc: "2.0", id: 1, result }).length < 150_000);
});

test("rejects private or mixed DNS answers", async () => {
  await assert.rejects(
    resolvePublicAddresses("i.pinimg.com", async () => [{ address: "127.0.0.1", family: 4 }]),
    /local or non-public/,
  );
  await assert.rejects(
    resolvePublicAddresses("i.pinimg.com", async () => [
      { address: "93.184.216.34", family: 4 },
      { address: "10.0.0.8", family: 4 },
    ]),
    /local or non-public/,
  );
  assert.deepEqual(
    await resolvePublicAddresses("i.pinimg.com", async () => [
      { address: "93.184.216.34", family: 4 },
      { address: "64:ff9b::5db8:d822", family: 6 },
    ]),
    [
      { address: "93.184.216.34", family: 4 },
      { address: "64:ff9b::5db8:d822", family: 6 },
    ],
  );
  await assert.rejects(
    resolvePublicAddresses("i.pinimg.com", async () => [
      { address: "64:ff9b::a00:1", family: 6 },
    ]),
    /local or non-public/,
  );
});

test("low-level request pins validated DNS and sends no cookies or authorization", async () => {
  let capturedOptions;
  const httpsRequest = (_url, options, onResponse) => {
    capturedOptions = options;
    const request = new EventEmitter();
    request.destroy = () => {};
    request.end = () => {
      queueMicrotask(() => {
        const response = Readable.from([JPEG]);
        response.statusCode = 200;
        response.headers = { "content-type": "image/jpeg", "content-length": String(JPEG.length) };
        onResponse(response);
      });
    };
    return request;
  };

  const response = await requestOnce(
    new URL("https://i.pinimg.com/236x/aa/bb/a.jpg"),
    {
      lookup: async () => [{ address: "93.184.216.34", family: 4 }],
      httpsRequest,
      timeoutMs: 100,
    },
  );

  assert.deepEqual(response.body, JPEG);
  assert.equal(capturedOptions.headers.Cookie, undefined);
  assert.equal(capturedOptions.headers.Authorization, undefined);
  assert.equal(capturedOptions.headers["Accept-Encoding"], "identity");
  await new Promise((resolve, reject) => {
    capturedOptions.lookup("ignored", {}, (error, address, family) => {
      if (error) reject(error);
      else {
        assert.equal(address, "93.184.216.34");
        assert.equal(family, 4);
        resolve();
      }
    });
  });
});

test("low-level request applies its timeout to DNS resolution", async () => {
  let requestStarted = false;
  await assert.rejects(
    requestOnce(new URL("https://i.pinimg.com/236x/aa/bb/image.jpg"), {
      lookup: async () => new Promise(() => {}),
      httpsRequest: () => {
        requestStarted = true;
      },
      timeoutMs: 10,
    }),
    /timed out during DNS resolution/,
  );
  assert.equal(requestStarted, false);
});

test("implements initialize, ping, tools/list, tools/call, and MCP tool errors", async () => {
  const handle = createProtocolHandler({
    fetchOnce: async () => ({
      statusCode: 200,
      headers: { "content-type": "image/jpeg" },
      body: JPEG,
    }),
  });

  const initialized = await handle({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: { protocolVersion: "2025-06-18" },
  });
  assert.equal(initialized.result.protocolVersion, "2025-06-18");
  assert.equal(initialized.result.serverInfo.name, "reference-preview");
  assert.match(initialized.result.instructions, /defaults to six/i);
  assert.match(initialized.result.instructions, /explicit positive user-requested count/i);
  assert.deepEqual((await handle({ jsonrpc: "2.0", id: 2, method: "ping" })).result, {});

  const listed = await handle({ jsonrpc: "2.0", id: 3, method: "tools/list" });
  assert.equal(listed.result.tools.length, 1);
  assert.equal(listed.result.tools[0].name, TOOL_NAME);
  assert.equal(listed.result.tools[0].annotations.readOnlyHint, true);
  assert.deepEqual(listed.result.tools[0].inputSchema.properties.provider.enum, [
    "pinterest",
    "Pinterest",
  ]);
  assert.doesNotMatch(listed.result.tools[0].description, /Behance/i);
  assert.equal(initialized.result.serverInfo.version, "1.2.0");

  const called = await handle({
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: { name: TOOL_NAME, arguments: pinterestCandidate() },
  });
  assert.equal(called.result.content[0].type, "image");

  const invalid = await handle({
    jsonrpc: "2.0",
    id: 5,
    method: "tools/call",
    params: { name: TOOL_NAME, arguments: { id: "missing-urls" } },
  });
  assert.equal(invalid.result.isError, true);
  assert.match(invalid.result.content[0].text, /source_url is required/);

  const futureVersion = await handle({
    jsonrpc: "2.0",
    id: 6,
    method: "initialize",
    params: { protocolVersion: "2099-01-01" },
  });
  assert.equal(futureVersion.result.protocolVersion, "2025-11-25");

  const legacyVersion = await handle({
    jsonrpc: "2.0",
    id: 7,
    method: "initialize",
    params: { protocolVersion: "2025-03-26" },
  });
  assert.equal(legacyVersion.result.protocolVersion, "2025-11-25");
});

test("stdio transport emits only newline-delimited JSON-RPC and ignores notifications", async () => {
  const input = new PassThrough();
  const output = new PassThrough();
  let stdout = "";
  output.setEncoding("utf8");
  output.on("data", (chunk) => {
    stdout += chunk;
  });

  const running = runStdio({ input, output });
  input.write("not-json\n");
  input.write(`${JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" })}\n`);
  input.write(`${JSON.stringify({ jsonrpc: "2.0", id: 8, method: "tools/list" })}\n`);
  input.end();
  await running;

  const lines = stdout.trim().split("\n").map((line) => JSON.parse(line));
  assert.equal(lines.length, 2);
  assert.equal(lines[0].error.code, -32700);
  assert.equal(lines[1].id, 8);
  assert.equal(lines[1].result.tools[0].name, TOOL_NAME);
});

test("stdio transport caps concurrent calls while preserving six-way preview parallelism", async () => {
  const input = new PassThrough();
  const output = new PassThrough();
  output.resume();
  let active = 0;
  let peak = 0;
  const running = runStdio({
    input,
    output,
    dependencies: {
      fetchOnce: async () => {
        active += 1;
        peak = Math.max(peak, active);
        await new Promise((resolve) => setImmediate(resolve));
        active -= 1;
        return { statusCode: 200, headers: { "content-type": "image/jpeg" }, body: JPEG };
      },
    },
  });
  for (let index = 0; index < 20; index += 1) {
    input.write(
      `${JSON.stringify({
        jsonrpc: "2.0",
        id: index,
        method: "tools/call",
        params: { name: TOOL_NAME, arguments: pinterestCandidate({ id: `ref-${index}` }) },
      })}\n`,
    );
  }
  input.end();
  await running;
  assert.equal(peak, MAX_CONCURRENT_REQUESTS);
  assert.ok(peak >= 6);
});

test("stdio transport rejects oversized frames and honors output backpressure", async () => {
  const oversizedInput = Readable.from([Buffer.alloc(MAX_JSONRPC_LINE_BYTES + 1, 0x61)]);
  const oversizedOutput = new PassThrough();
  let oversizedText = "";
  oversizedOutput.setEncoding("utf8");
  oversizedOutput.on("data", (chunk) => {
    oversizedText += chunk;
  });
  await runStdio({ input: oversizedInput, output: oversizedOutput });
  assert.match(JSON.parse(oversizedText).error.message, /input size limit/);

  const writes = [];
  const backpressuredOutput = new EventEmitter();
  let firstWrite = true;
  backpressuredOutput.write = (chunk) => {
    writes.push(chunk);
    if (!firstWrite) return true;
    firstWrite = false;
    queueMicrotask(() => backpressuredOutput.emit("drain"));
    return false;
  };
  await runStdio({
    input: Readable.from([
      `${JSON.stringify({ jsonrpc: "2.0", id: 1, method: "ping" })}\n` +
        `${JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list" })}\n`,
    ]),
    output: backpressuredOutput,
  });
  assert.equal(writes.length, 2);
});
