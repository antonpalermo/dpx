import fetch from "node-fetch";

import { endpoint } from "@/utils";
import { Transaction } from "@/types/transaction";
import { ClientOptions } from "@/types/client-options";
import { toBase64 } from "./base64";
import { TransactionResponse } from "@/types/transcation-response";

export class CollectionClient {
  constructor({ apiKey, merchantId, version = "v1" }: ClientOptions) {
    this.options = {
      version,
      apiKey,
      merchantId
    };
  }

  private options = {
    version: "v1",
    apiKey: "",
    merchantId: ""
  };

  private collectEndpoint = `${endpoint}/api/collect/${this.options.version}`;

  public async createTransaction(txnId: string, payload: Transaction) {
    try {
      const request = await fetch(`${this.collectEndpoint}/${txnId}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Basic ${toBase64(`${this.options.merchantId}:${this.options.apiKey}`)}`
        },
        body: JSON.stringify(payload)
      });

      return (await request.json()) as TransactionResponse;
    } catch (error) {
      console.log(error);
    }
  }
}
