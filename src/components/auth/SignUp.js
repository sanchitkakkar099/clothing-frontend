import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useVendorSignUpMutation } from "../../service";
import toast from "react-hot-toast";
import "./MessagesStyling.css"
const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpReq, signUpRes] = useVendorSignUpMutation();
  const [successMessage, setSuccessMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = (state) => {
    const reqData = {
      fname: state?.firstName,
      lname: state?.lastName,
      phone: state?.phone,
      email: state?.email,
      password: state?.password,
      role: "Vendor",
      storename: state?.storename,
    };
    console.log("signup details", reqData);
    signUpReq(reqData);
  };

  console.log("SIGNUP RESPONSE", signUpRes);
  useEffect(() => {
    if (signUpRes?.isSuccess) {
      // toast.success(signUpRes?.data?.data?.message || "Signup successful!", {
      //     style: { zIndex: 9999 },
      //   });
      setSuccessMessage(signUpRes?.data?.data?.message || "Signup successful!");
      setErrorMessage("");
      // Delay navigation after the toast duration
      const successTimeout = setTimeout(() => {
        setSuccessMessage(""); // Clear message
        navigate("/", {
          state: signUpRes?.data?.data,
        });
      }, 3000); // Delay matches the toast duration (3000ms)

      return () => clearTimeout(successTimeout); // Cleanup timeout
    } else if (signUpRes?.isError) {
      setErrorMessage(
        signUpRes?.error?.data?.message || "Something went wrong"
      );
    }
  }, [signUpRes]);

  return (
    <div className={"blank-page"}>
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="auth-wrapper auth-basic px-2">
              <div className="auth-inner my-2">
                <Card className="mb-0">
                  {successMessage && (
                    <div className="message success-message">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="message error-message">{errorMessage}</div>
                  )}
                  <CardBody>
                    <CardTitle tag="h4" className="mb-1">
                      Create Vendor Account
                    </CardTitle>
                    <CardText className="mb-2">Sign up to get started</CardText>
                    <Form
                      className="auth-login-form mt-2"
                      onSubmit={handleSubmit(handleSignup)}
                    >
                      <div className="mb-1">
                        <Label className="form-label" for="first-name">
                          First Name
                        </Label>
                        <Controller
                          id="first-name"
                          name="firstName"
                          control={control}
                          rules={{
                            required: "First name is required",
                          }}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors?.firstName && (
                          <FormFeedback>
                            {errors?.firstName?.message}
                          </FormFeedback>
                        )}
                      </div>
                      <div className="mb-1">
                        <Label className="form-label" for="last-name">
                          Last Name
                        </Label>
                        <Controller
                          id="last-name"
                          name="lastName"
                          control={control}
                          rules={{
                            required: "Last name is required",
                          }}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors?.lastName && (
                          <FormFeedback>
                            {errors?.lastName?.message}
                          </FormFeedback>
                        )}
                      </div>
                      <div className="mb-1">
                        <Label className="form-label" for="phone-number">
                          Phone Number
                        </Label>
                        <Controller
                          id="phone-number"
                          name="phone"
                          control={control}
                          rules={{
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Phone number must be 10 digits",
                            },
                          }}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors?.phone && (
                          <FormFeedback>{errors?.phone?.message}</FormFeedback>
                        )}
                      </div>
                      <div className="mb-1">
                        <Label className="form-label" for="signup-email">
                          Email
                        </Label>
                        <Controller
                          id="signup-email"
                          name="email"
                          control={control}
                          rules={{
                            required: "Email is required",
                            validate: {
                              matchPattern: (v) =>
                                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v) ||
                                "Email address must be valid",
                            },
                          }}
                          render={({ field }) => (
                            <Input type="email" {...field} />
                          )}
                        />
                        {errors?.email && (
                          <FormFeedback>{errors?.email?.message}</FormFeedback>
                        )}
                      </div>
                      <div className="mb-1">
                        <Label className="form-label" for="storename">
                          Shop domain
                        </Label>
                        <Controller
                          id="storename"
                          name="storename"
                          control={control}
                          rules={{
                            required: "Store name is required",
                          }}
                          render={({ field }) => (
                            <Input type="storename" {...field} />
                          )}
                        />
                        {errors?.storename && (
                          <FormFeedback>
                            {errors?.storename?.message}
                          </FormFeedback>
                        )}
                      </div>
                      <div className="mb-1">
                        <Label className="form-label" for="signup-password">
                          Password
                        </Label>
                        <Controller
                          id="signup-password"
                          name="password"
                          control={control}
                          rules={{
                            required: "Password is required",
                          }}
                          render={({ field }) => (
                            <Input
                              type="password"
                              {...field}
                              placeholder="············"
                            />
                          )}
                        />
                        {errors?.password && (
                          <FormFeedback>
                            {errors?.password?.message}
                          </FormFeedback>
                        )}
                      </div>
                      <FormFeedback className="mb-1">
                        {errorMessage}
                      </FormFeedback>
                      <Button color="primary" block>
                        Sign Up
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
