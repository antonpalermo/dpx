import axiosClient, { AxiosError, AxiosInstance } from "axios";

import { endpoint } from "@/utils";
import { toBase64 } from "@/utils";
import { Transaction } from "@/types/transaction";
import { ClientOptions } from "@/types/client-options";
import { TransactionResponse } from "@/types/transcation-response";
import { TransactioDetails } from "@/types/transaction-details";
import { LifetimeDetails } from "@/types/lid-details";

export class CollectionClient {
  private axios: AxiosInstance;
  private prefix: string | undefined;

  constructor({ apiKey, merchantId, version = "v1", prefix }: ClientOptions) {
    this.prefix = prefix;
    this.axios = axiosClient.create({
      baseURL: `https://${process.env.NODE_ENV === "development" ? "test" : "gw"}.dragonpay.ph/api/collect/${version}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${toBase64(`${merchantId}:${apiKey}`)}`
      }
    });
  }

  /**
   *
   * Create a simple transaction.
   *
   * @param txnId id that will be use to referenced a specific transaction.
   * @param payload data that Dragonpay will processed.
   * @returns transaction details.
   */
  public async createTransaction(txnId: string, payload: Transaction) {
    try {
      const response = await this.axios.post<TransactionResponse>(
        `/${txnId}/post`,
        payload
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw error.message;
    }
  }

  /**
   *
   * Get transaction details using reference number.
   *
   * @param refno reference number of a specific transaction.
   * @returns transaction details.
   */
  public async getTranscationByRefno(refno: string) {
    try {
      const response = await this.axios.get<TransactioDetails>(
        `/refno/${refno}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw error.message;
    }
  }

  /**
   *
   * Get transaction details using transaction id.
   *
   * @param txnId transaction id of a specific transaction.
   * @returns transaction details.
   */
  public async getTranscationByTxnId(txnId: string) {
    try {
      const response = await this.axios.get(`/txnid/${txnId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }

  /**
   *
   * Voids transaction using transaction id
   *
   * @param txnId transaction id of a specific transcation.
   * @returns returns 0 if transaction is successfully voided else a negative numbers.
   */
  public async cancelTransaction(txnId: string) {
    try {
      const response = await this.axios.get(`/void/${txnId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }

  public async createLifetimeId(data: LifetimeDetails) {
    if (!this.prefix) {
      throw new Error("Lifetime ID prefix is required to create Lifetime IDs");
    }

    try {
      const request = await this.axios.post(`/lifetimeid/create`, data);
      return request.data;
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }
}
