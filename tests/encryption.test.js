const assert = require("node:assert/strict");
const { FileEncryption } = require("../dist/security/encryption");

const encryption = new FileEncryption();
const key = encryption.generateKey();
const payload = encryption.encrypt("sensitive test data", key);
assert.equal(encryption.decrypt(payload, key), "sensitive test data");
assert.throws(() => encryption.decrypt({ ...payload, ciphertext: payload.ciphertext.slice(0, -2) + "00" }, key));
assert.throws(() => encryption.encrypt("data", Buffer.alloc(16)), /32 bytes/);
assert.throws(() => encryption.decrypt({ iv: "00", ciphertext: "00", authTag: "00" }, key), /invalid encrypted payload/);
console.log("encryption tests passed");
