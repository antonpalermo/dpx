import { CollectionClient } from "@/libs/collections";

describe("collection v1", () => {
  const client = new CollectionClient({
    apiKey: `${process.env.MERCHANT_ID}`,
    merchantId: `${process.env.MERCHANT_COLLECTION_API_KEY}`
  });

  test("collection client should be defined", () => {
    expect(client).toBeDefined();
  });

  test("able to create a simple transaction", async () => {
    const txn = await client.createTransaction("", {
      amount: 1.0,
      currency: "PHP",
      description: "sample transaction",
      email: `${process.env.EMAIL}`
    });

    expect(txn).toBe("ok");
  });
});
