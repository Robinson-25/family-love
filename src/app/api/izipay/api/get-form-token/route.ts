import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req: NextRequest) => {
  const { orderId, amount, currency, email } = await req.json();

  const url = "https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment";

  const { data } = await axios.post(
    url,
    {
      amount,
      currency,
      orderId,
      customer: {
        email,
      },
    },
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.IZIPAY_USER}:${
            process.env.NODE_ENV === "development"
              ? process.env.IZIPAY_TEST_PASSWORD
              : process.env.IZIPAY_PROD_PASSWORD
          }`
        )}`,
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json({ token: data.answer.formToken });
};
