import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", href: "#home", sectionId: "home" },
  { name: "Countries", href: "#countries", sectionId: "countries" },
  { name: "AI Assistants", href: "#chatbot", sectionId: "chatbot" },
  { name: "About", href: "#about", sectionId: "about" },
];

const Navbar = ({
  scrollToSection,
}: {
  scrollToSection: (sectionId: string) => void;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(navigation[0].name);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isBottom = scrollPosition + windowHeight >= documentHeight - 50;

      if (isBottom) {
        setActiveLink(navigation[navigation.length - 1].name);
        return;
      }

      for (const { name, sectionId } of navigation) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const navbar = document.querySelector("header");
          const navbarHeight = navbar ? navbar.offsetHeight : 0;

          if (rect.top <= navbarHeight + 100 && rect.bottom > navbarHeight) {
            setActiveLink(name);
            break;
          }
        }
      }
    };

    handleScroll();

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  const handleLinkClick = (name: string) => {
    setActiveLink(name);
    setMobileMenuOpen(false);
    const navItem = navigation.find((item) => item.name === name);
    if (navItem) {
      scrollToSection(navItem.sectionId);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        {/* logo */}
        <div className="flex lg:flex-1">
          <a
            href="#home"
            className="-m-1.5 p-1.5"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("Home");
            }}
          >
            <span className="sr-only">Atlas AI</span>
            <img src="logo.svg" alt="logo" className="h-8 w-auto" />
          </a>
        </div>

        {/* hamburger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>
        </div>

        {/* nav button */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm/6 font-semibold transition-colors duration-300 ${
                activeLink === item.name
                  ? "text-blue-500"
                  : "text-gray-900 hover:text-blue-500"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.name);
              }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* sign in button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Sign In <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* mobile nav button */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* logo */}
          <div className="flex items-center justify-between">
            <a
              href="#home"
              className="-m-1.5 p-1.5"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("Home");
              }}
            >
              <span className="sr-only">Atlas AI</span>
              <img className="h-8 w-auto" src="/logo.svg" alt="logo" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="size-6" aria-hidden="true" />
            </button>
          </div>
          {/* nav button */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold transition-colors duration-300 ${
                      activeLink === item.name
                        ? "text-blue-500 bg-blue-50"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.name);
                    }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* sign in button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Sign In <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
