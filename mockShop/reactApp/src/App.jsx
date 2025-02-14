import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ProductPage from "./pages/ProductPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:productID' element={<ProductPage />} />
        <Route path='/admin-dash' element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
