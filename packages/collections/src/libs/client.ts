import { toBase64 } from "@/utils";
import axiosClient, { AxiosInstance } from "axios";

export type BaseClientProps = {
  apiKey: string;
  merchantId: string;
  version: "v1" | "v2";
};

export abstract class BaseClient {
  public axios: AxiosInstance;
  public env = process.env.NODE_ENV;

  constructor({ merchantId, apiKey, version }: BaseClientProps) {
    this.axios = axiosClient.create({
      baseURL: `https://${this.env === "development" ? "test" : "gw"}.dragonpay.ph/api/collect/${version}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${toBase64(`${merchantId}:${apiKey}`)}`
      }
    });
  }
}
