import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("Home Page", () => {
  it("renders without crashing", async () => {
    const ui = await Page(); // ✅ resolve the async component
    render(<Provider store={store}>{ui}</Provider>);

    expect(await screen.findByText(/Shop/i)).toBeInTheDocument();
  });
});
