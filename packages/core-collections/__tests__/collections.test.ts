import { generateTxnID } from "@/utils";
import { CollectionClient } from "@/libs/collections";

describe("collection v1", () => {
  const client = new CollectionClient({
    apiKey: `${process.env.MERCHANT_COLLECTION_API_KEY}`,
    merchantId: `${process.env.MERCHANT_ID}`
  });

  test("collection client version 1 should be defined", () => {
    expect(client).toBeDefined();
  });

  test("able to create a simple transaction on api version 1", async () => {
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
});

describe("collection v2", () => {
  const client = new CollectionClient({
    apiKey: `${process.env.MERCHANT_COLLECTION_API_KEY}`,
    merchantId: `${process.env.MERCHANT_ID}`,
    version: "v2"
  });

  test("collection client version 2 should be defined", () => {
    expect(client).toBeDefined();
  });

  test("able to create a simple transaction on api version 1", async () => {
    const transactionId = generateTxnID();
    const txn = await client.createTransaction(transactionId, {
      amount: 1.0,
      currency: "PHP",
      description: "sample transaction",
      email: `${process.env.EMAIL}`,
      procId: "BOG"
    });

    // api should return all object properties below.
    const expectedObj = {
      RefNo: expect.any(String),
      Status: expect.any(String),
      Url: expect.stringContaining(
        "https://test.dragonpay.ph/Bank/Gateway.aspx"
      ),
      Message: expect.any(String)
    };

    expect(txn).toMatchObject(expectedObj);
  });
});
