import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { Results } from "./Results";
import { GET_CARBON_BY_SESSION_ID } from "../graphql/queries";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const mocks = {
  request: {
    query: GET_CARBON_BY_SESSION_ID,
    variables: {
      sessionId: "exampleSessionId",
    },
    skip: false,
  },
  result: {
    data: {
      getCarbonBySessionId: [
        {
          id: "1",
          airTravelEmissions: 10,
          commuteEmissions: 20,
          electricityEmissions: 30,
        },
      ],
    },
  },
};

describe("Results component", () => {
  it("renders loading indicator while fetching data", async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MemoryRouter>
          <Results />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders results correctly after data is fetched", async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Results />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Your Carbon emissions:")).toBeInTheDocument();
    });
  });
});
