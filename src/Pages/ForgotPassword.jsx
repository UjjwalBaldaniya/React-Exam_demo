import React, { useState } from "react";
import Form from "../Components/Form";
import { forgotPassword } from "../Services/allApi";
import { toast } from "react-toastify";
import formValidation from "../utils/validation";
import Navbar from "../Components/Navbar";
import { forgotPasswordFieldList } from "../utils/description";

const ForgotPassword = () => {
    const [forgotPwField, setForgotPwField] = useState({
        email: ""
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
    });

    const forgotPwChange = (e) => {
        const { name, value } = e.target
        const error = formValidation(name, value);
        setFormErrors({
            ...formErrors,
            [name]: error,
        });
        setForgotPwField({
            ...forgotPwField,
            [name]: value
        })
    }

    const forgotPwSubmit = (e) => {
        e.preventDefault()
        if (Object.values(forgotPwField).some((value) => value.trim() === "")) {
            toast.error("Please fill out all fields");
        } else {
            forgotPassword(forgotPwField)
                .then((res) => {
                    console.log(res)
                    toast.success(res.data.message)
                    setForgotPwField({
                        email: ""
                    })
                })
                .catch((error) => {
                    console.log(error)
                    toast.error(error.response.data.message)
                })
        }
    }

    const forgotPasswordListData = forgotPasswordFieldList(formErrors, forgotPwChange, forgotPwField)

    return (
        <>
            <Navbar />
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Forgot Password</h1>
                    <form className="login_form" onSubmit={forgotPwSubmit}>
                        <Form inputs={forgotPasswordListData} />
                        <button type="submit" className="login_btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default ForgotPassword;
