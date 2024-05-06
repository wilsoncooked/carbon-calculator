import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render title", () => {
    render(<App />);
    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});
