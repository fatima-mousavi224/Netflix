import Image from "next/image";
import React from "react";

const BackgroundSignIn = () => {
  return (
    <div className="absolute inset-0 -z-10 min-h-screen w-full overflow-hidden bg-black">
      
      <Image
        src="/images/SignInBackground.jpg"
        alt="Netflix Background"
        fill
        priority
        className="object-cover opacity-75"
      />

      {/* Top Dark Gradient */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-black via-black/50 to-transparent" />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-black/70 to-transparent" />

      {/* Center Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
    </div>
  );
};

export default BackgroundSignIn;