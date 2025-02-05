import { GET_ALL_COUNTRIES, GET_DETAILS_COUNTRY } from "@/utils/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import Modal from "./Modal";

const ITEMS_PER_PAGE = 10;

const Table = () => {
  // get all countries
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useQuery(GET_ALL_COUNTRIES);

  // get details country
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: countryDetails, loading: loadingDetails } = useQuery(
    GET_DETAILS_COUNTRY,
    {
      variables: { code: selectedCountryCode },
      skip: !selectedCountryCode,
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-only",
    }
  );

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  // pagination
  const totalCountries = data?.countries.length || 0;
  const totalPages = Math.ceil(totalCountries / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCountries = data.countries.slice(startIndex, endIndex);

  const handleRowClick = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    setIsModalOpen(true);
  };

  return (
    <div className="relative overflow-x-auto rounded-2xl outline-1 outline-gray-300 drop-shadow-xl sm:drop-shadow-2xl bg-white">
      <div className="grid grid-cols-3 py-3 border-b border-gray-200 bg-gray-300 ">
        <div className="flex gap-2 ml-5 items-center">
          <div className="w-4 h-4 bg-red-400 rounded-2xl max-md:w-3 max-md:h-3"></div>
          <div className="w-4 h-4 bg-yellow-400 rounded-2xl max-md:w-3 max-md:h-3"></div>
          <div className="w-4 h-4 bg-green-400 rounded-2xl max-md:w-3 max-md:h-3"></div>
        </div>
        <h1 className="text-2xl font-medium text-gray-800 max-md:text-xl max-sm:text-[16px]">
          Table of Countries
        </h1>
        <div></div>
      </div>
      {/* Table */}
      <table className="w-full text-center rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-800 bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-2 sm:py-4">
              No
            </th>
            <th scope="col" className="px-6 py-2 sm:py-4">
              Country Name
            </th>
            <th scope="col" className="px-6 py-2 sm:py-4">
              Flag
            </th>
            <th scope="col" className="px-6 py-2 sm:py-4">
              Capital
            </th>
            <th scope="col" className="px-6 py-2 sm:py-4">
              Currency
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {paginatedCountries.map((country, index) => (
            <tr
              key={country.code}
              className="bg-white border-b border-gray-200 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleRowClick(country.code)}
            >
              <td className="px-4 py-2 sm:py-4 font-normal">
                {startIndex + index + 1}
              </td>
              <td className="px-6 py-2 sm:py-4 font-normal">{country.name}</td>
              <td className="px-6 py-2 sm:py-4 font-normal">{country.emoji}</td>
              <td className="px-6 py-2 sm:py-4 font-normal">
                {country.capital || "-"}
              </td>
              <td className="px-6 py-2 sm:py-4 font-normal">
                {country.currency || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between my-10 mx-5"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {startIndex + 1}-{Math.min(endIndex, totalCountries)}
          </span>{" "}
          of
          <span className="font-semibold text-gray-900"> {totalCountries}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                currentPage === 1
                  ? "text-gray-300 bg-white border-gray-200 cursor-not-allowed"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } rounded-s-lg`}
            >
              Previous
            </button>
          </li>

          <li>
            <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">
              Page {currentPage} of {totalPages}
            </div>
          </li>

          <li>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                currentPage === totalPages
                  ? "text-gray-300 bg-white border-gray-200 cursor-not-allowed"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } rounded-e-lg`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal */}
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {loadingDetails ? (
          <p>Loading detail..</p>
        ) : countryDetails?.country ? (
          <div className="p-6 ">
            <h3 className="text-xl font-semibold text-gray-900 mb-5 ">
              {countryDetails.country.name} {countryDetails.country.emoji}
            </h3>
            <div className="text-left">
              <p className="font-normal text-gray-500 mb-2">
                <strong>Capital: </strong>{" "}
                {countryDetails.country.capital || "-"}
              </p>
              <p className="font-normal text-gray-500  mb-2">
                <strong>Currency: </strong>{" "}
                {countryDetails.country.currency || "-"}
              </p>
              <p className="font-normal text-gray-500  mb-2">
                <strong>Phone Code: </strong> +
                {countryDetails.country.phone || "-"}
              </p>
              <p className="font-normal text-gray-500  mb-2">
                <strong>Continent: </strong>
                {countryDetails.country.continent.name || "-"}
              </p>
              <p className="font-normal text-gray-500  mb-2">
                <strong>Languages: </strong>
              </p>
              <ul className="list-disc ml-5 font-normal text-gray-500">
                {countryDetails.country.languages.length > 0 ? (
                  countryDetails.country.languages.map((lang) => (
                    <li key={lang.name}>
                      {lang.name} ({lang.native})
                    </li>
                  ))
                ) : (
                  <li>-</li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <p>No details found.</p>
        )}
      </Modal>
    </div>
  );
};

export default Table;
