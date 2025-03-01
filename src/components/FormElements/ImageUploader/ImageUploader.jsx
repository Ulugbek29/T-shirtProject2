import { FormHelperText, styled } from "@mui/material"
import { Controller } from "react-hook-form"
import ImageUpload from "./Upload/ImageUpload"




const StyledImageUploader = styled(ImageUpload) (
  ({theme})=> `
  width: 100%;
  min-height: 150px;
  border: 3px solid #000
  `
)




const ImageUploader = ({
  control,
  name,
  required,
  rules,
  disabledHelperText = false,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: required ? "This is required field" : false,
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <ImageUpload
            name={name}
            value={value}
            onChange={onChange}
            // error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
            error={error && "error"}
            {...props}
          />
          {/* {!disabledHelperText && (
            <FormHelperText  error>{error?.message ?? " "}</FormHelperText>
          )} */}
        </>
      )}
    ></Controller>
  )
}

export default ImageUploader
