import { generateTxnID } from "@/utils";
import { CollectionClient } from "@/libs/collections";

jest.useFakeTimers();

const client1 = new CollectionClient({
  apiKey: `${process.env.MERCHANT_COLLECTION_API_KEY}`,
  merchantId: `${process.env.MERCHANT_ID}`
});

const client2 = new CollectionClient({
  apiKey: `${process.env.MERCHANT_COLLECTION_API_KEY}`,
  merchantId: `${process.env.MERCHANT_ID}`,
  version: "v2"
});

const expectedTxnDetailsObj = {
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

describe("collection v1", () => {
  test("collection client version 1 should be defined", () => {
    expect(client1).toBeDefined();
  });

  test("able to create a simple transaction on api version 1", async () => {
    const transactionId = generateTxnID();
    const txn = await client1.createTransaction(transactionId, {
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
  test("collection client version 2 should be defined", () => {
    expect(client2).toBeDefined();
  });

  test("able to create a simple transaction on api version 1", async () => {
    const transactionId = generateTxnID();
    const txn = await client2.createTransaction(transactionId, {
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

  test("should able to get transcation details using refno", async () => {
    const transactionId = generateTxnID();
    const txn = await client2.createTransaction(transactionId, {
      amount: 1.0,
      currency: "PHP",
      description: "sample transaction",
      email: `${process.env.EMAIL}`,
      procId: "BOG"
    });

    if (txn) {
      const refno = txn.RefNo;
      // TODO: use dynamic refs here.
      const txnDetails = await client2.getTranscationByRefno(refno);
      expect(txnDetails).toMatchObject(expectedTxnDetailsObj);
    }
  });
});
