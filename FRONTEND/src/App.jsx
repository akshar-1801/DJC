import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./layouts/Navbar/Header";
import Footer from "./layouts/Footer/Footer";
import Preloader from "./layouts/Preloader/Preloader";
import Home_Page from "./pages/Home/Home_page";
import Products_Page from "./pages/Products/Products_Page";
import SingleProduct_Page from "./pages/SingleProduct/SingleProduct_Page";
import Personalize_Page from "./pages/Customization/Customization_Page";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RefreshHandler from "./utils/RefreshHandler";
import Login from "./components/Auth/Login";
import AppContext from "./utils/context";
import Orders from "./components/Orders/Orders";
import AdminOrders from "./components/Admin/Admin";
import AdminCProducts from "./components/Admin/AdminCProducts";

// Main content component that uses router hooks
function MainContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const isAdmin = userInfo ? userInfo.isAdmin : false;

  useEffect(() => {
    if (userInfo) {
      setIsAuthenticated(true);
    }
  }, [userInfo]);

  const AdminRoute = ({ element }) => {
    return isAdmin ? element : <Navigate to="/" />;
  };

  const GoogleAuthWrapper = () => (
    <GoogleOAuthProvider clientId="522736900594-495381hqv5ueu8ie1qgvhf5ji4kt2f1i.apps.googleusercontent.com">
      <Login setIsAuthenticated={setIsAuthenticated} />
    </GoogleOAuthProvider>
  );

  return (
    <>
      <Preloader />
      {location.pathname !== "/login" && (
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/" element={<Home_Page />} />
        <Route path="/home" element={<Home_Page />} />
        <Route path="/products" element={<Products_Page />} />
        <Route path="/products/:prodId" element={<SingleProduct_Page />} />
        <Route
          path="/personalize"
          element={<Personalize_Page checkPageOne={true} />}
        />
        <Route
          path="/uploadIdea"
          element={<Personalize_Page checkPageOne={false} />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/admin_panel/orders"
          element={<AdminRoute element={<AdminOrders />} />}
        />
        <Route
          path="/admin_panel/cproducts"
          element={<AdminRoute element={<AdminCProducts />} />}
        />
        <Route
          path="/admin_panel/proposals"
          element={<AdminRoute element={<AdminOrders />} />}
        />
        <Route path="*" element={<Home_Page />} />
      </Routes>
      <Footer />
    </>
  );
}

// App component that provides router context
function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <MainContent />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
