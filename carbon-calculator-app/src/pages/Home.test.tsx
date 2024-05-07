import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";
import { CREATE_CARBON_CALCULATION } from "../graphql/mutations";
import { act } from "react";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mocks = {
  request: {
    query: CREATE_CARBON_CALCULATION,
    variables: {
      input: {
        creationDate: new Date("2024-05-06T12:00:00Z"),
        sessionId: "mockedSessionId",
        numPeopleLiving: 5,
        electricityConsumption: 100,
        commuteDistance: 20,
        commuteWeeklyFrequency: 3,
        commuteMode: "CAR",
        flightsPerYear: 2,
        averageFlightDurationHours: 5,
      },
    },
  },
  result: {
    data: {
      id: "1",
      airTravelEmissions: 100,
      electricityEmissions: 50,
      commuteEmissions: 30,
    },
  },
};

describe("Home", () => {
  it("should render form components", async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      screen.getByLabelText("Number of people living in your household")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Monthly Electricity Consumption")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Commute type")).toBeInTheDocument();
    expect(screen.getByLabelText("Average daily distance")).toBeInTheDocument();
    expect(screen.getByLabelText("Days per week")).toBeInTheDocument();
    expect(screen.getByLabelText("Flights per year")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Average flight duration")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should render error messages when form is submitted with empty fields", async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </MockedProvider>
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });
    act(() => {
      submitButton.click();
    });

    expect(
      await screen.findAllByText("Expected number, received nan")
    ).toHaveLength(6);
  });

  it("should send form data when form is submitted", async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </MockedProvider>
    );

    const numPeopleSelect = screen.getByLabelText(
      "Number of people living in your household"
    ) as HTMLInputElement;
    fireEvent.mouseDown(numPeopleSelect);
    const numPeopleOptionToSelect = await screen.findByText("2");
    fireEvent.click(numPeopleOptionToSelect);

    const electricityInput = screen.getByLabelText(
      "Monthly Electricity Consumption"
    ) as HTMLInputElement;

    const commuteTypeSelect = screen.getByLabelText(
      "Commute type"
    ) as HTMLInputElement;
    fireEvent.mouseDown(commuteTypeSelect);
    const commuteOptionToSelect = await screen.findByText("2");
    fireEvent.click(commuteOptionToSelect);

    const commuteDistanceInput = screen.getByLabelText(
      "Average daily distance"
    ) as HTMLInputElement;
    const commuteFrequencyInput = screen.getByLabelText(
      "Days per week"
    ) as HTMLInputElement;
    const flightsPerYearInput = screen.getByLabelText(
      "Flights per year"
    ) as HTMLInputElement;
    const flightDurationInput = screen.getByLabelText(
      "Average flight duration"
    ) as HTMLInputElement;

    electricityInput.value = "100";
    commuteDistanceInput.value = "20";
    commuteFrequencyInput.value = "3";
    flightsPerYearInput.value = "2";
    flightDurationInput.value = "5";

    const submitButton = screen.getByRole("button", { name: "Submit" });
    act(() => {
      submitButton.click();
    });

    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/results");
    });
  });
});
