import "./editProduct.scss";
import React, { useState } from "react";
import BottomNavigation from "../../../components/ButtomNavigation/ButtomNavigation";
import { IconButton } from "@mui/material";
import Layer from "./components/Layer";
import Upload from "./components/Upload";
import Text from "./components/Text";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import DrawingCanvas from "./DrawingCanvas/DrawingCanvas";


//Icons MUI
import WestIcon from "@mui/icons-material/West";
import LayersIcon from "@mui/icons-material/Layers";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TitleIcon from "@mui/icons-material/Title";
import HelpIcon from "@mui/icons-material/Help";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector} from "react-redux";
import { uploadImage } from "../../../store/item/item.slice";

// const sections = [
//     { icon: LayersIcon, title: 'Layer' },
//     { icon: CloudUploadIcon, title: 'Upload' },
//     { icon: TitleIcon, title: 'Text' },
//     { icon: HelpIcon, title: 'Help' },
//     { icon: AutoFixHighIcon, title: 'Magic AI' },
//     // Add more sections as needed
//   ];

function EditProduct() {
  // const [activeNav, setActiveNav] = useState("Layer")
  const {id} = useParams()
  const navigate = useNavigate();
  const { items } = useSelector((store) => store?.cart)
  const [imageUrl, setImageUrl] = useState(''); // State to store the image URL
  const dispatch = useDispatch() 
  // const { control, handleSubmit } = useForm();
  // const { fields, append, update, remove } = useFieldArray({
  //   control,
  //   name: "imageList",
  // });

  // const onSubmit = (value) => {
  //   console.log(value);
  // };


  console.log(items);
  // const renderRelevantComponent = () => {
  //     switch(activeNav) {
  //         case "Layer":
  //         return <Layer />
  //         case "Upload":
  //         return <Upload />
  //         case "Text":
  //         return <Text />
  //         default:
  //         return <Layer />
  //     }
  // }

  const handleSubmit = () => {
    dispatch(uploadImage(imageUrl))
    navigate(`/products/${id}/preview`)
  }


  return (
    <div className="edit__product">
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <div className="editable__components">
          {/* {renderRelevantComponent()} */}
          {/* <Upload  control={control} fields={fields} append={append} remove={remove}/> */}
          <DrawingCanvas imageUrl={imageUrl} setImageUrl={setImageUrl} bgSrc="/switter.png" />
        </div>

        {/* <BottomNavigation
    sections={sections}
    setActiveNav={setActiveNav}
    activeNav={activeNav}
     /> */}

        <div className="fixed bottom-0 right-0 left-0 px-[20px]">
          <PrimaryButton center onClick={handleSubmit}>
            Go to Payment
            <ArrowForwardIcon />
          </PrimaryButton>
        </div>
      {/* </form> */}
    </div>
  );
}

export default EditProduct;
