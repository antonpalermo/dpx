export type ClientOptions = {
  /**
   *
   * Collection api key provided by Dragonpay
   *
   */
  apiKey: string;

  /**
   *
   * Unique merchant id assigned by Dragonpay
   *
   */
  merchantId: string;

  /**
   *
   * API version default would be v1
   *
   */
  version: "v1" | "v2";

  /**
   *
   * Unique prefix assigned by Dragonpay to create a unique LID.
   *
   */
  prefix?: string;

  /**
   *
   * Unique bin numbers assgined by Dragonpay for merchants who
   * to use Multi Use Virtual Account (MUVA)
   *
   */
  bin?: number;
};
