import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductsList from "./components/ProductsList/ProductsList";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Success from "./components/Success/Success";
import { Cart } from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { PrivateRoutes } from "./PrivateRoutes/PrivateRoutes";
import ProductDescription from "./components/ProductDescription/ProductDescription";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route element={<PrivateRoutes toRedirect={"/login"} />}>
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="/" element={<ProductsList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:product_name" element={<ProductDescription />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
