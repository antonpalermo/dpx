import { v4 as uuid } from "uuid";

export function generateTxnID() {
  return uuid().split("-").join("");
}
