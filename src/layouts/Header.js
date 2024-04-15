import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import userAvatar from "../assets/images/portrait/small/avatar-s-11.jpg";
import { Link, Menu, LogOut, ChevronsLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
import { setUserInfo, setUserToken, setIsFrench } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoginAsAdminMutation } from "../service";
import Cookies from "universal-cookie";
const cookies = new Cookies();


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0)
  const userInfo = useSelector((state) => state?.authState.userInfo);
  const isFrench = useSelector((state) => state?.authState.isFrench);
  const [loginBackAdminReq, loginBackAdminRes] = useLoginAsAdminMutation();
  // console.log('width',width);
  // console.log('userInfo',userInfo);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1200) {
        document.querySelector(".main-menu").classList.add("collapse");
        document.querySelector(".main-menu").classList.remove("expanded");
      } else {
        document.querySelector(".main-menu").classList.remove("collapse");
        document.querySelector(".main-menu").classList.add("expanded");
      }
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [setWidth])

  const menuCollpse = () => {
    document.querySelector(".main-menu").classList.remove("collapse");
    document.querySelector(".main-menu").classList.add("expanded");
  };

  const handleBackToAdmin = (e, adminId) => {
    console.log("adminId",adminId)
    e.preventDefault();
    loginBackAdminReq({
      staffById: adminId,
    });
  };

  useEffect(() => {
    console.log("loginBackAdminRes",loginBackAdminRes?.data);
    if (loginBackAdminRes?.isSuccess && loginBackAdminRes?.data) {
      console.log("loginAs", loginBackAdminRes?.data);
      cookies.set("gtrsante", loginBackAdminRes?.data?.data?.token);
      cookies.set("gtrsante_user", loginBackAdminRes?.data?.data);
      dispatch(setUserToken(loginBackAdminRes?.data?.data?.token))
      dispatch(setUserInfo(loginBackAdminRes?.data?.data,))
      navigate("/");
    }
  },[loginBackAdminRes])

  const handleLogout = () => {
    // localStorage.clear()
    cookies.remove("gtrsante");
    cookies.remove("gtrsante_user");
    cookies.remove("isLoggedIn");
    cookies.remove("lastActiveTime");
    cookies.remove("savedTimerValue");
    dispatch(setUserInfo({}));
    dispatch(setUserToken(""));
    navigate('/')
  }
  const handleChangeLanguage = async (e) => {
    // console.log(e.target.checked);
    if (e.target.checked) {
      setIsFrench(true);
      cookies.set("isfrench", true)
      dispatch(setIsFrench(true))
    } else {
      setIsFrench(false);
      cookies.set("isfrench", false)
      dispatch(setIsFrench(false))
    }
    // console.log('isFrench66666',isFrench)
  }

  return (
    <Navbar
      expand="lg"
      container={false}
      className={
        "header-navbar navbar align-items-center floating-nav container-xxl navbar-shadow navbar navbar-expand-lg navbar-light"
      }
    >
      <div className="navbar-container d-flex content">
        <div className="bookmark-wrapper d-flex align-items-center">
          <div className='bookmark-wrapper d-flex align-items-center'>
            {width < 1200 && <Menu
              onClick={menuCollpse}
            />}
          </div>
        </div>
        <ul className="nav navbar-nav align-items-center ms-auto">
          <Form>
            <FormGroup switch>
              <Label check>French</Label>
              <Input type="switch"
                checked={isFrench}
                role="switch"
                onChange={(e) => { handleChangeLanguage(e) }} />
            </FormGroup>
          </Form>
          <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle
              href="/"
              tag="a"
              className="nav-link dropdown-user-link"
              onClick={(e) => e.preventDefault()}
            >
              <div className="user-nav d-sm-flex d-none">
                <span className="user-name fw-bold text-capitalize">{userInfo ? userInfo?.fname + " " + userInfo?.lname : 'GTR Sante'}</span>
                <span className="user-status">{userInfo ? userInfo?.role : 'Admin'}</span>
              </div>
              <div className="avatar">
                <img
                  className=""
                  src={userAvatar}
                  alt="avatarImg"
                  height="40"
                  width="40"
                />
                <span className="avatar-status-online"></span>
              </div>
            </DropdownToggle>
            <DropdownMenu end>
              {userInfo?.asAdminFlag ? (
                <DropdownItem onClick={(e) => handleBackToAdmin(e, userInfo?.adminId)}>
                  <ChevronsLeft size={14} className='me-75' />
                  <span className='align-middle'>Bact To Admin</span>
                </DropdownItem>
              ) : (
                <DropdownItem onClick={() => handleLogout()}>
                  <LogOut size={14} className='me-75' />
                  <span className='align-middle'>Logout</span>
                </DropdownItem>)}
            </DropdownMenu>
          </UncontrolledDropdown>
        </ul>
      </div>
    </Navbar>
  );
}

export default Header;
