import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import useTelegram from "../../hooks/useTelegram";
import MainButton from "../../components/Buttons/MainButton";
import UserInfo from "./UserInfo";
import DeliveryTabs from "./DeliveryTabs";
import DeliveryMap from "./DeliveryMap";
import DeliveryBranches from "./DeliveryBranches";
import cls from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import orderServices from "../../services/orderServices";
import { clearUserData } from "../../store/order/order.slice";
import { removeAllOrders } from "../../store/carts/cart.slice";
import ConfirmModal from "../../components/ConfirmModal";
import CardPage from "./CardPage";

export default function Payment() {
  const { handleSubmit, control, reset, setValue, watch, getValues } = useForm({
    defaultValues: { phone: "" },
  });
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTabId, setActiveTabId] = useState(1);
  const userData = useSelector((store) => store?.order?.userData);
  const cart = useSelector((store) => store?.cart);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearUserData());
    dispatch(removeAllOrders());
    reset();
    navigate("/");
  };

  useEffect(() => {
    tg.BackButton.show();
  }, []);

  tg.onEvent("backButtonClicked", () => navigate("/orders"));

  console.log(cart);
  console.log(userData);

  const onSubmit = (data) => {
    const productsArray = cart.items.map((order) => {
      console.log(order);
      const selectedAttributes = order.item.selectedAttributes.map((att) => {
        const { selectedOptions, ...rest } = att;
        const options = selectedOptions.map((opt) => {
          const { quantity, ...restOptions } = opt;
          return {
            ...restOptions,
          };
        });

        

console.log(order.option);
        if (att.id === order.option.attribute_id) {
          const { quantity, ...restOptions } = order.option
          return {
            ...rest,
            options: [restOptions], // Use the order's option if the attribute IDs match
          };
        } else {
          return {
            ...rest,
            options: options, // Use the processed options otherwise
          };
        }
      });
      console.log("selectedAttributes=>", selectedAttributes);
      const data = {
        attributes: selectedAttributes,
        category_id: order.item.category_id,
        count: order.option.quantity,
        product_id: order.item.id,
        product_image: order.item.imageUrl,
        product_name: order.item.name,
        product_price: order.item.price,
        total_price: order.item.price * order.option.quantity, // ????
        upload_images: order.item.uploadedImages,
      };
      return data;
    });

    console.log("productsArray==>", productsArray);
    console.log(userData);
    const orderData = {
      comment: userData.comment || "", // Assuming comment is collected from the form
      company_id: "c6440797-dc74-4054-a0f0-2a4d3e6d3867",
      customer_details: {
        address: {
          district: "",
          lat: data.placemark[1], // Accessing address from form data
          long: data.placemark[0],
          name: userData.address,
        },
        id: "143932f1-6a94-499c-89a8-d8baa2f131e1",
        name: data.name, // Assuming name and phone are collected from the form
        phone: data.phone,
        telegram_id: "",
      },
      order_products: {
        products: productsArray,
        total_price: cart.totalPrice,
      },
      order_type: "delivery",
      delivery_price: 0,
      payment_details: {
        payment_type_id: userData.paymentType,
      },
      product_price: cart.totalPrice,
      total_price: cart.totalPrice,
    };

    console.log("orderData===========>", orderData);
    orderServices.create(orderData)
      .then((res) => {
        handleOpen()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={cls.wrapper}>
      <form className={cls.main__form} onSubmit={handleSubmit(onSubmit)}>
        <UserInfo control={control} watch={watch} getValues={getValues} />
        <div className={cls.tabsWrapper}>
          <DeliveryTabs
            setActiveTabId={setActiveTabId}
            activeTabId={activeTabId}
          />
          <div className={cls.tabPanels}>
            {activeTabId === 1 ? (
              <DeliveryMap control={control} setValue={setValue} />
            ) : (
              <DeliveryBranches />
            )}
          </div>
        </div>

        <MainButton center type="submit" onClick={() => {}}>
          Keyingi bosqich
        </MainButton>
      </form>

      <CardPage />

      {open && (
        <ConfirmModal open={open} handleClose={handleClose} cart={cart} />
      )}
    </div>
  );
}
