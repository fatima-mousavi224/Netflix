
import BackgroundSignIn from "@/src/components/auth/BackgroundSignIn";
import SignInCard from "@/src/components/auth/SignInCard";

export default function SignInPage() {

  return (
      <main className="relative min-h-screen text-primary-white">
      <BackgroundSignIn />
      
      <div className="relative z-10 lg:px-40 md:px-20 px-8">
        <SignInCard />
      </div>
    </main>
  );
}