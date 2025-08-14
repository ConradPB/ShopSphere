import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("Home Page", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    // Example check:
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
  });
});
