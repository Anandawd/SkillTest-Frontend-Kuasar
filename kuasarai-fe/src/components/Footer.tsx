const Footer = ({
  scrollToSection,
}: {
  scrollToSection: (sectionId: string) => void;
}) => {
  return (
    <div className="w-full mt-100">
      <div className="flex flex-col gap-5 items-center sm:grid sm:grid-cols-4 sm:gap-0 sm:items-start mb-15 overflow-hidden">
        {/* logo */}
        <div className="flex flex-col sm:items-start">
          <img src="/logo.svg" alt="logo" className="h-22 w-auto" />
          <h1 className="text-2xl font-bold text-gray-700 mb-4">ATLAS AI</h1>
          <p className="sm:text-start text-x/normal text-gray-900">
            Your ultimate guide <br />
            to exploring the world.
          </p>
        </div>

        <div className=""></div>

        {/* quick link */}
        <div className="flex flex-col sm:items-start sm:text-start">
          <h1 className="text-lg sm:text-xl font-medium mb-4 text-gray-900">
            Quick Links
          </h1>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
                className="text-sm sm:text-base text-gray-600 hover:text-blue-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#countries"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("countries");
                }}
                className="text-sm sm:text-base text-gray-600 hover:text-blue-500"
              >
                Countries
              </a>
            </li>
            <li>
              <a
                href="#chatbot"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("chatbot");
                }}
                className="text-sm sm:text-base text-gray-600 hover:text-blue-500"
              >
                AI Assistants
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className="text-sm sm:text-base text-gray-600 hover:text-blue-500"
              >
                About
              </a>
            </li>
          </ul>
        </div>

        {/* contact information */}
        <div className="flex flex-col sm:items-start sm:text-start">
          <h1 className="text-lg sm:text-xl font-medium mb-4 text-gray-900">
            Contact Us
          </h1>
          <ul className="flex flex-col gap-2">
            <li className="text-sm sm:text-base text-gray-600">
              Email: support@atlasai.com
            </li>
            <li className="text-sm sm:text-base text-gray-600">
              Phone: +62 8534-516-5660
            </li>
            <li className="text-sm sm:text-base text-gray-600">
              Jl. Gatot Subroto No.45, Denpasar, Bali
            </li>
            <li className="text-sm sm:text-base text-gray-600">
              Mon-Fri, 09:00 - 17:00 WITA
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
