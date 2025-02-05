import { motion } from "motion/react";

const Brand = () => {
  const listBrand = [
    "/brand-1.png",
    "/brand-2.png",
    "/brand-3.png",
    "/brand-4.png",
    "/brand-5.png",
    "/brand-6.png",
    "/brand-7.png",
    "/brand-8.png",
  ];
  return (
    <div className="mb-20 overflow-x-hidden ">
      <h1 className="text-gray-400 mb-4 text-base sm:text-xl">Powered by</h1>
      <div className="flex gap-3 BrandBlur items-center">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-3 shrink-0"
        >
          {listBrand.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={"logo " + index}
              className="h-[80%] sm:h-[100%] w-auto"
            />
          ))}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-3 shrink-0"
        >
          {listBrand.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={"logo " + index}
              className="h-[80%] sm:h-[100%] w-auto"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Brand;
