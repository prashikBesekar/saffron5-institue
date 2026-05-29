import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import CoursesSection from '../components/sections/CoursesSection'
import WhyUsSection from '../components/sections/WhyUsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'
import BlogSection from '../components/sections/BlogSection'

function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <CoursesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </main>
  )
}

export default Home