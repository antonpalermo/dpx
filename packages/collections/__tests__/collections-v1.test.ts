/**
 *
 * All API version 1 related tests.
 *
 */
import { generateTxnID } from "@/utils";
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

test("can create simple transaction", async () => {
  const transactionId = generateTxnID();
  const txn = await client.createTransaction(transactionId, {
    amount: 1.0,
    currency: "PHP",
    description: "sample transaction",
    email: `${process.env.EMAIL}`
  });

  // api should return all object properties below.
  const expectedObj = {
    RefNo: expect.any(String),
    Status: expect.any(String),
    Url: expect.stringContaining("https://"),
    Message: expect.any(String)
  };

  expect(txn).toMatchObject(expectedObj);
});

test("throw an error if prefix is missing.", async () => {
  await expect(
    client.createLifetimeId({
      name: "Anton Palermo",
      email: `${process.env.EMAIL}`,
      remarks: "Create LID sample"
    })
  ).rejects.toThrow(Error);
});

test("can generate lifetime id", async () => {
  const lid = await lifetimeClient.createLifetimeId({
    name: "Anton Palermo",
    email: `${process.env.EMAIL}`,
    remarks: "node-dpx lifetime tests"
  });

  console.log("LID:", lid);
});
