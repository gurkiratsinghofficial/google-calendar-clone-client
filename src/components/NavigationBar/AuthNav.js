import React from "react";
import {
  MDBCollapse,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
  MDBLink,
  MDBIcon,
} from "mdbreact";

import { capitalize } from "../../helpers/capitalize";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout, selectUser } from "../../features/User/userSlice";
import constants from "../../constants/constants";

function AuthNav({ isOpen, toggleCollapse }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  /**function to logout */
  const logoutFunc = async () => {
    const logUserOut = await dispatch(logout());
    if (logUserOut) history.push("/");
  };
  return (
    <div>
      <MDBNavbar className="aqua-gradient" color="orange" dark expand="md">
        <MDBNavbarBrand>
          <MDBLink to="/">
            <strong className="white-text">
              <MDBIcon
                icon="calendar-alt"
                className="indigo-text pr-3"
                gradient="purple"
                size="lg"
              />
              {constants.APP_NAME}
              <p className="slogan">{constants.APP_SLOGAN}</p>
            </strong>
          </MDBLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          onClick={() => {
            toggleCollapse();
          }}
        />
        <MDBCollapse id="NavbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <label className="hello-name">
                Hello,{user ? capitalize(user.firstname) : false}
              </label>
            </MDBNavItem>
            <MDBNavItem>
              <label className="seperator">|</label>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/personaldetails">
                <label className="my-profile">My Profile</label>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <label className="seperator">|</label>
            </MDBNavItem>{" "}
            <MDBNavItem>
              <MDBNavLink to="/">
                <label className="my-profile">Events</label>
              </MDBNavLink>
            </MDBNavItem>
            <button className="logout-button" onClick={logoutFunc}>
              <MDBIcon className="login-icon mr-3" icon="sign-out-alt" />
            </button>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
}

export default AuthNav;
