export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block bg-gradient-to-r from-primary to-primary" />
      <div className="bg-white grid place-items-center overflow-auto">
        {children}
      </div>
    </div>
  );
}
