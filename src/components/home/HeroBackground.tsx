
import Image from "next/image";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full overflow-hidden bg-black">
      <Image
        src="/images/landingPageBackground.jpg" 
        alt="Netflix Background"
        fill
        priority
        className="object-cover opacity-75" 
      />

      <div className="absolute inset-0 bg-linear-to-b from-black via-black/40 to-transparent h-1/3" />

      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-grey-850 via-black/50 to-transparent h-1/2" />

      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%]" />
    </div>
  );
};

export default HeroBackground;