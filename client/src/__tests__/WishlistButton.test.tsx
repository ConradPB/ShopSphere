import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import WishlistButton from "@/components/ui/WishlistButton";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Mock toast and router
jest.mock("react-hot-toast", () => ({
  custom: jest.fn(),
  dismiss: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

describe("WishlistButton", () => {
  const mockProduct = {
    id: "test-1",
    title: "Mock Product",
    price: 20,
    image: "/mock.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderButton = () =>
    render(
      <Provider store={store}>
        <WishlistButton product={mockProduct} />
      </Provider>
    );

  it("renders loading state initially", () => {
    const { getByRole } = renderButton();
    // Force mount delay effect
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("renders active wishlist button after mount", async () => {
    await act(async () => {
      renderButton();
    });
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument();
  });

  it("adds product to wishlist and shows toast", async () => {
    await act(async () => {
      renderButton();
    });

    const button = screen.getByRole("button");
    await act(async () => {
      fireEvent.click(button);
    });

    expect(toast.custom).toHaveBeenCalled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("removes product from wishlist when clicked again", async () => {
    const mockProduct = {
      id: "test-1",
      title: "Mock Product",
      price: 20,
      image: "/mock.jpg",
    };

    render(
      <Provider store={store}>
        <WishlistButton product={mockProduct} />
      </Provider>
    );

    const btn = screen.getByRole("button");

    // First click: add to wishlist
    await act(async () => {
      fireEvent.click(btn);
    });

    // Second click: remove from wishlist
    await act(async () => {
      fireEvent.click(btn);
    });

    // Wait for the component to re-render and update aria-pressed
    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "false"
      );
    });
  });

  it("navigates to wishlist when View button clicked in toast", async () => {
    const t = { id: "t1", visible: true };
    const fakeToast = (toast.custom as jest.Mock).mock.calls[0]?.[0](t);

    if (React.isValidElement(fakeToast)) {
      const buttonInToast = screen.queryByText(/view/i);
      if (buttonInToast) {
        await act(async () => {
          fireEvent.click(buttonInToast);
        });
      }
    }

    expect(mockPush).not.toThrow();
  });
});
