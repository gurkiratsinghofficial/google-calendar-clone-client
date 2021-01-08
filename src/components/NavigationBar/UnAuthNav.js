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
import constants from "../../constants/constants";

function UnAuthNav({ isOpen, toggleCollapse }) {
  return (
    <div>
      <MDBNavbar className="aqua-gradient" color="orange" dark expand="md">
        <MDBNavbarBrand>
          <MDBLink to="/">
            {" "}
            <strong className="white-text">
              <MDBIcon
                icon="calendar-alt"
                className=" indigo-text pr-3"
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
          <MDBNavbarNav left></MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/login">
                <button className="login-button">
                  <MDBIcon className="login-icon" icon="sign-in-alt" />
                </button>
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
}

export default UnAuthNav;
