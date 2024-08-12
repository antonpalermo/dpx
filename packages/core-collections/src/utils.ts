import { v4 as uuid } from "uuid";

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

const urls = {
  uat: "https://test.dragonpay.ph/api/collect",
  prod: "https://gw.dragonpay.ph/api/collect"
};

export const endpoint =
  process.env.NODE_ENV === "development" ? urls.uat : urls.prod;

export function generateTxnID() {
  return uuid().split("-").join("");
}
