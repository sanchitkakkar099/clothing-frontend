import React, { useEffect, useState } from "react";
import { useLocation
  } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useCreatappInfoMutation } from "../../service";
import toast from "react-hot-toast";
import "../auth/MessagesStyling.css";
const StoreInfo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [appInfoReq, appInfoRes] = useCreatappInfoMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { state: locationState } = location;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("state data",locationState);


useEffect(() => {
    if (appInfoRes?.isSuccess) {
    //   toast.success(appInfoRes?.data?.message, {
    //     position: "top-center",
    //     duration: 3000,
    //   });
    setSuccessMessage(appInfoRes?.data?.data?.message || "StoreInfo saved successfully!");
    setErrorMessage("");
    const successTimeout = setTimeout(() => {
        setSuccessMessage("");
        navigate('/sign-up', { replace: true });
      }, 3000);
      return () => clearTimeout(successTimeout);
    }
    else if (appInfoRes?.isError) {
        setErrorMessage(appInfoRes?.error?.data?.message || "Something went wrong");
        setSuccessMessage("");
        const errorTimeout = setTimeout(()=> {
            setErrorMessage("");
            // navigate('/store-info');
        },3000);
        return () => clearTimeout(errorTimeout); 
      }
  }, [appInfoRes]);
 console.log("appInfoRes",appInfoRes);

//   useEffect(() => {
//     if (!appInfoRes?.isError) {
//     //   toast.error(appInfoRes?.data?.message, {
//     //     position: "top-center",
//     //     duration: 3000,
//     //   });
//       setErrorMessage(
//         appInfoRes?.error?.data?.message || "Something went wrong"
//       );
//     }
//   }, [appInfoRes]);

  const handleStoreInfoSubmit = (state) => {
    console.log("Store Info Submitted:", state);
    const reqData = {
        storeDomain : state?.storeDomain,
        apiKey: state?.clientId,
        apiSecreatKey : state?.clientSecret,
        accessToken: state?.accessToken,
    }
    appInfoReq(reqData);
    // alert("Store Info saved successfully!");
  };

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
                      Store App Info
                    </CardTitle>
                    <Form
                      className="auth-login-form mt-2"
                      onSubmit={handleSubmit(handleStoreInfoSubmit)}
                    >
                      <div className="mb-1">
                        <Label className="form-label" for="store-domain">
                          Store Domain
                        </Label>
                        <Controller
                          id="store-domain"
                          name="storeDomain"
                          control={control}
                          rules={{
                            required: "Store domain is required",
                          }}
                          render={({ field }) => (
                            <Input {...field} placeholder="example.myshopify.com" />
                          )}
                        />
                        {errors?.storeDomain && (
                          <FormFeedback>
                            {errors?.storeDomain?.message}
                          </FormFeedback>
                        )}
                      </div>
                      <div className="mb-1">
                        <Label className="form-label" for="client-id">
                          Shopify App API Key
                        </Label>
                        <Controller
                          id="client-id"
                          name="clientId"
                          control={control}
                          rules={{
                            required: "Client ID is required",
                          }}
                          render={({ field }) => (
                            <Input {...field} placeholder="Your Client ID" />
                          )}
                        />
                        {errors?.clientId && (
                          <FormFeedback>{errors?.clientId?.message}</FormFeedback>
                        )}
                      </div>
                      <div className="mb-1">
                        <Label className="form-label" for="client-secret">
                          Shopify App Secreat key
                        </Label>
                        <Controller
                          id="client-secret"
                          name="clientSecret"
                          control={control}
                          rules={{
                            required: "Client Secret is required",
                          }}
                          render={({ field }) => (
                            <Input {...field} placeholder="Your Client Secret" />
                          )}
                        />
                        {errors?.clientSecret && (
                          <FormFeedback>
                            {errors?.clientSecret?.message}
                          </FormFeedback>
                        )}
                      </div>
                      <div className="mb-1">
                        <Label className="form-label" for="access-token">
                        Shopify App Access Token
                        </Label>
                        <Controller
                          id="access-token"
                          name="accessToken"
                          control={control}
                          rules={{
                            required: "Access Token is required",
                          }}
                          render={({ field }) => (
                            <Input {...field} placeholder="Your Access Token" />
                          )}
                        />
                        {errors?.accessToken && (
                          <FormFeedback>
                            {errors?.accessToken?.message}
                          </FormFeedback>
                        )}
                      </div>
                      <Button color="primary" block>
                        Save Info
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

export default StoreInfo;
