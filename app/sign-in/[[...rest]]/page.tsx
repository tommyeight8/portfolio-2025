// app/sign-in/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center flex-col bg-gray-100 dark:bg-[#101010]">
      <h3 className="dark:text-gray-200 font-semibold mb-4">
        This login is only for TOMMY VONG
      </h3>
      <SignIn forceRedirectUrl="/dashboard" />
    </div>
  );
}
