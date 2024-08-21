/**
 *
 * All API version 1 related tests.
 *
 */

import { CollectionClient } from "@/libs/collections";

const client = new CollectionClient({
  apiKey: `${process.env.MERCHANT_COLLECTION_API_KEY}`,
  merchantId: `${process.env.MERCHANT_ID}`
});

const lifetimeClient = new CollectionClient({
  apiKey: `${process.env.MERCHANT_COLLECTION_API_KEY}`,
  merchantId: `${process.env.MERCHANT_ID}`,
  prefix: `${process.env.MERCHANT_PREFIX}`
});

test("collection client should be defined.", () => {
  expect(client).toBeDefined();
});

test("lifetime collection client should be defined", () => {
  expect(lifetimeClient).toBeDefined();
});
