import { Buffer } from "node:buffer";

export function toBase64(value: string) {
  return Buffer.from(value).toString("base64");
}
