import AboutSFCTitle from '@/components/AboutSFCTitle'
import JobsAtSFC from '@/components/JobsAtSFC'
import JobsContact from '@/components/JobsContact'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SFC Colchester Jobs | Join Our Team, Build Your Career",
  description: "Kickstart your culinary career at SFC Colchester! Competitive pay, benefits, growth opportunities, and a positive work environment. Apply online now!",
};

const page = () => {
  return (
    <>
      <AboutSFCTitle 
        title="Join the SFC Colchester Family: Where Careers are Crafted" 
        subtitle="Looking for more than just a job? Start your culinary career journey with us today."
      />
      <JobsAtSFC />
      <JobsContact />
    </>
  )
}

export default page