import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "./Loading";

describe("Loading", () => {
  it("shows the default message", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows a custom message", () => {
    render(<Loading message="Building spacecraft..." />);
    expect(screen.getByText("Building spacecraft...")).toBeInTheDocument();
  });
});
