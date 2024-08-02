import { btoa } from "node:buffer";
import { Credentials } from "@/types/credentials";

export class LifeTimeClient {
  constructor({ apiKey, merchantId }: Credentials) {
    this.apiKey = apiKey;
    this.merchantId = merchantId;
  }

  private apiKey: string = "";
  private merchantId: string = "";

  private authorization = "Basic" + btoa(`${this.merchantId}:$${this.apiKey}`);

  public baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://test.dragonpay.ph/api/collect/v1"
      : "https://gw.dragonpay.ph/api/collect/v1";

  async create() {}

  async generateStaticQR(lid: string) {}

  async deactivate(lid: string) {}

  async reactivate(lid: string) {}
}
