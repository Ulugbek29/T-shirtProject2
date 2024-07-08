import { useEffect, useState } from "react";
import MultiSelector from "../../../../components/FormElements/MultiSelector/MultiSelector";
import ImageUploader from "../../../../components/FormElements/ImageUploader/ImageUploader";
import FRow from "../../../../components/FormElements/FRow";
import AddIcon from "@mui/icons-material/Add";
import MultiSelectorWrapper from "../../../../components/FormElements/MultiSelectorController/MultiSelectorController";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import DrawingCanvas from "../DrawingCanvas/DrawingCanvas";

const options = [
  { id: "front", value: "front", label: "Front" },
  { id: "back", value: "back", label: "Back" },
  { id: "left-sleeve", value: "left-sleeve", label: "Left Sleeve" },
  { id: "right-sleeve", value: "right-sleeve", label: "Right Sleeve" },
  { id: "collar", value: "collar", label: "Collar" },
  { id: "pocket", value: "pocket", label: "Pocket" },
  // Add more options as needed
];

function Upload({ control, fields, append, remove }) {
  // const [imageList, setImageList] = useState([
  //   {
  //     id: crypto.randomUUID(), // Generate a unique ID for the new image
  //     locations: [],
  //     imageUrl: "",
  //   },
  // ]);

  // useEffect(()=> {
  //   handleLocationChange()
  // },[])

  const handleNewImage = () => {
    const newImage = {
      locations: ["front"],
      imageUrl: "",
    };
    // setImageList((prevList) => [...prevList, newImage]);
    append(newImage);
  };

  const removeImage = (index) => {
    remove(index);
  };

  // const handleLocationChange = (id, updatedOptions) => {
  //   // debugger

  //   // console.log('passedId', id);
  //   console.log('locations', updatedOptions);
  //   setImageList((prevList) => {
  //     return prevList.map((image) => {
  //       return image.id === id
  //         ? { ...image, locations: updatedOptions }
  //         : image;
  //     });
  //   });

  // };

  // const handleImageChange = (id, imageUrl) => {
  //   setImageList((prevList) => {
  //     const newList = prevList.map((image) =>
  //       image.id === id ? { ...image, imageUrl: imageUrl } : image
  //     );
  //     return newList;
  //   });
  // };
  return (
    <div className="design__container">
      <DrawingCanvas bgSrc="/switter.png" />
      <div className="flex flex-col gap-4">
        {fields.map((image, index) => {
          return (
            <div className="relative flex flex-col gap-4" key={image.id}>
              <span onClick={() => removeImage(index)} className="absolute top-0 right-0 text-red-800">
                <IconButton size="small" color="inherit" aria-label="delete">
                  <CancelIcon fontSize="small" />
                </IconButton>
              </span>
              <div className="w-full">
                <FRow label="Location">
                  {/* <MultiSelector
                  name="fabric"
                  options={options}
                  onChange={(updatedLocations) => {
                    console.log("image.id ===>",image.id)
                    console.log("image ===>",image)
                    handleLocationChange(image.id, updatedLocations);
                  }}
                  selectedOptions={image.locations}
                /> */}
                  <MultiSelectorWrapper
                    control={control}
                    name={`imageList.${index}.locations`} // Assuming this is the name you want to use for the field
                    options={options}
                    parentIndex={index}
                    // selectedOptions={image.locations} // Pass initially selected options if any
                    image={image}
                  />
                </FRow>
              </div>

              <div className="image__upload__container">
                <ImageUploader
                  control={control}
                  name={`imageList.${index}.imageUrl`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* <button
        onClick={handleNewImage}
        className="w-full py-2 px-6 rounded-lg bg-[#afafaf] text-white font-semibold"
      >
        <AddIcon color="inherit" /> Add image
      </button> */}
    </div>
  );
}

export default Upload;
