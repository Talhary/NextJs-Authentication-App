export const Header = ({ label }: { label: string }) => {
  return (
    <header className="flex flex-col gap-y-5  justify-center items-center w-full">
      <h1>🔒 Auth</h1>
      <p className="text-sm text-muted-foreground "> {label}</p>
    </header>
  );
};
