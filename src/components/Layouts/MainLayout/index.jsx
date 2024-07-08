import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo";
import NavBar from "../../NavBar/NavBar";
import cls from "./styles.module.scss";

export default function MainLayout({ children }) {
  const navigate = useNavigate()
  return (
    // <div>
    //   {/* <div className={cls.logo}> */}
    //   <div className="bg-white py-[16px] px-[8px] text-center font-semibold text-xl">
    //     {/* <Logo /> */}
    //     <h2 onClick={()=>navigate("/products")}>Custom Cloth</h2>
    //   </div>
    //   {children}
    // </div>
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
