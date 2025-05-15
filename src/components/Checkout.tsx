import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.product.id} className="checkout-item">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        {cart.couponCode && (
          <div className="discount-applied">
            Coupon applied: {cart.couponCode} (-10%)
          </div>
        )}
        <div className="total">
          <strong>Total: ${getTotal().toFixed(2)}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Shipping Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            pattern="[0-9]{16}"
            maxLength={16}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              pattern="[0-9]{3,4}"
              maxLength={4}
              required
            />
          </div>
        </div>

        <button type="submit" className="checkout-button">
          Place Order
        </button>
      </form>
    </div>
  );
}
