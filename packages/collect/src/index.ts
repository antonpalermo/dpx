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
     * option to switch from uat to production environgment.
     */
    env: "test" | "gw";

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
  options
}: CollectionClientOptions) {
  const env = options?.env;
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
        Authorization: `${toBase64Encode(`${mid}:${secret}`)}`,
        ...options?.headers
      }
    });
  };
}
