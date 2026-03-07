import { NextRequest, NextResponse } from "next/server";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";

export const POST = async (req: NextRequest) => {
  try {
    const form = await req.formData();

    const answer = JSON.parse(form.get("kr-answer") as string);
    const hash = form.get("kr-hash");
    const answerHash = Hex.stringify(
      hmacSHA256(
        form.get("kr-answer") as string,
        process.env.NODE_ENV === "development"
          ? (process.env.IZIPAY_TEST_HMAC_KEY as string)
          : (process.env.IZIPAY_PROD_HMAC_KEY as string)
      )
    );

    if (hash === answerHash) {
      // return NextResponse.redirect(
      //   new URL(
      //     `/pago/resultados-de-pago?status=${answer.orderStatus}&total-amount=${answer.orderDetails.orderTotalAmount}`,
      //     process.env.NODE_ENV === "development"
      //       ? req.url
      //       : `https://www.${process.env.NEXTAUTH_URL}`
      //   )
      // );
      return NextResponse.json({ message: "Pago procesado correctamente" });
    } else {
      return NextResponse.json({ error: "Intento de fraude" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
