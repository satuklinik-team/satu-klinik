export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block flex-1 h-full bg-gradient-to-r from-primary to-primary" />
      {children}
    </div>
  );
}
