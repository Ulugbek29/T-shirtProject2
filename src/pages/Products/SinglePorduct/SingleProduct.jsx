import "./style.scss";
import React, { useState } from "react";
import Slider from "react-slick";
import FRow from "../../../components/FormElements/FRow";
import Selector from "../../../components/FormElements/Selector/Selector";
import ColorSelector from "../../../components/FormElements/ColorSelector/ColorSelector";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelector from "../../../components/FormElements/MultiSelector/MultiSelector";

//Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToItem } from "../../../store/item/item.slice";
import productsService from "../../../services/productServices";

const clothesOptions = [
  { label: "Silk", value: "silk" },
  { label: "Cotton", value: "cotton" },
  { label: "Synthetic", value: "synthetic" },
  { label: "Fabrik", value: "Fabrik" },
];

const colors = [
  { label: "Red", value: "red", style: "#FF2D00" },
  { label: "Blue", value: "blue", style: "#0087FF" },
  { label: "Green", value: "green", style: "#22BA00 " },
  { label: "Yellow", value: "yellow", style: "#FBFF00" },
];

const sizeOptions = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "2XL", value: "2XL" },
  { label: "3XL", value: "3XL" },
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="right__arrow" onClick={onClick}>
      <ChevronRightIcon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div className="left__arrow" onClick={onClick}>
      <ChevronLeftIcon />
    </div>
  );
}

function SingleProduct() {
  const [mainImage, setMainImage] = useState();
  const [singleProduct, setSingleProduct] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { item } = useSelector((store) => store?.item);
  const { control, handleSubmit, watch, setValue } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const sizesList = watch("sizes");
    setSelectedOptions(sizesList);
  }, [watch("sizes")]);

  // console.log(item);
  useEffect(() => {
    item?.selectedAttributes?.length > 0  && item?.selectedAttributes.forEach((att) => {
      if(att.title) {
        setValue(att.title, att);
      }
      // setValue("colors", item.colors);
    })
    
    fetchSingleProduct();
  }, []);


  
console.log("item==>", item);
  console.log(selectedOptions);
  const fetchSingleProduct = () => {
    productsService
      .getById(id)
      .then((res) => setSingleProduct(res.data))
      .catch((err) => console.log(err));
  };

  const handleCountIncremnt = (value) => {
    console.log(value);
    const updatedOptions = selectedOptions.selectedOptions.map((item) => {
      return item.id === value.id
        ? { ...item, quantity: Math.min(item.quantity + 1, 500) }
        : item;
    });
    const data = {
      ...selectedOptions,
      selectedOptions: updatedOptions,
    };
    console.log(data);
    setValue("sizes", data);
    setSelectedOptions(data); // Update state with new quantity
  };

  const handleCountDecremnt = (value) => {
    const updatedOptions = selectedOptions.selectedOptions
      .map((item) =>
        item.id === value.id
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      )
      .filter((item) => item.quantity > 0);

    const data = {
      ...selectedOptions,
      selectedOptions: updatedOptions,
    };

    setValue("sizes", data);
    setSelectedOptions(data); // Update state with new quantity
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: (i) => {
      return (
        <div
          style={{
            width: "30px",
            height: "15px",
            borderRadius: "1rem",
          }}
        ></div>
      );
    },
  };

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  const onSubmit = (value) => {
    console.log("value==>", value);
    const selectedAttributes = Object.keys(value).flatMap((key) => value[key]);

    console.log(selectedAttributes);
    const data = {
      ...singleProduct,
      selectedAttributes,
    };

    console.log("data==>", data);
    dispatch(addToItem(data));
    navigate(`/products/${id}/design`);
  };

  return (
    <div className="single__product">
      <div className="single__product__wrapper">
        <div className="product__img__swipper">
          <div className="product__img">
            <img
              src={mainImage ?? singleProduct?.photo_url[0]}
              alt="Main Product"
            />
          </div>
          {singleProduct?.photo_url.length > 1 && (
            <div className="image__swipper">
              <Slider className="slider__container" {...settings}>
                {singleProduct.photo_url.map((img) => (
                  <div
                    className="single__img"
                    onClick={() => handleImageClick(img)}
                  >
                    <img src={img} alt={img} />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>

        <div className="product__details">
          <div className="product__header">
            <h2>Price: {singleProduct?.price}$</h2>
            <h3>{singleProduct?.name}</h3>
            <p>{singleProduct?.description}</p>
          </div>
          <div className="product__action">
            <form onSubmit={handleSubmit(onSubmit)}>
              {singleProduct?.attribute.length > 0 &&
                singleProduct?.attribute.map((att) => {
                  {
                    /* console.log(att) */
                  }
                  return (
                    <>
                      {!att.sale ? (
                        <FRow label={att.title}>
                          <Selector
                            attribute={att}
                            name={att.title}
                            options={att.options}
                            columns="col-3"
                            control={control}
                          />
                        </FRow>
                      ) : (
                        <>
                          <FRow label="Sizes">
                            <MultiSelector
                              name={att.title}
                              options={att.options}
                              control={control}
                              attribute={att}
                            />
                          </FRow>
                          {selectedOptions?.selectedOptions.length > 0 && (
                            <FRow label="Selected Materials">
                              <div className="selected__product__sizes">
                                {selectedOptions.selectedOptions.map(
                                  (productSize, index) => (
                                    <div className="product__size__selected">
                                      <h4>{productSize.name}:</h4>
                                      <div className="product__counter">
                                        <span
                                          onClick={() =>
                                            handleCountDecremnt(productSize)
                                          }
                                        >
                                          -
                                        </span>
                                        <p>{productSize.quantity}</p>
                                        <span
                                          onClick={() =>
                                            handleCountIncremnt(productSize)
                                          }
                                        >
                                          +
                                        </span>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </FRow>
                          )}
                        </>
                      )}
                    </>
                  );
                })}

              <PrimaryButton type="submit" center>
                Start designing
                <ArrowForwardIcon />
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
