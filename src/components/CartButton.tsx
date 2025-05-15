import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export function CartButton() {
  const { cart } = useCart();
  const itemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Link to="/cart" className="cart-button">
      <span className="cart-icon">🛒</span>
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </Link>
  );
}
