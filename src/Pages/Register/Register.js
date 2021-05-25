import React, { useState } from "react";
import styles from "./Register.module.css";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../../config";

const Register = () => {
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState();
    const onSubmit = (data, e) => {
        setMessage({
            data: "Registration is in progress...",
            type: "alert-warning",
        });
        fetch(`${config.baseUrl}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((data) => {
            const hasError = "error" in data && data.error != null;
            setMessage({
                data: hasError ? data.error : "Registered successfully",
                type: hasError ? "alert-danger" : "alert-success",
            });

            !hasError && e.target.reset();
        });
    };

    return (
        <div className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}>
            <div className={styles.registrationFormContainer}>
                {message && (
                    <div className={`alert fade show d-flex ${message.type}`} role="alert">
                        {message.data}
                        <span
                        aria-hidden="true"
                        className="ml-auto cursor-pointer"
                        onClick={() => setMessage(null)}
                        >
                        &times;
                        </span>
                    </div>
                )}
                <fieldset className="border p-3 rounded">
                    <legend className={`${styles.registrationFormLegend} border rounded p-1 text-center`}>
                        Registration Form
                    </legend>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                        <div className="form-group mt-3">
                            <label htmlFor="inputForEmail">Email address</label>
                            <span className="mandatory">*</span>
                            <input 
                                type="email"
                                className="form-control"
                                aria-describedby="Enter email address"
                                placeholder="Enter email address"
                                {...register('email', { 
                                    required: {
                                        value: true,
                                        message: "Please enter your email address",
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Enter a valid email address",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters are allowed",
                                    },
                                    maxLength: {
                                        value: 255,
                                        message: "Maximum 255 characters are allowed",
                                    },
                                })} 
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="inputForName">Your Name</label>
                            <span className="mandatory">*</span>
                            <input 
                                type="text"
                                className="form-control"
                                aria-describedby="Enter your name"
                                placeholder="Enter your name"
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: "Please enter your name",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters are allowed",
                                    },
                                    maxLength: {
                                        value: 255,
                                        message: "Maximum 255 characters are allowed",
                                    },
                                })}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="inputForPassword">Password</label>
                            <span className="mandatory">*</span>
                            <input
                                type="password"
                                className="form-control"
                                id="inputForPassword"
                                placeholder="Enter password"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: "Please enter password",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters are allowed",
                                    },
                                    maxLength: {
                                        value: 255,
                                        message: "Maximum 255 characters are allowed",
                                    },
                                })}
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button type="submit" className="btn btn-outline-primary">
                                Submit
                            </button>
                            <button className="btn btn-link">
                                <Link to="/login">Login</Link>
                            </button>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};

export default Register;