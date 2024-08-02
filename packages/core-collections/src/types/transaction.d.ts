export type TransactionDetails = {
  amount: number;
  currency: "PHP" | "USD";
  description: string;
  email: string;
  mobileNo: string;
  param1?: any;
  param2?: any;
  expiry?: Date;
};

export type Transaction =
  | (TransactionDetails & {
      procId?: "CC";
      billingDetails: BillingInfo;
    })
  | (TransactionDetails & {
      procId?: "LBCX";
      senderShippingDetails: ShippingInfo;
      recipientShippingDetails: ShippingInfo;
    })
  | (TransactionDetails & {
      procId?: string;
    });

export type BillingInfo = {
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
};

export type ShippingInfo = {
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
};
