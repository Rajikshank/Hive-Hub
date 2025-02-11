import { Navbar } from "@/components/views/Navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container  mx-auto px-4 md:px-6 lg:px-8 pb-12">
      <Navbar />
      {children}
    </div>
  );
}
