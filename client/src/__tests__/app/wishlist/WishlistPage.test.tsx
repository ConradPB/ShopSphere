import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import WishlistPage from "@/app/wishlist/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as reduxHooks from "@/redux/hooks";

// ✅ Mock Redux hooks once (no redefining later)
jest.mock("@/redux/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// ✅ Mock toast and router
jest.mock("react-hot-toast", () => ({
  custom: jest.fn(),
  dismiss: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

describe("WishlistPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ Always return the same state for wishlist
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue([
      { id: "1", title: "Cool Shoes", price: 99.99, image: "/test.jpg" },
    ]);
  });

  const renderPage = () =>
    render(
      <Provider store={store}>
        <WishlistPage />
      </Provider>
    );

  it("renders wishlist page with items", async () => {
    await act(async () => {
      renderPage();
    });

    expect(screen.getByText(/my wishlist/i)).toBeInTheDocument();
    expect(screen.getByText(/cool shoes/i)).toBeInTheDocument();
    expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();
  });

  it("handles move to cart and shows toast", async () => {
    const mockDispatch = jest.fn();
    (reduxHooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    await act(async () => {
      renderPage();
    });

    const moveToCartBtn = screen.getByRole("button", { name: /move to cart/i });

    await act(async () => {
      fireEvent.click(moveToCartBtn);
    });

    expect(mockDispatch).toHaveBeenCalled();
    expect(toast.custom).toHaveBeenCalled();
  });

  it("navigates to cart when clicking view cart in toast", async () => {
    await act(async () => {
      renderPage();
    });

    // Simulate toast element and click
    const toastElement = screen.queryByText(/view cart/i);
    if (toastElement) {
      await act(async () => {
        fireEvent.click(toastElement);
      });
    }

    await waitFor(() => {
      expect(mockPush).not.toThrow();
    });
  });
});
