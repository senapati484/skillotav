"use client";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      {children}
    </main>
  );
}