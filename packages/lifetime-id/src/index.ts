import { Buffer } from "node:buffer";

export interface LifetimeDetails {
  name: string;
  email: string;
  remarks: string;
}

export interface LifetimeClientOptions {
  /**
   * Dragonpay assigned merchant id.
   */
  mid: string;

  /**
   * Dragonpay assigned API collection secret key.
   */
  secret: string;

  /**
   * Unique prefix assigned by Dragonpay.
   */
  prefix: string;

  /**
   * API optional parameters
   */
  options?: {
    /**
     * version of dragonpay collection api to be consumed.
     *
     * default: v1
     */
    version: "v1" | "v2";
  };
}

export default function LifetimeClient({
  mid,
  secret,
  prefix,
  options
}: LifetimeClientOptions) {
  const env = process.env.NODE_ENV === "development" ? "test" : "gw";

  const version = options?.version;
  const endpoint = `https://${env}.dragonpay.ph/api/collect/${version}`;

  const toBase64Encode = (value: string) =>
    Buffer.from(value).toString("base64");

  async function create(details: LifetimeDetails) {
    try {
      const request = await fetch(`${endpoint}/lifetimeid/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${toBase64Encode(`${mid}:${secret}`)}`
        },
        body: JSON.stringify({ prefix, ...details })
      });

      const response = await request.json();
      return response;
    } catch (error) {
      console.log("create: unable to create lid");
    }
  }

  async function getDetails(lid: string) {
    try {
      const request = await fetch(`${endpoint}/lifetimeid/${lid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${toBase64Encode(`${mid}:${secret}`)}`
        }
      });

      const response = await request.json();
      return response;
    } catch (error) {
      console.log("activate: unable to process lid action");
    }
  }

  async function activate(lid: string) {
    try {
      const request = await fetch(`${endpoint}/lifetimeid/activate/${lid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${toBase64Encode(`${mid}:${secret}`)}`
        }
      });

      const response = await request.json();
      return response;
    } catch (error) {
      console.log("activate: unable to process lid action");
    }
  }

  async function deactivate(lid: string) {
    try {
      const request = await fetch(`${endpoint}/lifetimeid/deactivate/${lid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${toBase64Encode(`${mid}:${secret}`)}`
        }
      });

      const response = await request.json();
      return response;
    } catch (error) {
      console.log("deactivate: unable to process lid action");
    }
  }

  async function updateDetails(
    lid: string,
    details: Partial<Omit<LifetimeDetails, "prefix">>
  ) {
    try {
      const request = await fetch(`${endpoint}/lifetimeid/${lid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${toBase64Encode(`${mid}:${secret}`)}`
        },
        body: JSON.stringify(details)
      });

      const response = await request.json();
      return response;
    } catch (error) {
      console.log("create: unable to create lid");
    }
  }

  async function generateStaticQR(lid: string) {
    try {
      const request = await fetch(
        `${endpoint}/lifetimeid/${lid}/generate-static-qr`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${toBase64Encode(`${mid}:${secret}`)}`
          }
        }
      );

      const response = await request.json();
      return response;
    } catch (error) {
      console.log("activate: unable to process lid action");
    }
  }

  return {
    create,
    getDetails,
    updateDetails,
    activate,
    deactivate,
    generateStaticQR
  };
}
