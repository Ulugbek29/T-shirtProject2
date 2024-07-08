import "./style.scss"
import React, { useState } from 'react'
import CustomSelect from '../../../../components/FormElements/CustomSelect/CustomSelect'
import FRow from "../../../../components/FormElements/FRow";
import Selector from "../../../../components/FormElements/Selector/Selector";
import ColorSelector from "../../../../components/FormElements/ColorSelector/ColorSelector";
import MultiSelector from "../../../../components/FormElements/MultiSelector/MultiSelector";
import { useNavigate } from "react-router-dom";

const options = [
  { value: 'front', label: 'Front' },
  { value: 'back', label: 'Back' },
  { value: 'left-sleeve', label: 'Left Sleeve' },
  { value: 'right-sleeve', label: 'Right Sleeve' },
  { value: 'collar', label: 'Collar' },
  { value: 'pocket', label: 'Pocket' },
  // Add more options as needed
];



const clothesOptions = [
  { label: "Silk", value: "silk" },
  { label: "Cotton", value: "cotton" },
  { label: "Synthetic", value: "synthetic" },
  { label: "Fabrik", value: "Fabrik" },
];

const colors = [
  { label: "Red", value: "red", style:"#FF2D00" },
  { label: "Blue", value: "blue",style:"#0087FF" },
  { label: "Green", value: "green",style:"#22BA00 " },
  { label: "Yellow", value: "yellow",style:"#FBFF00" },
];

const sizeOptions = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "2XL", value: "2XL" },
  { label: "3XL", value: "3XL" },
];



function Layer() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate()

  const handleSelect = (selectedOption) => {
    setSelectedValue(selectedOption);
  };



  return (
    <div className='design__container'>
        {/* <CustomSelect options={options} selectedValue={selectedValue} onSelect={handleSelect}/> */}

        <div className="custom__image">
          <img src="/switter.png"/>
        </div>

        <div className="order__btn">
          <p>120 000.00 UZS</p>
          <button onClick={()=>navigate("/payment")}>
          Save & Make order
          </button>
        </div>


        <div className='product__details'>
                <FRow label="Material">
                    <Selector 
                        name="fabric"
      options={clothesOptions}
    collumns="col-2"
                    />
                  
                </FRow>

                <FRow label="Colors">
                    <ColorSelector 
                        name="colors"
      options={colors}
    collumns="col-4"
                    />
                  
                </FRow>

                <FRow label="Material">
                <MultiSelector
                 name="fabric"
      options={sizeOptions}
      setSelectedOptions={setSelectedOptions}
      selectedOptions={selectedOptions}
                 />
                    {/* <Selector 
                        name="fabric"
      options={sizeOptions}
    collumns="col-3"
                    /> */}
                </FRow>

              
            </div>

    </div>
  )
}

export default Layer