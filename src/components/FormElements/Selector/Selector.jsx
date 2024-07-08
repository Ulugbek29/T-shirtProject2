import "./style.scss"
import React from "react";
import { Controller } from "react-hook-form";

export default function Selector({ name, options, columns, control,attribute }) {
  // console.log(options);
  return (
    <div className={`selector ${columns}`}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
        console.log(value)
        return  <>
            {options.map((option) => (
              <label
                key={option.id}
                htmlFor={option.id}
                className={`label ${
                  value?.selectedOptions[0]?.id === option?.id && "active"
                }`}
              >
               {option.photo_url !== "" && <img src={option.photo_url} />}
                <input
                  className="hidden"
                  type="radio"
                  id={option.id}
                  value={option}
                  onChange={() => onChange({...attribute, selectedOptions: [option] })}
                  checked={value?.selectedOptions[0]?.id === option?.id}
                />
                {option.name}
              </label>
            ))}
          </>
        }}
      />
    </div>
  );
}
