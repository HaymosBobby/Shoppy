import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Cart, Product } from "../types";
// import { Cart, CartItem, Product } from "../types";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (code: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const COUPON_CODE = "WEB3BRIDGECOHORTx";
const DISCOUNT_PERCENTAGE = 0.1;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : { items: [], couponCode: null, discount: 0 };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...prevCart,
        items: [...prevCart.items, { product, quantity: 1 }],
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.product.id !== productId),
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  };

  const applyCoupon = (code: string) => {
    if (code === COUPON_CODE) {
      setCart((prevCart) => ({
        ...prevCart,
        couponCode: code,
        discount: DISCOUNT_PERCENTAGE,
      }));
    } else {
      setCart((prevCart) => ({
        ...prevCart,
        couponCode: null,
        discount: 0,
      }));
    }
  };

  const clearCart = () => {
    setCart({ items: [], couponCode: null, discount: 0 });
  };

  const getTotal = () => {
    const subtotal = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    return subtotal * (1 - cart.discount);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
