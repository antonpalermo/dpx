import { BaseClient, BaseClientProps } from "./client";
import { LifetimeDetails } from "@/types/lid-details";

export type MUVAClientProps = BaseClientProps & {
  bin: number;
};

export type MUVADetails = LifetimeDetails & {
  preferedId: string;
};

export class MUVAClient extends BaseClient {
  private bin: number;

  constructor({ merchantId, apiKey, version, bin }: MUVAClientProps) {
    super({ merchantId, apiKey, version });
    this.bin = bin;
  }

  async generate(data: MUVADetails) {
    try {
      const response = await this.axios.post("/lifetimeid/create", {
        bin: this.bin,
        ...data
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
