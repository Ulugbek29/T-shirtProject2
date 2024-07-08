import InputMask from "react-input-mask";

import cls from "./styles.module.scss";

export default function NumberInput({ mask, label, form, name, required, placeholder, ...props }) {
  return (
    <div className={cls.wrapper} {...props}>
      <div className={cls.head}>
        <div className={cls.label}>{label}</div>
        <InputMask
          alwaysShowMask={false}
          mask={mask}
          className={cls.input}
          type={"text"}
          placeholder={placeholder}
          // react hook form register
          {...form.register(name, { required: "To'ldirilishi shart" })}
        />
      </div>
      <p className={cls.errorText}>{form.formState.errors?.[name]?.message}</p>
    </div>
  );
}
