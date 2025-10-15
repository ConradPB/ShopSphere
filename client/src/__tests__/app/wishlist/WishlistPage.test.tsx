import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import WishlistPage from "@/app/wishlist/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import * as reduxHooks from "@/redux/hooks";
import toast from "react-hot-toast";

// Mock toast
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
  custom: jest.fn(),
}));

// Mock WishlistButton to avoid nested logic
jest.mock("@/components/ui/WishlistButton", () => {
  const MockWishlistButton: React.FC = () => (
    <button data-testid="wishlist-btn">Mock Wishlist</button>
  );
  MockWishlistButton.displayName = "WishlistButton";
  return MockWishlistButton;
});

const mockDispatch = jest.fn();
const mockUseSelector = jest.mock("@/redux/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(mockDispatch);

describe("WishlistPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () =>
    render(
      <Provider store={store}>
        <WishlistPage />
      </Provider>
    );

  it("renders empty wishlist message when there are no items", async () => {
    mockUseSelector.mockReturnValue([]); // empty wishlist

    await act(async () => {
      renderWithProvider();
    });

    expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
  });

  it("renders wishlist items when present", async () => {
    mockUseSelector.mockReturnValue([
      {
        id: "1",
        title: "Cool Shoes",
        price: 99.99,
        image: "/shoes.jpg",
        description: "Nice sneakers",
      },
    ]);

    await act(async () => {
      renderWithProvider();
    });

    expect(screen.getByText(/my wishlist/i)).toBeInTheDocument();
    expect(screen.getByText(/cool shoes/i)).toBeInTheDocument();
    expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();
  });

  it("handles move to cart and shows toast", async () => {
    mockUseSelector.mockReturnValue([
      {
        id: "2",
        title: "Test Product",
        price: 50,
        image: "/test.jpg",
      },
    ]);

    await act(async () => {
      renderWithProvider();
    });

    const moveBtn = screen.getByRole("button", { name: /move to cart/i });
    await act(async () => {
      fireEvent.click(moveBtn);
    });

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(toast.success).toHaveBeenCalledWith(
      expect.stringContaining("Moved")
    );
  });

  it("opens and confirms remove modal", async () => {
    mockUseSelector.mockReturnValue([
      {
        id: "3",
        title: "Delete Me",
        price: 25,
        image: "/delete.jpg",
      },
    ]);

    await act(async () => {
      renderWithProvider();
    });

    const removeBtn = screen.getByRole("button", { name: /remove/i });
    await act(async () => {
      fireEvent.click(removeBtn);
    });

    expect(screen.getByText(/remove “delete me”/i)).toBeInTheDocument();

    const confirmBtn = screen.getByRole("button", { name: /^remove$/i });
    await act(async () => {
      fireEvent.click(confirmBtn);
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Removed")
      );
    });
  });
});
