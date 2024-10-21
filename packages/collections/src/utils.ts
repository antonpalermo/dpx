import { Buffer } from "node:buffer";

export const errorCodes = {
  "000": "Success",
  "101": "Invalid payment gateway id",
  "102": "Incorrect secret key",
  "103": "Invalid reference number",
  "104": "Unauthorized access",
  "105": "Invalid token",
  "106": "Currency not supported",
  "107": "Transaction cancelled",
  "108": "Insufficient funds",
  "109": "Transaction limit exceeded",
  "110": "Error in operation",
  "111": "Security Error",
  "112": "Invalid parameters",
  "201": "Invalid Merchant Id",
  "202": "Invalid Merchant Password"
};

export const statusCodes = {
  S: "Success",
  F: "Failure",
  P: "Pending",
  U: "Unknown",
  V: "Void"
};

export function toBase64(value: string) {
  return Buffer.from(value).toString("base64");
}
