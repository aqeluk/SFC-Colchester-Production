import AboutSFC from '@/components/AboutSFC'
import AboutSFCTitle from '@/components/AboutSFCTitle'
import FAQ from '@/components/FAQ'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About SFC Colchester | Fresh Fried Chicken, Community Focus",
  description: "Discover what sets SFC Colchester apart – fresh ingredients, top-notch service, community commitment. Learn more about us, FAQs, and how to order online!",
};

const page = () => {
  return (
    <>
      <AboutSFCTitle 
        title="Discover SFC Colchester: Where Flavor Meets Tradition" 
        subtitle="Experience authentic American cuisine in the heart of Colchester. We're more than just a restaurant; we're a culinary adventure."
      />
      <AboutSFC />
      <FAQ />
    </>
  )
}

export default page