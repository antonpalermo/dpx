import { randomUUID } from "node:crypto";
import CollectClient from "@/index";

const reusableUniqueID = randomUUID().split("-").join("").toUpperCase();
const sleep = (ms: number): Promise<void> =>
  new Promise(res => setTimeout(res, ms));

const client = CollectClient({
  mid: process.env.MERCHANT_ID!,
  secret: process.env.MERCHANT_COLLECTION_API_KEY!
});

const client2 = CollectClient({
  mid: process.env.MERCHANT_ID!,
  secret: process.env.MERCHANT_COLLECTION_API_KEY!,
  options: {
    version: "v2"
  }
});

const expectedTransactionDetails = {
  RefNo: expect.any(String),
  MerchantId: expect.any(String),
  TxnId: expect.any(String),
  RefDate: expect.any(String),
  Amount: expect.any(Number),
  Currency: expect.any(String),
  Description: expect.any(String),
  Status: expect.any(String),
  Email: expect.any(String),
  MobileNo: expect.any(String),
  ProcId: expect.any(String),
  ProcMsg: expect.any(String),
  SettleDate: expect.any(String),
  Param1: expect.any(String),
  Param2: expect.any(String),
  Fee: expect.any(Number)
};

describe("collection client version 1", () => {
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
      email: process.env.EMAIL!,
      description: "node package tests - anton palermo"
    });

    expect(details).toMatchObject(expectedObj);
  });

  test("client able to retrieve transaction details using refno", async () => {
    const transaction = await client2.collect(reusableUniqueID, {
      amount: 100.0,
      currency: "PHP",
      email: process.env.EMAIL!,
      description: "node package tests - anton palermo",
      procId: "BOGX"
    });

    await sleep(200);

    const details = await client.getTransactionByRefno(transaction.RefNo);

    expect(details).toMatchObject(expectedTransactionDetails);
  });

  test("client able to retrieve transaction details using txnid", async () => {
    const txnid = reusableUniqueID;

    await client2.collect(txnid, {
      amount: 100.0,
      currency: "PHP",
      email: process.env.EMAIL!,
      description: "node package tests - anton palermo",
      procId: "BOGX"
    });

    await sleep(200);

    const details = await client.getTransactionByTxnid(txnid);

    expect(details).toMatchObject(expectedTransactionDetails);
  });
});

describe("collection client version 2", () => {
  test("client able to create sample transaction", async () => {
    const expectedObj = {
      RefNo: expect.any(String),
      Status: expect.any(String),
      Url: expect.stringContaining("https://test-ui.dragonpay.ph"),
      Message: expect.any(String)
    };

    const transaction = await client2.collect(reusableUniqueID, {
      amount: 100.0,
      currency: "PHP",
      email: process.env.EMAIL!,
      description: "node package tests - anton palermo"
    });

    expect(transaction).toMatchObject(expectedObj);
  });

  test("client able to retrieve transaction details using refno", async () => {
    const transaction = await client2.collect(reusableUniqueID, {
      amount: 100.0,
      currency: "PHP",
      email: process.env.EMAIL!,
      description: "node package tests - anton palermo",
      procId: "BOGX"
    });

    await sleep(200);

    const details = await client2.getTransactionByRefno(transaction.RefNo);

    expect(details).toMatchObject(expectedTransactionDetails);
  });

  test("client able to retrieve transaction details using txnid", async () => {
    const txnid = reusableUniqueID;

    await client2.collect(txnid, {
      amount: 100.0,
      currency: "PHP",
      email: process.env.EMAIL!,
      description: "node package tests - anton palermo",
      procId: "BOGX"
    });

    await sleep(200);

    const details = await client2.getTransactionByTxnid(txnid);

    expect(details).toMatchObject(expectedTransactionDetails);
  });
});
