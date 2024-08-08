import fetch from "node-fetch";
import { btoa } from "node:buffer";

import { TransactioDetails } from "@/types/transaction-details";
import { TransactionResponse } from "@/types/transcation-response";
import { CancellationReponse } from "@/types/cancellation-response";

export type CollectionClientOptions = {
  /**
   *
   * collection API keys that Dragonpay provides.
   *
   * Note: Make sure that your collection client is stored securely
   *
   */
  apiKey: string;

  /**
   *
   *  Merchant Id is provided by Dragonpay this represents your business name
   *
   */
  merchantId: string;

  /**
   *
   *  Defaults to API version 1 to since v2 is currently in Beta.
   *
   */
  version?: "v1" | "v2";

  /**
   *
   */
  prefix?: string;

  /**
   *
   */
  bin: string;
};

export function createCollectionClient({
  apiKey,
  merchantId,
  version = "v1",
  prefix,
  bin,
}: CollectionClientOptions) {
  const isDev = process.env.NODE_ENV === "development";

  const options = {
    authorization: "Basic " + btoa(`${merchantId}:${apiKey}`),
    apiEndpoint: `https://${isDev ? "test" : "gw"}.dragonpay.ph/api/collect/${version}`,
  };

  /**
   *
   * Creates a new Dragonpay transaction
   *
   * @param txnid unique transaction id that will be used to reference to the created transaction
   * @param data data that will be passed to Dragonpay's API
   * @returns
   */
  async function createTxn(
    txnid: string,
    data: TransactioDetails,
  ): Promise<TransactionResponse | string> {
    try {
      const request = await fetch(`${options.apiEndpoint}/${txnid}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: options.authorization,
        },
        body: JSON.stringify(data),
      });

      return (await request.json()) as TransactionResponse;
    } catch (error) {
      console.log(error);
      throw new Error("error: failed to create new transaction");
    }
  }

  /**
   *
   * @param txnid reference id of the transaction you want to cancel
   * @returns
   */
  async function cancelTxn(
    txnid: string,
  ): Promise<CancellationReponse | string> {
    try {
      const request = await fetch(`${options.apiEndpoint}/void/${txnid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: options.authorization,
        },
      });

      return (await request.json()) as CancellationReponse;
    } catch (error) {
      throw new Error("error: failed to void transaction");
    }
  }

  /**
   *
   * Return all the details regarding with the provided refno.
   *
   * @param refno reference numbers that you want to get
   * @returns transaction details of the providede reference number.
   */
  async function getTxnByRefno(refno: string) {
    try {
      const request = await fetch(`${options.apiEndpoint}/refno/${refno}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: options.authorization,
        },
      });

      return (await request.json()) as CancellationReponse;
    } catch (error) {
      throw new Error("error: failed to void transaction");
    }
  }

  /**
   *
   * Return all the details regarding with the provided txnid.
   *
   * @param txnid transaction id of the transaction you want to get.
   * @returns transaction details of the provided transaction id.
   */
  async function getTxnByTxnid(txnid: string) {
    try {
      const request = await fetch(`${options.apiEndpoint}/txnid/${txnid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: options.authorization,
        },
      });

      return (await request.json()) as CancellationReponse;
    } catch (error) {
      throw new Error("error: failed to void transaction");
    }
  }

  return {
    createTxn,
    cancelTxn,
    getTxnByRefno,
    getTxnByTxnid,
  };
}
