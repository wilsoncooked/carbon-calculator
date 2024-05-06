import { gql } from "@apollo/client";

export const GET_CARBON_BY_SESSION_ID = gql`
  query GetCarbonBySessionId($sessionId: String!) {
    getCarbonBySessionId(sessionId: $sessionId) {
      id
      airTravelEmissions
      commuteEmissions
      electricityEmissions
    }
  }
`;
