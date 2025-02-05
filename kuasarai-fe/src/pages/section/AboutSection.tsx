const AboutSection = () => {
  return (
    <div
      id="about"
      className="w-full flex flex-row-reverse gap-5 justify-between my-30 sm:my-50 overflow-hidden"
    >
      <div className="w-full lg:max-w-120 text-start ">
        <h1 className="text-gray-900 text-3xl sm:text-5xl font-bold mb-3">
          About Us
        </h1>
        <h2 className="text-gray-500 text-base sm:text-xl mb-5">
          Our Mission and Vision
        </h2>
        <p className="text-gray-800 text-base sm:text-xl/normal">
          We are committed to providing accurate and easily accessible country
          information, as well as interactive experiences powered by the latest
          AI technology. Our mission is to help you explore the world in a
          smarter and more informed way. Join us on this journey and discover
          the wonders of the world at your fingertips.
        </p>
      </div>
      <div></div>
      {/* gradient bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 mt-30 z-10 transform-gpu overflow-hidden blur-3xl "
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+10rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
};

export default AboutSection;
