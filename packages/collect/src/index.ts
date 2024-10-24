import toBase64Encode from "@/utils";

export interface CollectionClientOptions {
  /**
   * Dragonpay assigned merchant id.
   */
  mid: string;

  /**
   * Dragonpay assigned API collection secret key.
   */
  secret: string;

  /**
   *
   */
  options?: {
    /**
     * version of dragonpay collection api to be consumed.
     *
     * default: v1
     */
    version: "v1" | "v2";
  };
}

export default function CollectionClient({
  mid,
  secret,
  options = { version: "v1" }
}: CollectionClientOptions) {
  const env = process.env.NODE_ENV === "development" ? "test" : "gw";

  const version = options?.version;
  const endpoint = `https://${env}.dragonpay.ph/api/collect/${version}`;

  /**
   * wraps the native fetch.
   *
   * @param endpoint endpoint to send the request to.
   * @param options request options
   * @returns fetch response.
   */
  const request = async (
    endpoint: RequestInfo | URL,
    options?: RequestInit
  ): Promise<Response> => {
    return await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${toBase64Encode(`${mid}:${secret}`)}`,
        ...options?.headers
      }
    });
  };

  /**
   * create a new collection transaction.
   *
   * @param txnid unique transaction id that represent the whole transaction.
   * @param data data that dragonpay will process
   */
  async function collect(txnid: string, data: {}) {
    const req = await request(`${endpoint}/${txnid}/post`, {
      method: "POST",
      body: JSON.stringify(data)
    });

    console.log(await req.json());
  }

  /**
   * get transaction details using the provided refno
   * @param refno unique reference number assigned to a transaction.
   */
  async function getRefnoDetails(refno: string) {
    const req = await request(`${endpoint}/refno/${refno}`, { method: "GET" });
    console.log(await req.json());
  }

  /**
   * get transaction details using the provided txnid
   * @param txnid unique transaction id assigned to a transaction.
   */
  async function getTxnidDetails(txnid: string) {
    const req = await request(`${endpoint}/txnid/${txnid}`, { method: "GET" });
    console.log(await req.json());
  }

  /**
   * void transaction based on the provided txnid.
   * @param txnid unique transaction id assigned to a transaction.
   */
  async function cancelTransaction(txnid: string) {
    const req = await request(`${endpoint}/void/${txnid}`, { method: "GET" });
    console.log(await req.json());
  }

  return { collect, getRefnoDetails, getTxnidDetails, cancelTransaction };
}
