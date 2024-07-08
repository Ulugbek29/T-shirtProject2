import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Orders from "../pages/Orders";
import Payment from "../pages/Payment";
import MainLayout from "../components/Layouts/MainLayout";
import SingleProduct from "../pages/Products/SinglePorduct/SingleProduct";
import EditProduct from "../pages/Products/EditProduct/EditProduct";
import PreviewProduct from "../pages/Products/PreviewProduct/PreviewProduct";
import DrawingCanvas from "../pages/Products/EditProduct/DrawingCanvas/DrawingCanvas"


export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route index element={<Navigate to="/products" />} />
        <Route path="/products" element={<Main />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/:id/design" element={<DrawingCanvas />} />
        <Route path="/products/:id/preview" element={<PreviewProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />}/>
        
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Route>
    </Routes>
  );
}
