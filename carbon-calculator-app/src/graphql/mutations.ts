import { gql } from "@apollo/client";

export const CREATE_CARBON_CALCULATION = gql`
  mutation CreateCarbonCalculation($input: CreateCarbonCalculationInput!) {
    createCarbonCalcuation(input: $input) {
      id
      creationDate
      sessionId
      numPeopleLiving
      electricityConsumption
      electricityEmissions
      commuteDistance
      commuteWeeklyFrequency
      commuteMode
      commuteEmissions
      flightsPerYear
      averageFlightDurationHours
      airTravelEmissions
    }
  }
`;
