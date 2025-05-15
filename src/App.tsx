import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { ShoppingCart } from "./components/ShoppingCart";
import "./App.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <NotificationProvider>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<ShoppingCart />} />
              </Routes>
            </main>
          </div>
        </NotificationProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
