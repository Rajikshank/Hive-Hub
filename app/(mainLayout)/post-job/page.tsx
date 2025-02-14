/* eslint-disable react/no-unescaped-entities */
 
import React from "react";
import ArcJetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";
 
import { CreateJobForm } from "@/components/forms/createJobForm";
import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/utils/requireUser";
import ModernTestimonials from "./TestimonialsCard";

const companies = [
  { id: "0", name: "ArcJet", logo: ArcJetLogo },
  { id: "1", name: "Inngest", logo: InngestLogo },
  { id: "2", name: "ArcJet", logo: ArcJetLogo },
  { id: "3", name: "Inngest", logo: InngestLogo },
  { id: "4", name: "ArcJet", logo: ArcJetLogo },
  { id: "5", name: "Inngest", logo: InngestLogo },
];

const testimonials = [
  {
    quote:
      "This platform revolutionized our hiring process. We now find top talent faster than ever!",
    author: "Jessica Lee",
    company: "NextGen Solutions",
  },
  {
    quote:
      "The user-friendly interface and the quality of candidates exceeded our expectations. Brilliant service!",
    author: "David Turner",
    company: "BrightFuture Inc.",
  },
  {
    quote:
      "In just a few days, we discovered the perfect addition to our team. Highly efficient and reliable!",
    author: "Sophia Martinez",
    company: "Visionary Ventures",
  },
];

const stats = [
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "48h", label: "Average time to hire" },
  { value: "95%", label: "Employer satisfaction rate" },
  { value: "500+", label: "Companies hiring monthly" },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      xAccount: true,
      logo: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }
  return data;
}

const PostJobPage = async () => {
  const session = await requireUser();

  const data = await getCompany(session.id as string);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyXAccount={data.xAccount}
        companyLogo={data.logo}
        companyName={data.name}
        companyWebsite={data.website}
        companyAbout={data.about}
        companyLocation={data.location}
      />

      <ModernTestimonials  companies={companies} stats={stats} testimonials={testimonials}/>

    </div>
  );
};

export default PostJobPage;
