import { prisma } from "@/utils/db";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature") as string;
  console.log("signature is ",signature)

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response("WebHook Error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  console.log("stripe session is",session)

  if (event.type === "checkout.session.completed") {
    const customerId = session.customer;
    const jobId = session.metadata?.jobId;

    console.log("entered into checkout session completed")

    if (!jobId) {
      return new Response("No Job id Found ", { status: 400 });
    }

    const company = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId as string,
      },
      select: {
        Company: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!company) {
      return new Response("No Company Found ", { status: 400 });
    }


   const updated= await prisma.jobPost.update({
      where: {
        id: jobId,
        companyId: company?.Company?.id,
      },
      data: {
        status: "ACTIVE",
      },
    });
    console.log("updated....",updated)
  }

  
  return new Response(null,{status:200})
}
