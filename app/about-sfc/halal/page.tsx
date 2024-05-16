import AboutSFCTitle from '@/components/AboutSFCTitle'
import Halal from '@/components/Halal'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About SFC Colchester | Halal Fried Chicken & Comfort Food Done Right",
  description: "Discover SFC Colchester's dedication to Halal cuisine. Fresh ingredients, strict standards, diverse menu. Order your Halal favorites online now!",
};

const page = () => {
  return (
    <>
      <AboutSFCTitle 
        title="SFC Colchester: Your Destination for Halal Comfort Food" 
        subtitle="Enjoy a diverse range of Halal dishes that don't compromise on flavor or quality."
      />
      <Halal />
    </>
  )
}

export default page