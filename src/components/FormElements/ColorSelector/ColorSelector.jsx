import "./colorStyle.scss"
import React from "react";
// import { useState } from "react";
import { Controller } from "react-hook-form";

export default function ColorSelector({ name, options, columns, control }) {
  // const [selectedOption, setSelectedOption] = useState(options[0]?.value);

  const initialValue = options.length > 0 ? options[0].value : "";

  // const handleOptionChange = (value) => {
  //   setSelectedOption(value);
  // };

  return (
    <div className={`color__selector ${columns}`}>
      <Controller
        name={name}
        defaultValue={initialValue}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            {options.map((option) => (
              <label
                key={option.value}
                htmlFor={option.value}
                className={`label ${
                  value === option.value && "active"
                }`}
              >
                <div
                  style={{ background: option.style }}
                  className="circle"
                ></div>
                <input
                  className="hidden"
                  type="radio"
                  name={name}
                  id={option.value}
                  value={option.value}
                  onChange={() => {
                    onChange(option.value);
                    // handleOptionChange(option.value);
                  }}
                  checked={value === option.value}
                />
              </label>
            ))}
          </>
        )}
      />
    </div>
  );
}
