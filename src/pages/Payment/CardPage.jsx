import cls from "./styles.module.scss"
import React, { useState } from 'react'
import CardInput from "../../components/FormElements/CardInput"
import DateInput from "../../components/FormElements/DateInput"
import OtpInputField from "../../components/FormElements/OtpInputField"
import { useForm } from "react-hook-form"
import cardService from "../../services/cardServices"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUserOrder } from "../../store/order/order.slice"

const paymentTypes = [
    { label: "Cash", value: "8e85e55f-bcd8-4225-9ae9-ec9ded4787ae" },
    // { label: "Payme", value: "f2868b77-32b2-4f0b-be9f-710741c386d5" },
    { label: "Click", value: "d19c17c2-902f-4751-8c34-0e2c8bf20a60" },
  ];


function CardPage() {
    const { handleSubmit, control } = useForm()
    const [otpInput, setOtpInput] = useState("")
    const [showOtpInput, setShowOtpInput] = useState(false)
    const [formData, setFormData] = useState(null)
    const [paymentType, setPaymentType] = useState(paymentTypes[0].value)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setUserOrder({paymentType}))
    },[paymentType])


    const getToken = (data) => {
        cardService.ClickGetToken(data)
            .then((res) => {
                console.log(res)
                setShowOtpInput(true)
                setFormData(data)
            })
            .catch((err) => console.log(err))
    }

    const onSubmit = (value) => {
        console.log("Form Values:", value);  // Add this line to log the form values
    
        const card_number = value?.card_number?.replace(/\s+/g, ''); // Remove all spaces
        const expire_date = value?.expired_date?.replace(/\//g, ''); // Remove all slashes
    
        if (!card_number || !expire_date) {
            console.error("Card number or expiration date is missing");
            return;
        }
    
        const data = {
            card_number,
            expire_date
        }
    
        console.log("Processed Data:", data);
    
        if (showOtpInput) {
            verifyOtp()
        } else {
            getToken(data)
        }
    }
    

    const verifyOtp = () => {
        // Implement OTP verification logic here
        const data = {
            otp: +otpInput,
            token: formData.token
        }
        cardService.ClickVerifyToken(data)
            .then((res) => {
                if (res.success) {
                    console.log("Order accepted")
                } else {
                    console.log("Invalid OTP")
                }
            })
            .catch((err) => console.log(err))
    }


    const handlePaymentType = (payment) => {
        setPaymentType(payment)
    }

    return (
        <div className={cls.card__page}>
        <div className={cls.cash__card}>
            {/* <div className={cls.tab}
            onClick={()=>handlePaymentType("")}
            >
                Cash
            </div> */}
            {paymentTypes.map((pType) => (
            <div className={`${cls.tab} ${pType.value === paymentType ? cls.active : ""}`}
             onClick={()=>handlePaymentType(pType.value)}
            >
                {pType.label}
            </div>
            ))}
        </div>
        {paymentType === "d19c17c2-902f-4751-8c34-0e2c8bf20a60" && (
            <form className={cls.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
                {!showOtpInput  && (
                    <>
                        <CardInput required name="card_number" control={control} />
                        <DateInput required name="expired_date" control={control} />
                    </>
                )}

                {showOtpInput && (
                    <div className={cls.otp__wrapper}>
                        <h4>Otp-kod</h4>
                        <OtpInputField otpInput={otpInput} setOtpInput={setOtpInput} />
                    </div>
                )}

                <div className={cls.button__wrapper}>
                    <button type="button" className={cls.cancel__btn} onClick={() => setShowOtpInput(false)}>
                        Отмена
                    </button>
                    <button type="submit" className={cls.continue__btn}>
                        {showOtpInput ? "Продолжать" : "Отправить"}
                    </button>
                </div>
            </form>
        )}
        </div>
    )
}

export default CardPage
