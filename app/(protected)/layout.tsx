import { Suspense } from "react";
import { Navbar } from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      <div className="bg-sky-500 text-white  px-4 py-5 overflow-auto rounded-md shadow-md">
        {children}
      </div>
    </div>
  );
};
export default ProtectedLayout;
