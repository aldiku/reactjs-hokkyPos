/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  NavItem,
  Button,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
// import { Link } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

function AdminNavbar({ theme, sidenavOpen, toggleSidenav }) {
  let user = null;
  const username = localStorage.username;
  const token = localStorage.token;
  const print = ()=> {
    window.print();
}

  if (localStorage.getItem("token")) {
    user = jwt_decode(localStorage.getItem("token"));
    localStorage.setItem("warehouse", user.wid);
    localStorage.setItem("usernametoken", user.sub);
  }

  let history = useHistory();
  // function that on mobile devices makes the search open
  const openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };
  function cekUsername() {
    let data = {
      username : username,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/users/logout`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          localStorage.removeItem("token");
          history.push("/auth/login");
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  async function handleLogout() {
    cekUsername();
    localStorage.removeItem("token");
  }

  return (
    <>
      <Navbar
        className={classnames(
          "navbar-top navbar-expand border-bottom",
          { "navbar-dark bg-gradient-orange": theme === "dark" },
          { "navbar-light bg-secondary": theme === "light" }
        )}
      >
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
                    { "sidenav-toggler-dark": theme === "dark" }
                  )}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
              <NavItem className="d-sm-none">
                <NavLink onClick={openSearch}>
                  <i className="ni ni-zoom-split-in" />
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
            <Button color="primary" className="nav-link pr-3" onClick={print}>Cetak </Button>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/Hokky1.png").default}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <Link>
                        <span className="mb-0 text-sm font-weight-bold font-color-white">
                          <font color="white">{user && user.sub}</font>
                        </span>
                      </Link>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  {/* <Link to="/admin/my-profil">
                    <DropdownItem>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                  </Link>
                  <Link to="/admin/change-password">
                    <DropdownItem>
                      <i className="ni ni-lock-circle-open" />
                      <span>Kata Sandi</span>
                    </DropdownItem>
                  </Link> */}
                  <DropdownItem divider />
                  <DropdownItem onClick={handleLogout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};

export default AdminNavbar;
