import { useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, X } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PictureUrl from "../../assets/osh.jpeg";
import Product from "./Product";
import useOutsideClick from "../../hooks/useOutsideClick";
import formatNumbers from "../../utils/formatNumbers";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton";
import MainButton from "../../components/Buttons/MainButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import cls from "./styles.module.scss";
import { fetchProducts } from "../../store/products/products.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  orderTotalCost,
  removeSingleOrder,
} from "../../store/carts/cart.slice";
import { totalOrderQuantity } from "../../utils/totalOrderQuantity";

export default function Products() {
  const [previewItemId, setPreviewItemId] = useState(null);
const {id} = useParams()
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, filteredProducts,status } = useSelector((store) => store?.products);
  const { items, totalPrice } = useSelector((store) => store?.cart);
  const { activeCategory } = useSelector((store) => store?.category);
  




console.log(items);
console.log("products==>",products);

  // useEffect(() => {
  //   function success(pos) {
  //     const crd = pos.coords;
  //    console.log("Geolocation", crd);
  //     // window.location.reload();
  //   }
  //   function error(prop) {
  //     console.log("ERROR => ", prop);
  //   }
  //   navigator.geolocation.getCurrentPosition(success, error, {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0,
  //   });
  // }, []);





  //Fetching all products
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  //Redux ToatalPrice
  useEffect(() => {
    dispatch(orderTotalCost());
  }, [items]);

  useOutsideClick(ref, () => setPreviewItemId(null));

  // getCuurentItem
  const getCurrentItem = () => products.find((i) => i.id === previewItemId);

  // productInCart
  // const productInCart = items.find((pro) => pro?.item?.id === previewItemId);

  //AddToCart
  const handleAddToCard = (product) => {
    dispatch(addToCart(product));
  };

  //Remove Order
  const removeOrder = (id) => {
    dispatch(removeSingleOrder(id));
  };


  //Animation
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  //Filtering by Category
  const productsFilteredByCategory =
    activeCategory.id !== null
      ? filteredProducts.filter(
          (product) => product.category_id === activeCategory.id
        )
      : filteredProducts;

  // const isProductVisible = (product) => {
  //   return activeCategory.some(category => product.category_id === category.id);
  // };



  const clothesArray = [
    {
        id: 1,
        img: "/switter.png",
        title: "Blue Shirt"
    },
    {
        id: 2,
        img: "/blue.jpg",
        title: "Black Pants"
    },
    {
        id: 3,
        img: "/pink.jpg",
        title: "Floral Dress"
    },
    {
        id: 4,
        img: "/brown.jpg",
        title: "Floral Dress"
    },
    {
        id: 5,
        img: "/purple.jpg",
        title: "Floral Dress"
    },
    {
        id: 6,
        img: "/switter.png",
        title: "Floral Dress"
    },
    // Add more items as needed
];
  

  return (
    <div className={cls.products}>
      {filteredProducts.length === 0 ? (
        <div  className={cls.food__loader}>
       <img src="/menu.gif"/>
        </div>
      ) : (
        <>
          <p className={cls.bigTitle}>{activeCategory.name}</p>
          <motion.div
            className={cls.inner}
            variants={container}
            initial="hidden"
            animate="visible"
          >
          {filteredProducts.map((cloth)=> (
            <div
            onClick={() => navigate(`/products/${cloth.id}`)}
             className={cls.product}
             >
             <div 
             className={cls.image}
             >
              <img src={cloth.photo_url[0]}
                // className={}
              />
             </div>
              {/* <h2 style={{fontSize: "1rem"}}>{cloth.title}</h2> */}
            </div>
          ))}
            {/* {productsFilteredByCategory.map((product) => {
              return (
                <Product
                  key={product.id}
                  setPreviewItemId={setPreviewItemId}
                  data={product}
                />
              );
            })} */}
          {/* <AnimatePresence>
            {previewItemId  && (
              <div className={cls.preview}>
                <motion.div
                  className={cls.previewInner}
                  ref={ref}
                  initial={{ bottom: "-100%" }}
                  animate={{ bottom: "0%" }}
                  exit={{ bottom: "-100%" }}
                >
                  <X
                    className={cls.close}
                    size={24}
                    onClick={() => setPreviewItemId(null)}
                  />
                  <div className={cls.image}>
                    <img src={getCurrentItem().photo_url} />
                  </div>
                  <div className={cls.body}>
                    <div className={cls.head}>
                      <h4 className={cls.price}>Цена: {getCurrentItem().price} so'm</h4>
                      <p className={cls.title}>{getCurrentItem().name}</p>
                      <p className={cls.description}>
                        {getCurrentItem().description}
                      </p>
                    </div>
                    <div className={cls.footer}>
                      <div className={cls.action}>
                        {productInCart?.quantity > 0 ? (
                          <>
                            <RectangeIconButton
                              size="lg"
                              onClick={() => removeOrder(getCurrentItem().id)}
                            >
                              <Minus size={18} />
                            </RectangeIconButton>
                            <motion.span
                              key={getCurrentItem().count}
                              className={cls.countPreview}
                              animate={{ scale: 1, color: "#000" }}
                              initial={{ scale: 1.2, color: "#14b706" }}
                            >
                              {productInCart.quantity}
                            </motion.span>
                            <RectangeIconButton
                              size="lg"
                              onClick={() => handleAddToCard(getCurrentItem())}
                            >
                              <Plus size={18} />
                            </RectangeIconButton>
                          </>
                        ) : (
                          <SecondaryButton
                            fullWidth
                            onClick={() => handleAddToCard(getCurrentItem())}
                            styles={{
                              backgroundColor: "#eee",
                              color: "#000",
                              fontWeight: "400",
                            }}
                          >
                            Savatga qo'shish
                          </SecondaryButton>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence> */}
          </motion.div>
          {/* <MainButton
            styles={{ backgroundColor: previewItemId ? "#fff" : "" }}
            disabled={!(totalPrice > 0)}
            onClick={() => navigate(`/orders`)}
          >
            <span>Buyurtmaga o'tish</span>
            <p>
              <span className={cls.orderCount}>
                {totalOrderQuantity(items)}
              </span>
              <span>{formatNumbers(totalPrice)} so'm</span>
            </p>
          </MainButton> */}
        </>
      )}
    </div>
  );
}
