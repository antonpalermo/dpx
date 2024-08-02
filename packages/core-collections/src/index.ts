import fetch from "node-fetch";
import { btoa } from "node:buffer";
import { Transaction } from "./types/transaction";
import { TransactionResponse } from "./types/transcation-response";
import { TransactioDetails } from "./types/transaction-details";
import { CancellationReponse } from "./types/cancellation-response";

export class CollectionClient {
  private clientId: string = "";
  private merchantId: string = "";

  constructor({
    clientId,
    merchantId,
  }: {
    clientId: string;
    merchantId: string;
  }) {
    this.clientId = clientId;
    this.merchantId = merchantId;
  }

  private authorization =
    "Basic" + btoa(`${this.merchantId}:$${this.clientId}`);

  public baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://test.dragonpay.ph/api/collect/v1"
      : "https://gw.dragonpay.ph/api/collect/v1";

  async createTransaction(
    txnid: string,
    details: Transaction,
  ): Promise<TransactionResponse | string> {
    try {
      const request = await fetch(`${this.baseUrl}/${txnid}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.authorization,
        },
        body: JSON.stringify(details),
      });

      return (await request.json()) as TransactionResponse;
    } catch (error) {
      console.log(error);
      return "error creating transaction";
    }
  }

  async getTransactionByRefno(
    refno: string,
  ): Promise<TransactioDetails | string> {
    try {
      const request = await fetch(`${this.baseUrl}/refno/${refno}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.authorization,
        },
      });

      return (await request.json()) as TransactioDetails;
    } catch (error) {
      console.log(error);
      return "transaction not found";
    }
  }

  async cancelTransaction(
    txnid: string,
  ): Promise<CancellationReponse | string> {
    try {
      const request = await fetch(`${this.baseUrl}/void/${txnid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.authorization,
        },
      });

      return (await request.json()) as CancellationReponse;
    } catch (error) {
      console.log(error);
      return "transaction not found";
    }
  }
}
