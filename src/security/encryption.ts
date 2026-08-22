import crypto from "node:crypto";

export type EncryptedPayload = {
  iv: string;
  ciphertext: string;
  authTag: string;
};

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

export class FileEncryption {
  generateKey(): Buffer { return crypto.randomBytes(KEY_LENGTH); }

  encrypt(data: string, key: Buffer): EncryptedPayload {
    validateKey(key);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
    const ciphertext = Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);
    return { iv: iv.toString("hex"), ciphertext: ciphertext.toString("hex"), authTag: cipher.getAuthTag().toString("hex") };
  }

  decrypt(payload: EncryptedPayload, key: Buffer): string {
    validateKey(key);
    if (!isEncryptedPayload(payload)) throw new TypeError("invalid encrypted payload");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(payload.iv, "hex"), { authTagLength: AUTH_TAG_LENGTH });
    decipher.setAuthTag(Buffer.from(payload.authTag, "hex"));
    return Buffer.concat([decipher.update(Buffer.from(payload.ciphertext, "hex")), decipher.final()]).toString("utf8");
  }
}

function validateKey(key: Buffer): void {
  if (!Buffer.isBuffer(key) || key.length !== KEY_LENGTH) throw new TypeError("key must be exactly 32 bytes");
}

function isEncryptedPayload(value: EncryptedPayload): value is EncryptedPayload {
  return Boolean(value && typeof value.iv === "string" && typeof value.ciphertext === "string" && typeof value.authTag === "string" && value.iv.length === IV_LENGTH * 2 && value.authTag.length === AUTH_TAG_LENGTH * 2);
}
