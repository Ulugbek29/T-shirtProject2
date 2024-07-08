import React, { Component, useState } from "react";
import ColorSelector from "../../../../components/FormElements/ColorSelector/ColorSelector";
import CustomSelect from "../../../../components/FormElements/CustomSelect/CustomSelect";
import FRow from "../../../../components/FormElements/FRow";
import TextAreaMUI from "../../../../components/FormElements/TextAreaMUI/TextAreaMUI";

const colors = [
  { label: "Red", value: "red", style: "#FF2D00" },
  { label: "Blue", value: "blue", style: "#0087FF" },
  { label: "Green", value: "green", style: "#22BA00 " },
  { label: "Yellow", value: "yellow", style: "#FBFF00" },
];

const fonts = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
];

function Text() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [fontValue, setFontValue] = useState(null)


  // const handleSelect = (selectedOption) => {
  //   setFontValue(selectedOption);
  // };

  const handleTextArea = (value) => {
    setTextAreaValue(value)
  }

  

console.log(fontValue);
  console.log(textAreaValue);
  return (
    <div className="design__container">
      {/* <CustomSelect options={options} selectedValue={selectedValue} onSelect={handleSelect}/> */}

      <div className="custom__image">
        <img src="/switter.png" />
      </div>

      <div className="order__btn">
        <p>120 000.00 UZS</p>
        <button onClick={()=>navigate("/payment")}>
        Save & Make order</button>
      </div>

      <div className="product__details">
        <FRow label="Material">
        <TextAreaMUI onChange={handleTextArea} value={textAreaValue} />
        </FRow>

        <FRow label="Colors">
          <ColorSelector name="colors" options={colors} collumns="col-4" />
        </FRow>

        <FRow label="Fonts">
            <CustomSelect
            options={fonts}
            value={fontValue} 
              onChange={setFontValue}
            />
        </FRow>
      </div>
    </div>
  );
}

export default Text;
