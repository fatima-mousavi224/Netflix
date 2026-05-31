"use client";

import BackgroundSignIn from "@/src/components/auth/BackgroundSignIn";
import SignUpCard from "@/src/components/auth/SignUpCard";


export default function SignupPage() {
  return (
      <main className="relative min-h-screen text-primary-white">
      <BackgroundSignIn />
      
      <div className="relative z-10 lg:px-40 md:px-20 px-8">
        <SignUpCard />
      </div>
    </main>
  );
}