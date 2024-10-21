import { BaseClient, BaseClientProps } from "@/libs/client";
import { LifetimeDetails } from "@/types/lid-details";

export type LifetimeClientProps = BaseClientProps & {
  prefix: string;
};

export class LifetimeClient extends BaseClient {
  private prefix: string;

  constructor({ merchantId, apiKey, prefix, version }: LifetimeClientProps) {
    super({ merchantId, apiKey, version });
    this.prefix = prefix;
  }

  private async updateStatus(lid: string, status: "activate" | "deactivate") {
    return await this.axios.post(`/lifetime/${status}/${lid}`);
  }

  async generate(data: LifetimeDetails) {
    try {
      const response = await this.axios.post("/lifetimeid/create", {
        prefix: this.prefix,
        ...data
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async reactivate(lid: string) {
    try {
      const response = await this.updateStatus(lid, "activate");

      if (!response.status) {
        throw new Error(
          "The provided lifetime id possibly not available or already active"
        );
      }

      return {
        lid,
        message: "successfully reactivated"
      };
    } catch (error) {
      throw error;
    }
  }

  async deactivate(lid: string) {
    try {
      const response = await this.updateStatus(lid, "deactivate");

      if (!response.status) {
        throw new Error(
          "The provided lifetime id possibly not available or already active"
        );
      }

      return {
        lid,
        message: "successfully reactivated"
      };
    } catch (error) {
      throw error;
    }
  }

  async getDetails(lid: string) {
    try {
      const response = await this.axios.get(`/lifetimeid/${lid}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateDetails(lid: string, data: LifetimeDetails) {
    try {
      const response = await this.axios.post(`/lifetimeid/${lid}`, {
        prefix: this.prefix,
        ...data
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
