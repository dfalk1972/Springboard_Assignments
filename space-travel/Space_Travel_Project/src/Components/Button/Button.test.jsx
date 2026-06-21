import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Launch</Button>);
    expect(screen.getByText("Launch")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Launch</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Launch" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
