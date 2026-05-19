import LandingPageFooter from "@/src/ui/footers/LandingPageFooter"
import FAQSection from "./FAQSection"
import HeroSection from "./HeroSection"
import PromoBanner from "./PromoBanner"
import Secction1 from "./Secction1"
import Secction2 from "./Secction2"
import Secction3 from "./Secction3"
import Secction4 from "./Secction4"

function LandingPage() {
  return (
    <div>
      <HeroSection />
      <PromoBanner />
      <Secction1 />
      <Secction2 />
      <Secction3 />
      <Secction4 />
      <FAQSection />
      <LandingPageFooter />
    </div>
  )
}

export default LandingPage
