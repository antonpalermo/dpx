import { customAlphabet } from "nanoid";

import CollectClient from "@/index";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 30);

describe("collection client version 1", () => {
  const client = CollectClient({
    mid: ``,
    secret: ``
  });

  test("client able to create simple transaction", async () => {
    const details = await client.collect(nanoid(), {
      amount: 100.0,
      currency: "PHP",
      email: "anton.palermo@dragonpay.ph",
      description: "node package tests - anton palermo"
    });

    expect(details).toMatchObject({});
  });
});
