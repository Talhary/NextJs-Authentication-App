import { Suspense } from "react";

const LayoutAdminPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback="Loading...">
      <div>{children}</div>
    </Suspense>
  );
};
export default LayoutAdminPage;
