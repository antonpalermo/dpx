import axios from "axios";

import { endpoint } from "@/utils";
import { toBase64 } from "@/libs/base64";
import { Transaction } from "@/types/transaction";
import { ClientOptions } from "@/types/client-options";
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

  private baseURL = `${endpoint}/${this.options.version}`;

  private axiosClient = axios.create({
    baseURL: this.baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${toBase64(`${this.options.merchantId}:${this.options.apiKey}`)}`
    }
  });

  public async createTransaction(txnId: string, payload: Transaction) {
    try {
      // const request = await this.axiosClient.post(`/${txnId}/post`, payload);
      // console.log(request.status)
      // console.log(request.data)

      console.log(toBase64(`${this.options.merchantId}:${this.options.apiKey}`))

      return "ok";
    } catch (error) {
      console.log(error);
    }
  }
}
