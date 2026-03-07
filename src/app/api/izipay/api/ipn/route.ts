import { NextRequest, NextResponse } from "next/server";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";
import { prisma } from "@/lib/prisma";


export const POST = async (req: NextRequest) => {
  const form = await req.formData();

  try {
    const answer = JSON.parse(form.get("kr-answer") as string);
    const hash = form.get("kr-hash");
    const answerHash = Hex.stringify(
      hmacSHA256(
        form.get("kr-answer") as string,
        process.env.NODE_ENV === "development"
          ? (process.env.IZIPAY_TEST_PASSWORD as string)
          : (process.env.IZIPAY_PROD_PASSWORD as string)
      )
    );

    if (hash === answerHash) {
      if (answer.orderStatus === "PAID") {
        const updatedBookings = await prisma.booking.updateMany({
          where: { transactionId: answer.orderDetails.orderId },
          data: { paymentStatus: "paid" },
        });
      }

      return NextResponse.json(
        { message: "Pago procesado correctamente" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Intento de fraude" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
