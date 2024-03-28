import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
type FormErrorProps = {
  message?: string;
};
export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-x-2">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p className="text-sm"> {message}</p>
    </div>
  );
};
