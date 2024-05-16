import AboutSFCTitle from "@/components/AboutSFCTitle";
import ContactUs from "@/components/ContactUs";

const page = () => {
  return (
    <div>
      <AboutSFCTitle
        title="Reach Out to SFC Colchester: We`re Here to Listen"
        subtitle="Have questions, comments, or special requests? Get in touch today. Your feedback makes us better."
      />
      <ContactUs />
    </div>
  );
};

export default page;
