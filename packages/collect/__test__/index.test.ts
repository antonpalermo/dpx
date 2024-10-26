import { randomUUID } from "node:crypto";
import CollectClient from "@/index";

const reusableUniqueID = randomUUID().split("-").join("").toUpperCase();

describe("collection client version 1", () => {
  const client = CollectClient({
    mid: process.env.MERCHANT_ID!,
    secret: process.env.MERCHANT_COLLECTION_API_KEY!
  });

  test("client able to create simple transaction", async () => {
    const expectedObj = {
      RefNo: expect.any(String),
      Status: expect.any(String),
      Url: expect.stringContaining("https://"),
      Message: expect.any(String)
    };

    const details = await client.collect(reusableUniqueID, {
      amount: 100.0,
      currency: "PHP",
      email: "anton.palermo@dragonpay.ph",
      description: "node package tests - anton palermo"
    });

    expect(details).toMatchObject(expectedObj);
  });
});
