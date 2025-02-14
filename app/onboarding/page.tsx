import { OnboardingForm } from "@/components/forms/onboarding/OnboardingForm";
import { prisma } from "@/utils/db";
import { requireUser } from "@/utils/requireUser";
import { redirect } from "next/navigation";

async function checkifUserHasFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    return redirect("/main");
  }
  return user;
}

export default async function OnboardingPage() {

  const session=await requireUser();

   await checkifUserHasFinishedOnboarding(session.id as string );

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
}
