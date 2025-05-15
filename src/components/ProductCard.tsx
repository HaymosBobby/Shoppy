import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { useNotification } from "../context/NotificationContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { notify } = useNotification();

  const handleAddToCart = () => {
    addToCart(product);
    notify(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart} className="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  );
}
