import { Suspense } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback="Loading...">
      <div className="">{children}</div>
    </Suspense>
  );
};
export default ProtectedLayout;
