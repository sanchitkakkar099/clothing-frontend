import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useAppStatusMutation,
  useAppStatusUpdateMutation,
} from "../../service";
import { updateUserInfoField } from "../../redux/authSlice";
export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useSelector((state) => state?.authState.userInfo);
  const [shopDetails, setShopDetails] = useState();
  const [error, setError] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [reqAppInfo, resAppInfo] = useAppStatusMutation();
  const [reqAppStatusUpdate, resAppStatusUpdate] = useAppStatusUpdateMutation();
  const [vendorOrder, setVendorOrder] = useState();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  console.log("userInfo", userInfo);
  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        const reqData = {
          token: userInfo?.token,
          storename: userInfo?.storename,
          isAppUpdate: false,
        };

        const response = await reqAppInfo(reqData);
        console.log("new response ", response);
        if (!response?.data?.error) {
          dispatch(
            updateUserInfoField({
              key: "isAppinstall",
              value: response?.data?.data?.isAppinstall,
            })
          );
        } else {
          throw new Error("Failed to fetch store status");
        }
      } catch (error) {
        console.error("Error fetching store status:", error.message);
      }
    };

    fetchStoreStatus();
  }, []);

  useEffect(() => {
    const orderResponse = async () => {
      try {
        const response = await fetch("/api/orders/get/all");
        if (response.ok) {
          const responseData = await response.json();
          // console.log("oders response", responseData);
          //   setVendorOrder(responseData);
        }
      } catch (error) {
        console.error("Error fetching order data:", error.message);
      }
    };
    orderResponse();
  }, []);
  console.log("isActive", isActive);

  const handleConfirmAction = async () => {
    toggleModal();

    const reqData = {
      storename: userInfo?.storename,
      isAppinstall: !userInfo?.isAppinstall,
      isAppUpdate: true,
    };
    // const response =
    console.log("reqData", reqData);
    const responseData = await reqAppInfo(reqData);
    console.log("responseData", responseData);
    if (!responseData?.data?.error) {
      setIsActive(responseData?.data?.data?.isAppinstall);
      console.log("isActive in response validation", isActive);
    } else {
      throw new Error("Failed to fetch store status");
    }
    dispatch(
      updateUserInfoField({
        key: "isAppinstall",
        value: responseData?.data?.data?.isAppinstall,
      })
    );
  };

  const handleCancelAction = () => {
    toggleModal();
  };
  const handleChange = () => {
    setConfirmationMessage(
      userInfo?.isAppinstall
        ? "Are you sure to deactivate the app?"
        : "Are you sure to activate the app?" || "Loading..."
    );
    toggleModal();
  };

  const handleViewProducts = () => {
    navigate("/product-list");
  };

  const handleViewOrders = () => {
    navigate("/order-list", { state: { vendorOrder } });
  };

  const handleStoreProfile = () => {
    setProfileModal(true);
  };
  console.log("orderslength", vendorOrder?.orders?.orders?.length);
  console.log("state value", state);
  console.log("vendor Order", vendorOrder?.orders);
  return (
    <div className="d-flex  align-item-start flex-wrap">
      <Card
        style={{
          width: "20rem",
          margin: "1rem",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">App Approval Status</CardTitle>
          Current Status:{" "}
          <b> {userInfo?.isAppapproved ? "Approved" : "Not Approved"}</b>
        </CardBody>
      </Card>
      <Card
        style={{
          width: "20rem",
          margin: "1rem",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">Store Profile</CardTitle>
          Profile Status: {/* <b>{data1?.data}</b> */}
          <b></b>
        </CardBody>
        <CardBody>
          <Button
            color="primary"
            onClick={handleStoreProfile}
            //   disabled={data1?.success === true}
          >
            Store Profile Details
          </Button>
          {/* {profileModal && <StoreProfileView modal={profileModal} setModal={setProfileModal} productCount= {data?.countData?.count.toString()} storeData={shopDetails} />} */}
        </CardBody>
      </Card>
      <Card
        style={{
          width: "20rem",
          margin: "1rem",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">App Status</CardTitle>

          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Current Status:{" "}
            <b>
              {(userInfo?.isAppinstall ? "Active" : "Inactive") || "Loading..."}
            </b>
          </CardSubtitle>
        </CardBody>
        <CardBody>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={userInfo?.isAppinstall}
              onChange={handleChange}
              value={userInfo?.isAppinstall}
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              <span
                className={`nav-link ${userInfo?.isAppinstall ? "active" : ""}`}
              >
                {(userInfo?.isAppinstall
                  ? "App is Activated"
                  : "App is Deactivated") || "Loading...."}
              </span>
            </label>
          </div>
        </CardBody>
      </Card>

      <Card
        style={{
          width: "20rem",
          margin: "1rem",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">ProductList</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Total Products:
            {/* {" "} <b>
            {data?.countData?.count.toString() 
            || "Loading..."}</b> */}
          </CardSubtitle>
        </CardBody>
        <CardBody>
          <Button color="primary" onClick={handleViewProducts}>
            View Products
          </Button>
        </CardBody>
      </Card>

      <Card
        style={{
          width: "20rem",
          margin: "1rem",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">OrderList</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Total Orders:{" "}
            <b>
              {vendorOrder?.orders
                ? vendorOrder?.orders?.orders?.length.toString()
                : "Loading..."}
            </b>
            {/* {(vendorOrder?.orders || vendorOrder?.orders?.length.toString())?vendorOrder?.orders?.length:"Loading..."} */}
          </CardSubtitle>
        </CardBody>
        <CardBody>
          <Button color="primary" onClick={handleViewOrders}>
            View Orders
          </Button>
        </CardBody>
        <Modal isOpen={showModal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Confirmation</ModalHeader>
          <ModalBody>
            <p>{confirmationMessage}</p>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={handleConfirmAction}>
              Confirm
            </button>
            <button className="btn btn-secondary" onClick={handleCancelAction}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </Card>
    </div>
  );
}