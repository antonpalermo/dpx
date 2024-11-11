import { Buffer } from "node:buffer";

export interface MUVADetails {
  name: string;
  email: string;
  remarks: string;
  preferredId: string;
}

export interface MUVAClientOptions {
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
  bin: string;

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

export default function MUVAClient({
  mid,
  secret,
  bin,
  options
}: MUVAClientOptions) {
  const env = process.env.NODE_ENV === "development" ? "test" : "gw";

  const version = options?.version;
  const endpoint = `https://${env}.dragonpay.ph/api/collect/${version}`;

  const toBase64Encode = (value: string) =>
    Buffer.from(value).toString("base64");

  async function create(details: MUVADetails) {
    try {
      const request = await fetch(`${endpoint}/lifetimeid/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${toBase64Encode(`${mid}:${secret}`)}`
        },
        body: JSON.stringify({ bin, ...details })
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

      if (!request.ok) {
        return {
          success: false,
          message: "MUVA not found or already active"
        };
      }

      return {
        success: true,
        message: "MUVA reactivated successful"
      };
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

      if (!request.ok) {
        return {
          success: false,
          message: "MUVA not found or already deactivated"
        };
      }

      return {
        success: true,
        message: "MUVA deactivated successful"
      };
    } catch (error) {
      console.log("deactivate: unable to process lid action");
    }
  }

  async function updateDetails(
    lid: string,
    details: Partial<Omit<MUVADetails, "prefix">>
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

      if (!request.ok) {
        return {
          success: false,
          message: "Unable to update the requested lifetime id"
        };
      }

      return {
        success: true,
        message: "MUVA details updated successful"
      };
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
