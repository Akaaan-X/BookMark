import React from "react";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { SearchBox } from "./SearchBox";

export default function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const takeToProfile = () => {
    navigate("/profile");
  };
  const takeToUserList = () => {
    navigate("/admin/userlist");
  };
  const takeToProductList = () => {
    navigate("/admin/productlist");
  };
  const takeToOrderList = () => {
    navigate("/admin/orderlist");
  };

  return (
    <header>
      <Navbar bg='light' expand='lg' className='navBar'>
        <Container>
          <Navbar.Brand as={Link} to='/' className='navBrand'>
            <img src={logo} alt='Logo' />
            <span>BookMark</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='navLink'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
            </Nav>
            <Nav className='navLink ms-auto'>
              <SearchBox />
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i>
                Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item onClick={takeToProfile}>
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <i className='far fa-user'></i>Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item onClick={takeToUserList}>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={takeToProductList}>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={takeToOrderList}>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
