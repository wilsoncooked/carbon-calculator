import { gql } from "@apollo/client";

export const GET_CARBON_CALCULATIONS = gql`
  query GetCarbonCalculations($sessionId: String!) {
    carbonCalculations(sessionId: $sessionId) {
      id
      airTravelEmissions
      commuteEmissions
      electricityEmissions
  `;
