import React from "react";
import { Controller } from "react-hook-form";

export default function MultiSelectorWrapper({ control, name, options, parentIndex }) {
  return (
    <div className={`multi__selector col-3`}>
      {options.map((option, index) => (
        <Controller
          key={option.value} // Ensure each Controller has a unique key
          control={control}
          name={name}
          // name={`${name}[${parentIndex}].locations`}
          defaultValue={[]} // Initialize as an empty array
          render={({ field: { onChange, value } }) => {
           return <label htmlFor={`${name}[${index}]`} className={`label ${value.includes(option.value) && "active"}`}>
              <input
                className="hidden"
                type="checkbox"
                // id={`${name}[${parentIndex}].locations[${index}]`}
                id={`${name}[${index}]`}
                value={option.value}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  let newValue;
                  if (isChecked) {
                    newValue = [...value, option.value];
                  } else {
                    newValue = value.filter(val => val !== option.value);
                  }
                  onChange(newValue);
                }}
                checked={value.includes(option.value)}
              />
              {option.label}
            </label>
          }}
        />
      ))}
    </div>
  );
}
