type AboutSFCProps = {
    title: string,
    subtitle: string,
  };
  
  const AboutSFCTitle: React.FC<AboutSFCProps> = ({ title, subtitle }) => {
    return (
      <header className="text-center my-8 p-2">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="text-lg md:text-2xl mt-2 text-gray-700">
          {subtitle}
        </p>
      </header>
    );
  };
  
  export default AboutSFCTitle;
  