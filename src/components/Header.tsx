import { Link } from "react-router-dom";
import { CartButton } from "./CartButton";

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <h1>Shoppy</h1>
      </Link>
      <CartButton />
    </header>
  );
}
