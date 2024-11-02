import fetch from "jest-fetch-mock";
import CollectClient from "@/index";

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

beforeEach(() => {
  fetch.resetMocks();
});

describe("collection client version 1", () => {
  test("client able to create simple transaction", async () => {
    const response = {
      Refno: "MOCKREF",
      Status: "S",
      Url: "https://test.dragonpay.ph",
      Message: "Successful"
    };
    fetch.mockResponseOnce(JSON.stringify(response));

    const details = await client.collect("SAMPLETXN", {
      amount: 100.0,
      currency: "PHP",
      email: process.env.EMAIL!,
      description: "node package tests - anton palermo"
    });

    expect(details).toEqual(response);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("client able to retrieve transaction details using refno", async () => {
    const response = {
      RefNo: "SAMPLEREF",
      MerchantId: `${process.env.MERCHANT_ID}`,
      TxnId: "SAMPLETXN",
      RefDate: "10/29/2024 9:19:24 PM",
      Amount: 100.0,
      Currency: "PHP",
      Description: "node package tests - anton palermo",
      Status: "U",
      Email: `${process.env.EMAIL}`,
      MobileNo: "",
      ProcId: "BOGX",
      ProcMsg: "",
      SettleDate: "",
      Param1: "",
      Param2: "",
      Fee: 0
    };

    fetch.mockResponseOnce(JSON.stringify(response));

    const details = await client.getTransactionByRefno("SAMPLEREF");

    expect(details).toMatchObject(response);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("client able to retrieve transaction details using txnid", async () => {
    const response = {
      RefNo: "SAMPLEREF",
      MerchantId: `${process.env.MERCHANT_ID}`,
      TxnId: "SAMPLETXN",
      RefDate: "10/29/2024 9:19:24 PM",
      Amount: 100.0,
      Currency: "PHP",
      Description: "node package tests - anton palermo",
      Status: "U",
      Email: `${process.env.EMAIL}`,
      MobileNo: "",
      ProcId: "BOGX",
      ProcMsg: "",
      SettleDate: "",
      Param1: "",
      Param2: "",
      Fee: 0
    };

    fetch.mockResponseOnce(JSON.stringify(response));

    const details = await client.getTransactionByTxnid("SAMPLETXN");

    expect(details).toMatchObject(response);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("collection client version 2", () => {
  test("client able to create sample transaction", async () => {
    const response = {
      RefNo: "SAMPLEREF",
      Status: "S",
      Url: "https://test-ui.dragonpay.ph",
      Message: "Successful"
    };

    fetch.mockResponseOnce(JSON.stringify(response));

    const transaction = await client2.collect("SAMPLETXN", {
      amount: 100.0,
      currency: "PHP",
      email: process.env.EMAIL!,
      description: "node package tests - anton palermo"
    });

    expect(transaction).toMatchObject(response);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("client able to retrieve transaction details using refno", async () => {
    const response = {
      RefNo: "SAMPLEREF",
      MerchantId: `${process.env.MERCHANT_ID}`,
      TxnId: "SAMPLETXN",
      RefDate: "10/29/2024 9:19:24 PM",
      Amount: 100.0,
      Currency: "PHP",
      Description: "node package tests - anton palermo",
      Status: "U",
      Email: `${process.env.EMAIL}`,
      MobileNo: "",
      ProcId: "BOGX",
      ProcMsg: "",
      SettleDate: "",
      Param1: "",
      Param2: "",
      Fee: 0
    };

    fetch.mockResponseOnce(JSON.stringify(response));

    const details = await client2.getTransactionByRefno("SAMPLEREF");

    expect(details).toMatchObject(response);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("client able to retrieve transaction details using txnid", async () => {
    const response = {
      RefNo: "SAMPLEREF",
      MerchantId: `${process.env.MERCHANT_ID}`,
      TxnId: "SAMPLETXN",
      RefDate: "10/29/2024 9:19:24 PM",
      Amount: 100.0,
      Currency: "PHP",
      Description: "node package tests - anton palermo",
      Status: "U",
      Email: `${process.env.EMAIL}`,
      MobileNo: "",
      ProcId: "BOGX",
      ProcMsg: "",
      SettleDate: "",
      Param1: "",
      Param2: "",
      Fee: 0
    };

    fetch.mockResponseOnce(JSON.stringify(response));

    const details = await client2.getTransactionByTxnid("SAMPLETXN");

    expect(details).toMatchObject(response);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
