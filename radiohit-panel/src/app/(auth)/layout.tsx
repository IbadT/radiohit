interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex items-center justify-center align-middle w-full h-[100vh]">
      {children}
    </main>
  );
}
