import { CheckCircledIcon } from "@radix-ui/react-icons";
type FormSuccessProps = {
  message?: string | undefined | null;
};
export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 text-emerald text-sm p-3 rounded-md flex items-center gap-x-2">
      <CheckCircledIcon className="h-4 w-4" />
      <p className="text-sm"> {message}</p>
    </div>
  );
};
