import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity, applyCoupon, getTotal } =
    useCart();
  const { notify } = useNotification();
  const [couponInput, setCouponInput] = useState("");
  const navigate = useNavigate();

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim() === "") {
      notify("Please enter a coupon code", { type: "error" });
      return;
    }

    if (couponInput === "WEB3BRIDGECOHORTx") {
      applyCoupon(couponInput);
      notify("Coupon applied successfully!");
      setCouponInput(""); // Clear input after successful application
    } else {
      notify("Invalid coupon code. Please try again.", { type: "error" });
      setCouponInput(""); // Clear input after failed attempt
    }
  };

  if (cart.items.length === 0) {
    return <div className="empty-cart">Your cart is empty</div>;
  }

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cart.items.map((item) => (
        <div key={item.product.id} className="cart-item">
          <img src={item.product.image} alt={item.product.name} />
          <div className="item-details">
            <h3>{item.product.name}</h3>
            <p>${item.product.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="remove-button"
          >
            Remove
          </button>
        </div>
      ))}

      <form onSubmit={handleCouponSubmit} className="coupon-form">
        <input
          type="text"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          placeholder="Enter coupon code"
          pattern="[A-Za-z0-9]+"
          title="Alphanumeric characters only"
        />
        <button type="submit">Apply Coupon</button>
      </form>

      {cart.couponCode && (
        <div className="discount-applied">
          Coupon applied: {cart.couponCode} (-10%)
        </div>
      )}

      <div className="cart-total">
        <h3>Total: ${getTotal().toFixed(2)}</h3>
        {cart.items.length > 0 && (
          <button
            onClick={() => navigate("/checkout")}
            className="checkout-button"
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
}
