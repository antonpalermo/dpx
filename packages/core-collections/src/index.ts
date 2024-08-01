import fetch from "node-fetch";
import { btoa } from "node:buffer";

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
      ? "https://test.dragonpay.ph"
      : "https://gw.dragonpay.ph";

  async transact(txnDetails: {
    txnId: string;
    email: string;
    amount: number;
    description: string;
  }) {
    const request = await fetch(this.baseUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authorization,
      },
      body: JSON.stringify(txnDetails),
    });

    return await request.json();
  }
}
