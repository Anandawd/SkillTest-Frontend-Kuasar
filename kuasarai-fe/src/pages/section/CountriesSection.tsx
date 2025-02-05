import Table from "../../components/Table";

const CountriesSection = () => {
  return (
    <div
      id="countries"
      className="w-full flex flex-col lg:flex-row-reverse gap-10 lg:gap-5 justify-between my-30 sm:my-50"
    >
      <div className="absolute w-[200px] sm:w-[400px] lg:w-[600px] h-auto mt-260 right-10 xs:mt-250 sm:mt-250 lg:-right-20 lg:mt-80 xl:right-20 BirdBlur">
        <img src="/bird-flip.png" alt="bot" />
      </div>
      <div className="w-full lg:max-w-120 text-start">
        <h1 className="text-gray-900 text-3xl sm:text-5xl font-bold mb-3">
          Explore the World
        </h1>
        <h2 className="text-gray-500 text-base sm:text-xl mb-5">
          Discover Countries at a Glance
        </h2>
        <p className="text-gray-800 text-base sm:text-xl/normal">
          Discover fascinating information about countries around the world.
          From capital cities to currencies, get all the details you need to
          broaden your horizons. Click on a country to see more information and
          learn more about its culture and language.
        </p>
      </div>
      <Table />
    </div>
  );
};

export default CountriesSection;
