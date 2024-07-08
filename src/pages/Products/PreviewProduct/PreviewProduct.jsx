import cls from "./style.module.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { removeItem } from "../../../store/item/item.slice";
import { addToCart } from "../../../store/carts/cart.slice";

function PreviewProduct() {
  const { item } = useSelector((store) => store?.item);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(item);

  const handleResponse = () => {
    dispatch(addToCart(item));
    navigate(`/products`);
    dispatch(removeItem());
  };

  const moveDirectToPayment = () => {
    dispatch(addToCart(item));
    navigate(`/orders`);
    dispatch(removeItem());
  }

  return (
    <>
      <div className={cls.product__preview}>
        <div className={cls.product__img__wrapper}>
          <div className={cls.product__img}>
            <img src={item?.imageUrl} alt="Product" />
          </div>

          <div className={cls.selected__images__wrapper}>
            <h3>Selected images</h3>
            <div className={cls.selected__images}>
              {item?.uploadedImages?.length > 0 ? (
                item.uploadedImages.map((img, index) => (
                  <div key={index} className={cls.selected__image}>
                    <img src={img} alt={`Selected ${index}`} />
                  </div>
                ))
              ) : (
                <p>No images selected</p>
              )}
            </div>
          </div>
        </div>
        <div className={cls.product__details}>
          {item?.selectedAttributes?.length > 0 ? (
            item.selectedAttributes.map((att, attIndex) => {
                console.log(att)
            return  <div key={attIndex} className={cls.detail}>
                <h4>{att?.title}:</h4>
                <div className={cls.sizes}>
                  {att?.selectedOptions?.length > 0 ? (
                    att.selectedOptions.map((opt, optIndex) => (
                      <div key={optIndex} className={cls.size}>
                        {optIndex + 1})<h5>{opt.name}</h5>  {opt.quantity && <p> - {opt.quantity}</p>}
                      </div>
                    ))
                  ) : (
                    <p>No options selected</p>
                  )}
                </div>
              </div>
            })
          ) : (
            <p>No attributes selected</p>
          )}
        </div>
      </div>
      <div className="w-full flex gap-2 justify-center fixed bottom-0 right-0 left-0 px-[20px] pb-2">
      <button onClick={handleResponse} className="flex items-center gap-1 px-3 py-3 text-[13px] bg-[#fff] border-2 border-[#dddddd] rounded-xl whitespace-nowrap">
          Back to Products
          <ArrowForwardIcon />
      </button>
      <button
      onClick={moveDirectToPayment}
       className="flex items-center gap-1 px-3 py-3 bg-[#14151A] border-2 text-[13px] text-white border-[#14151A] rounded-xl whitespace-nowrap">
         Confirm & Continue
          <ArrowForwardIcon />
      </button>
      </div>
    </>
  );
}

export default PreviewProduct;
