import "./style.scss";
import React from "react";
import { Controller } from "react-hook-form";

export default function MultiSelector({ name, options, control, attribute }) {
  console.log(options);
  return (
    <div className={`multi__selector col-3`}>
      <Controller
        name={name}
        control={control}
        defaultValue={{ selectedOptions: [] }} // Initialize as an object with selectedOptions as an empty array
        render={({ field: { onChange, value } }) => {
          value = value || { selectedOptions: [] }; // Ensure value is always an object with selectedOptions
          console.log(value);
          return (
            <>
              {options.map((option,index) => (
                <label
                  key={option.id}
                  htmlFor={option.id}
                  className={`label ${
                    value.selectedOptions?.some((item) => item.id === option.id) && "active"
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    name={name} // Set the name attribute to ensure proper form submission
                    id={option.id}
                    value={option}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) {
                        onChange({
                          ...attribute,
                          selectedOptions: [...value.selectedOptions, { ...option, quantity: 1 }],
                        }); // Add the option to the selected options
                      } else {
                        onChange({
                          ...attribute,
                          selectedOptions: value.selectedOptions.filter((item) => item.id !== option.id),
                        }); // Remove the option from the selected options
                      }
                    }}
                    checked={value.selectedOptions?.some((item) => item.id === option.id)}
                  />
                  {option.name}
                </label>
              ))}
            </>
          );
        }}
      />
    </div>
  );
}
