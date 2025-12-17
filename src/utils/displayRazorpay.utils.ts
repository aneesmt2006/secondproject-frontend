/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { loadScript } from "./loadScript.utils";
import { axiosInstance } from "../services/api/auth.service";
import { APIResponse } from "@/services/types/api.response";
export type TRazorpayOrderResponse = {
  keyId: string;
  currency: string;
  amount: number;
  razorpayOrderId: string;
  tempOrderId: string;
  message?: string;
};


export const displayRazorpay = async (paymentData:{userId:string,doctorId:string,amount:number}) => {
  // Load Razorpay SDK
  const sdkLoaded =  await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!sdkLoaded) {
    toast.error("Razorpay SDK failed to load, Are you online?");
    return;
  }

  // Create order from backend
  const result = await axiosInstance.post<APIResponse<TRazorpayOrderResponse>>("/payment/create/order", paymentData);

  if (!result || !result.data) {
    toast.error("Internal server error. Please try again later");
    return;
  }

  // Destructure response safely
  // const { keyId, currency, amount, razorpayOrderId, tempOrderId, message } = result.data;

  // if (message) toast.info(message);

  // Razorpay checkout options
  const options = {
    key: result.data.data?.keyId,
    amount: (result.data.data!.amount * 100).toString(), // Razorpay requires paise
    currency:result.data.data?.currency,
    name: "Mama's Time",
    description: "Doctor Appointment Payment",
    order_id: result.data.data?.razorpayOrderId,

    handler: async (response: any) => {
      try {
        const verifyBody = {
          orderCreationId:result.data.data?.tempOrderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

         await axiosInstance.post("/payment/create/verify", verifyBody);

        toast.info("Payment Verified");
      } catch (error) {
        console.log(error)
        toast.error("Payment verification failed");
      }
    },

    prefill: {
      name: "Mama's Time",
      email: "MamasInfo@example.com",
      contact: "9999999999",
    },

    notes: {
      address: "Mama's Time Corporate Office",
    },

    theme: {
      color: "#61dafb",
    },
  };

  // Open Razorpay window
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
