import LifetimeClient from "@/index";
import fetch from "jest-fetch-mock";

const client = LifetimeClient({
  mid: `${process.env.MERCHANT_ID}`,
  secret: `${process.env.MERCHANT_COLLECTION_API_KEY}`,
  prefix: `${process.env.MERCHANT_PREFIX}`
});

beforeEach(() => {
  fetch.resetMocks();
});

describe("lifetime client version 1", () => {
  test("client able create a lifetime id", async () => {
    fetch.mockResponseOnce(JSON.stringify("ZZ000527"));
    const lid = await client.create({
      email: `${process.env.EMAIL}`,
      name: "Anton Palermo",
      remarks: "lid package tests create sample lid"
    });
    expect(lid).toBe("ZZ000527");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("client able to fetch lifetime id details", async () => {
    const response = {
      userId: "ZZ000527",
      merchantId: `${process.env.MERCHANT_ID}`,
      custName: "Anton Palermo",
      custEmail: `${process.env.EMAIL}`,
      remarks: "test create lid",
      status: "A",
      created: "2024-11-04T21:32:39.3966667",
      staticQr: null
    };

    fetch.mockResponse(JSON.stringify(response));

    const details = await client.getDetails("ZZ000527");
    expect(details).toEqual(response);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("client able to activate lifetime id", async () => {
    fetch.mockResponseOnce("", { status: 200 });

    const result = await client.activate("ZZ000527");

    // TODO: assert response.
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("client able to deactivate lifetime id", async () => {
    fetch.mockResponseOnce("", { status: 200 });

    const result = await client.deactivate("ZZ000527");

    // TODO: assert response.
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
