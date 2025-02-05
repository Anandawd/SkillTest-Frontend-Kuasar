import { gql } from "@apollo/client";

const GET_ALL_COUNTRIES = gql`
  query getAllCountries {
    countries {
      code
      name
      emoji
      capital
      currency
    }
  }
`;

const GET_DETAILS_COUNTRY = gql`
  query getCountryDetails($code: ID!) {
    country(code: $code) {
      name
      emoji
      capital
      currency
      phone
      languages {
        name
        native
      }
      continent {
        name
      }
    }
  }
`;

export { GET_ALL_COUNTRIES, GET_DETAILS_COUNTRY };
