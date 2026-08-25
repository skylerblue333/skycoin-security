const assert = require("node:assert/strict");
const { FileEncryption } = require("../dist/security/encryption");

const encryption = new FileEncryption();
const key = encryption.generateKey();

const payload = encryption.encrypt("sensitive test data", key);
assert.equal(payload.version, 1);
assert.equal(payload.algorithm, "aes-256-gcm");
assert.equal(encryption.decrypt(payload, key), "sensitive test data");

const bound = encryption.encrypt("tenant secret", key, "tenant:alpha");
assert.equal(encryption.decrypt(bound, key, "tenant:alpha"), "tenant secret");
assert.throws(() => encryption.decrypt(bound, key, "tenant:beta"));

assert.throws(() => encryption.decrypt({ ...payload, ciphertext: `${payload.ciphertext.slice(0, -2)}00` }, key));
assert.throws(() => encryption.decrypt({ ...payload, authTag: `${payload.authTag.slice(0, -2)}00` }, key));
assert.throws(() => encryption.encrypt("data", Buffer.alloc(16)), /32 bytes/);
assert.throws(() => encryption.decrypt({ ...payload, version: 2 }, key), /invalid encrypted payload/);
assert.throws(() => encryption.decrypt({ ...payload, algorithm: "aes-128-gcm" }, key), /invalid encrypted payload/);
assert.throws(() => encryption.decrypt({ ...payload, iv: "zz".repeat(12) }, key), /invalid encrypted payload/);
assert.throws(() => encryption.decrypt({ ...payload, ciphertext: "xyz" }, key), /invalid encrypted payload/);
assert.equal(encryption.decrypt(encryption.encrypt("", key), key), "");

console.log("encryption tests passed");
