import { Buffer } from "node:buffer";

/**
 * encode provided value to base64 string.
 * @param value value to be converted to base64 string
 * @returns base64 encoded string
 */
export function toBase64Encode(value: string) {
  return Buffer.from(value).toString("base64");
}

export const ERRORS = {
  SERVER: "Unable to process your request right now.",
  UNAUTHORIZED: "Unauthorized request, please check your credentials"
};
