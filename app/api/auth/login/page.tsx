import ErrorCardComponent from "@/components/auth/error-card";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import type { searchParamsType } from "@/types";

const ErrorPage = ({ searchParams }: { searchParams: searchParamsType }) => {
  redirect(
    cn(
      "/auth/login?error=",
      searchParams.error.split("+").join("").split("%20").join("")
    )
  );
  // return (
  //   <div className="sky-blue-background h-full flex items-center ">
  //     <ErrorCardComponent />;
  //   </div>
  // );
};
export default ErrorPage;
