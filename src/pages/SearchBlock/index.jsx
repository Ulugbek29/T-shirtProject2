import cls from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, ShoppingBag } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {totalOrderQuantity} from "../../utils/totalOrderQuantity"
import { setFilteredProducts,fetchProducts } from "../../store/products/products.slice";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';



export default function SearchBlock() {
  const [value, setValue] = useState("");
  const {id} = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const items = useSelector((state)=> state?.cart?.items)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  



  const onChange = (e) => {
    setValue(e.target.value);
    dispatch(setFilteredProducts(e.target.value))
  };

  return (
    <div className={cls.wrapper}>
      <div className={cls.search}>
        <Search color="#707172" />
        <input placeholder="Qidirish..." value={value} onChange={onChange} />
      </div>
      <div className={cls.busket}>
        <div className={cls.inner} onClick={() => navigate(`/orders`)}>
          <ShoppingBag />
          <span>{totalOrderQuantity(items)}</span>
        </div>
      </div>
      <div className={cls.busket}>
        <div className={cls.inner} onClick={() => navigate(`/orders`)}>
          <PersonOutlineIcon  fontSize="inherit"/>
        </div>
      </div>
    </div>
  );
}
