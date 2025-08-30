
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductsList from "./components/ProductsList/ProductsList";
import Footer from "./components/Footer/Footer";
import Shop from "./components/Shop/Shop";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Success from "./components/Success/Success";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
