import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import ViewCategory from "./components/admin/category/Categories";
import Home from "./components/frontend/Home";
import Register from "./components/frontend/auth/Register";
import Login from "./components/frontend/auth/Login";

import axios from "axios";
import RequireAuth from "./RequireAuth";
import AddCategory from "./components/admin/category/AddCategory";
import EditCategory from "./components/admin/category/EditCategory";
import Products from "./components/admin/product/Products";
import AddProduct from "./components/admin/product/AddProduct";
import EditProduct from "./components/admin/product/EditProduct";
import CategoriesData from "./components/frontend/collections/categories/CategoriesData";
import ProductsData from "./components/frontend/collections/categories/ProductsData";
import ProductDetail from "./components/frontend/collections/categories/ProductDetail";
import Cart from "./components/frontend/Cart";
import Checkout from "./components/frontend/Checkout";
import Orders from "./components/admin/orders/Orders";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = "http://localhost:8000/";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="collections" element={<CategoriesData />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="collections/:slug" element={<ProductsData />} />
            <Route
              path="collections/:category/:product"
              element={<ProductDetail />}
            />
            <Route
              path="login"
              element={(() => {
                if (localStorage.getItem("token")) {
                  return <Navigate to={"/"} />;
                } else {
                  return <Login />;
                }
              })()}
            />
            <Route
              path="register"
              element={(() => {
                if (localStorage.getItem("token")) {
                  return <Navigate to={"/"} />;
                } else {
                  return <Register />;
                }
              })()}
            />
          </Route>
          {/* <Route>
            {localStorage.getItem("token") ? <Navigate to="/" /> : <Login />}
          </Route> */}
          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
          <Route
            path="/admin"
            element={<RequireAuth children={<MasterLayout />} />}
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories/add-category" element={<AddCategory />} />
            <Route
              path="categories/edit-category/:id"
              element={<EditCategory />}
            />
            <Route path="orders" element={<Orders />} />
            <Route path="categories" element={<ViewCategory />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add-product" element={<AddProduct />} />
            <Route path="products/edit-product/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
