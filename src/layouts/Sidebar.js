import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// ** Icons Imports
import { Disc, X, Circle } from "react-feather";
import Logo from "../assets/images/logo/logo.png";
import PerfectScrollbar from "react-perfect-scrollbar";
import { sideMenu } from "../constants/SideMenu";
import { useSelector } from "react-redux";

function Sidebar() {
  const shadowRef = useRef(null);
  const location = useLocation();
  const userInfo = useSelector((state) => state?.authState.userInfo)
  const [menu, setMenu] = useState(sideMenu);

  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block");
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block");
      }
    }
  };
  const Toggler = () => {
    return (
      <Disc
        size={20}
        data-tour="toggle-icon"
        className="text-primary toggle-icon d-none d-xl-block"
      />
    );
  };


  const onCollapseClick = (e, item) => {
    e.preventDefault();
    const resMenu = sideMenu?.map((sm) =>
      sm.label === item.label
        ? { ...sm, isActive: item.isActive ? false : true }
        : { ...sm }
    );
    setMenu(resMenu);
  };

  useEffect(() => {
    if (sideMenu?.some((sm) => sm.to === location.pathname)) {
      const resMenu = sideMenu?.map((sm) =>
        sm.to === location.pathname ? { ...sm, isActive: true } : { ...sm }
      );
      setMenu(resMenu);
    } else if (
      sideMenu?.some((sm) =>
        sm?.children?.some((smc) => smc.to === location.pathname)
      )
    ) {
      const resMenu = sideMenu?.map((sm) =>
        sm?.children?.some((smc) => smc.to === location.pathname)
          ? { ...sm, isActive: true }
          : { ...sm }
      );
      setMenu(resMenu);
    }
  }, [location]);

  const menuCollpse = () => {
    document.querySelector(".main-menu").classList.add("collapse");
    document.querySelector(".main-menu").classList.remove("expanded");
  };
  return (
    <div className="main-menu menu-fixed menu-accordion menu-shadow expanded menu-light">
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item me-auto">
            <NavLink to="/check-in-list" className="navbar-brand">
              <span className="brand-logo">
                {/* <img src={Logo} alt="logo" /> */}
              </span>
              <h2 className="brand-text mb-0">Clothing</h2>
            </NavLink>
          </li>
          <li className="nav-item nav-toggle">
            <div className="nav-link modern-nav-toggle cursor-pointer">
              {/* <Toggler /> */}
              <X
                className="toggle-icon icon-x d-block d-xl-none"
                onClick={menuCollpse}
                size={20}
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="shadow-bottom" ref={shadowRef}></div>
      <PerfectScrollbar
        className="main-menu-content"
        options={{ wheelPropagation: false }}
        onScrollY={(container) => scrollMenu(container)}
      >
        <ul className="navigation navigation-main custume-nav">
          {menu?.map((sm, i) => {
            return sm?.children ? (
              <li
                key={i}
                className={`nav-item has-sub ${
                  sm?.isActive
                    ? "open menu-collapsed-open sidebar-group-active"
                    : ""
                }`}
              >
                <Link
                  className="d-flex align-items-center"
                  to=""
                  onClick={(e) => onCollapseClick(e, sm)}
                >
                  {sm?.icon}
                  <span className="menu-title text-truncate"  >{sm.label}</span>
                </Link>
                <ul className="menu-content">
                  <div className={`collapse ${sm.isActive ? "show" : ""}`}>
                    {sm?.children?.map((smc, i) => {
                      return (
                        <li className="nav-item" key={i}>
                          <NavLink to={smc?.to}>
                            {smc?.icon}
                            {smc?.label}
                          </NavLink>
                        </li>
                      );
                    })}
                  </div>
                </ul>
              </li>
            ) : (
              <li className="nav-item" key={i}>
                <NavLink to={sm?.to}>
                  {sm?.icon}
                  {sm.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </PerfectScrollbar>
    </div>
  );
}

export default Sidebar;
