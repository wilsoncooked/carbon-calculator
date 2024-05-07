import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { Results } from "./Results";
import { GET_CARBON_BY_SESSION_ID } from "../graphql/queries";
import { act } from "react";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockSessionId = "exampleSessionId";

const mocks = {
  request: {
    query: GET_CARBON_BY_SESSION_ID,
    variables: {
      sessionId: mockSessionId,
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
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn().mockReturnValue(mockSessionId),
      },
      writable: true,
    });
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
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn().mockReturnValue(mockSessionId),
      },
      writable: true,
    });
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Results />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Your Carbon emissions:")).toBeInTheDocument();
    });
    expect(screen.queryByText("Air Travel")).toBeInTheDocument();
    expect(screen.queryByText("10")).toBeInTheDocument();
    expect(screen.queryByText("Your commute")).toBeInTheDocument();
    expect(screen.queryByText("20")).toBeInTheDocument();
    expect(screen.queryByText("Household Electricity")).toBeInTheDocument();
    expect(screen.queryByText("30")).toBeInTheDocument();
    expect(screen.queryByText("Total Carbon emissions")).toBeInTheDocument();
    expect(screen.queryByText("60")).toBeInTheDocument();
  });

  it("should take user back to home on button click", async () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn().mockReturnValue(mockSessionId),
      },
      writable: true,
    });
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Results />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Your Carbon emissions:")).toBeInTheDocument();
    });

    const startOverButton = screen.getByRole("button", { name: "Start over" });

    act(() => {
      startOverButton.click();
    });

    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
