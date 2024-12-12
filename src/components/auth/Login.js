import React, { useEffect } from "react";
// ** React Imports
import { Link, useNavigate } from "react-router-dom";
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

import "../../@core/scss/react/pages/page-authentication.scss";
import { useState } from "react";
import { useLoginAuthMutation } from "../../service";
import { Controller, useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setUserToken } from "../../redux/authSlice";
import { setShopifyAppUser } from "../../redux/approvalSlice";
const cookies = new Cookies();

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordShow, setPasswordShow] = useState(false);
  const userToken = useSelector((state) => state?.authState.userToken);
  const [loginReq, loginRes] = useLoginAuthMutation();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm();

  const handleLogin = (state) => {
    const reqData = {
      email: state?.email,
      storename: state?.storename,
      password: state?.password,
    };
    loginReq(reqData);
  };

  const handleSignUp = (state) => {
    console.log("state", state);
    navigate("/store-info");
  };

  console.log("loginRes", loginRes);
  useEffect(() => {
    if (loginRes?.isSuccess) {
      cookies.set("clothing", loginRes?.data?.data?.token);
      cookies.set("clothing_user", loginRes?.data?.data);
      dispatch(setUserToken(loginRes?.data?.data?.token));
      dispatch(setUserInfo(loginRes?.data?.data));
      dispatch(setShopifyAppUser(loginRes?.data));
      setErrorMessage("");
      const { role } = loginRes?.data?.data;
      // eslint-disable-next-line default-case
      switch (role) {
        case "Admin":
          navigate("/order-list");
          break;
        case "Vendor":
          if(!loginRes?.data?.data?.appInfoSubmitted){
            navigate("/store-info");
            return;
          }else{
          navigate("/dashboard");
          break;
          }
        // default:
        //     navigate('/'); // Navigate to a default page if the role is not recognized
        //     break;
      }
    } else if (loginRes?.isError) {
      setErrorMessage(loginRes?.error?.data?.message || "Something went wrong");
    }
  }, [loginRes]);
  return (
    <div className={"blank-page"}>
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="auth-wrapper auth-basic px-2">
              <div className="auth-inner my-2">
                <Card className="mb-0">
                  <CardBody>
                    <Link
                      className="brand-logo"
                      to="/login"
                      onClick={(e) => e.preventDefault()}
                    >
                      <h2 className="brand-text text-primary ms-1">Login</h2>
                    </Link>
                    <CardTitle tag="h4" className="mb-1">
                      Welcome 👋
                    </CardTitle>
                    <CardText className="mb-2">
                      Please sign-in to your account
                    </CardText>
                    <Form
                      className="auth-login-form mt-2"
                      onSubmit={handleSubmit(handleLogin)}
                    >
                      <div className="mb-1">
                        <Label className="form-label" for="login-email">
                          Email
                        </Label>
                        <Controller
                          id="email"
                          name="email"
                          control={control}
                          rules={{
                            required: "Email is required",
                            validate: {
                              matchPattern: (v) =>
                                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v) ||
                                "Email address must be a valid address",
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
                        <div className="d-flex justify-content-between">
                          <Label className="form-label" for="login-password">
                            Password
                          </Label>

                          {/* <Link to='/pages/forgot-password-basic'>
                    <small>Forgot Password?</small>
                  </Link> */}
                        </div>
                        <div className="input-group-merge input-group">
                          <Controller
                            id="password"
                            name="password"
                            control={control}
                            rules={{
                              required: "Password is required",
                            }}
                            render={({ field }) => (
                              <Input
                                placeholder="············"
                                id="login-password"
                                type={passwordShow ? "text" : "password"}
                                className="form-control"
                                {...field}
                              />
                            )}
                          />
                          <span
                            className="cursor-pointer input-group-text"
                            onClick={() => setPasswordShow(!passwordShow)}
                          >
                            {passwordShow ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                              </svg>
                            )}
                          </span>
                        </div>
                        {errors?.password && (
                          <FormFeedback>
                            {errors?.password?.message}
                          </FormFeedback>
                        )}
                      </div>
                      <FormFeedback className="mb-1">
                        {errorMessage}
                      </FormFeedback>
                      <div className="form-check mb-1">
                        <Input type="checkbox" id="remember-me" />
                        <Label className="form-check-label" for="remember-me">
                          Remember Me
                        </Label>
                      </div>
                      <Button color="primary" block>
                        Sign in
                      </Button>
                      <div className="form-check"></div>
                      <Button color="primary" block onClick={handleSignUp}>
                        Vendor SignUp
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
}

export default Login;
