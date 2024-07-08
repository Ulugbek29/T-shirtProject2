import cls from "./style.module.scss"
import React from 'react'
import BackButton from "../Buttons/BackButton"
import { useLocation, useNavigate } from "react-router-dom"
// import Logo from "../../../assets/logo"

function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()

    // Check if the current path is exactly /products
    const showBackButton = location.pathname !== '/products';

    console.log(showBackButton);
    
    return (
        <div className={cls.navbar}>
            {showBackButton && (
                <div className={cls.back__btn}> 
                    <BackButton onClick={() => navigate(-1)} />
                </div>
            )}
            <div className={cls.logo} 
            onClick={()=> navigate("/products")}
            >
                {/* <Logo /> */}
                <span className={cls.first__logo__letter}>Z</span>
                <span className={cls.rest__logo__letter}>BEK</span>
            </div>
        </div>
    )
}

export default NavBar
