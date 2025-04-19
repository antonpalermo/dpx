import { Buffer } from 'node:buffer';

export type Option = {
  mid: string;
  secretKey: string;
  api?: {
    version: 'v1' | 'v2';
  };
};

export interface BillingInfo {
  firstname: string;
  lastname: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  telno: string;
  email: string;
}

export interface ShippingInfo {
  firstname: string;
  middlename: string;
  lastname: string;
  address1: string;
  address2: string;
  barangay: string;
  city: string;
  province: string;
  country: string;
  zipCode: string;
  landmark: string;
  telno: string;
  email: string;
}

export interface Transaction {
  amount: number;
  currency: 'PHP';
  description: string;
  email: string;
  mobileNo?: string;
  param1?: string;
  param2?: string;
  expiry?: Date;
}

export function CollectionClient({
  mid,
  secretKey,
  api = { version: 'v2' },
}: Option) {
  const env = process.env.NODE_ENV === 'development' ? 'test' : 'gw';

  const endpoint = `https://${env}.dragonpay.ph/api/collect/${api.version}`;

  const Authorization = `Basic ${Buffer.from(`${mid}:${secretKey}`).toString(
    'base64',
  )}`;

  async function collect(txnid: string, data: Transaction) {
    try {
      const req = await fetch(`${endpoint}/${txnid}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
        body: JSON.stringify(data),
      });

      return await req.json();
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred while collecting data.' };
    }
  }

  /**
   * get transaction details using the provided refno
   * @param refno unique reference number assigned to a transaction.
   */
  async function getTransactionByRefno(refno: string) {
    try {
      const request = await fetch(`${endpoint}/refno/${refno}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      });

      return await request.json();
    } catch (error) {
      console.log('getTransactionByRefno: unable to process request');
      throw error;
    }
  }

  /**
   * get transaction details using the provided txnid
   * @param txnid unique transaction id assigned to a transaction.
   */
  async function getTransactionByTxnid(txnid: string) {
    try {
      const request = await fetch(`${endpoint}/txnid/${txnid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      });

      return await request.json();
    } catch (error) {
      console.log('getTransactionByTxnid: unable to process request');
      throw error;
    }
  }

  /**
   * void transaction based on the provided txnid.
   * @param txnid unique transaction id assigned to a transaction.
   */
  async function cancelTransaction(txnid: string) {
    try {
      const request = await fetch(`${endpoint}/void/${txnid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      });
      return await request.json();
    } catch (error) {
      console.log('cancelTransaction: unable to process request');
      throw error;
    }
  }

  async function getTransactions(from: Date, to: Date) {
    const parseDate = (date: Date) =>
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    try {
      const request = await fetch(
        `${endpoint}/transactions?startdate=${parseDate(from)}&enddate=${parseDate(to)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization,
          },
        },
      );
      return await request.json();
    } catch (error) {
      console.log('cancelTransaction: unable to process request');
      throw error;
    }
  }

  async function getSettledTransactions(from: Date, to: Date) {
    const parseDate = (date: Date) =>
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    try {
      const request = await fetch(
        `${endpoint}/settled?startdate=${parseDate(from)}&enddate=${parseDate(to)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization,
          },
        },
      );
      return await request.json();
    } catch (error) {
      console.log('cancelTransaction: unable to process request');
      throw error;
    }
  }

  return {
    collect,
    getTransactions,
    cancelTransaction,
    getTransactionByRefno,
    getTransactionByTxnid,
    getSettledTransactions,
  };
}
