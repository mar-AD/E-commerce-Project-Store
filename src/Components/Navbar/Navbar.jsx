import React, { useContext, useState, useEffect, } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import axios from "axios";
import "./Navbar.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import image from "../../Assets/logoo.png";
import { useCart } from "../Cart/Cartcontext";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import {
  useAuth,
  AuthProvider,
  AuthContext,
} from "../../Components/Logincontext/Logincontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ onSearchChange }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActivatedItem] = useState("");
  const authCtx = useContext(AuthContext);

  const [checkout, setCheckout] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCheckout(storedCart);
  }, []);

  const handleDelete = (productId) => {
    const updatedCart = storedCart.filter(
      (cartProduct) => cartProduct._id !== productId
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCheckout(updatedCart);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchortwoEl, setAnchortwoEl] = useState(null);

  const AccountPopoverOpen = (event) => {
    setAnchortwoEl(event.currentTarget);
    document.body.classList.add("overflow-auto");
  };

  const AccountPopoverClose = () => {
    setAnchortwoEl(null);
    document.body.classList.remove("overflow-auto");
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("overflow-auto");
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    document.body.classList.remove("overflow-auto");
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearchChange(newQuery);
  };

  useEffect(() => {
    const originalBodyPaddingRight = document.body.style.paddingRight;

    if (anchortwoEl) {
      document.body.style.paddingRight = "0";
    } else {
      document.body.style.paddingRight = originalBodyPaddingRight;
    }

    return () => {
      document.body.style.paddingRight = originalBodyPaddingRight;
    };
  }, [anchorEl, anchortwoEl]);

  const open = Boolean(anchorEl);
  const Accountopen = Boolean(anchortwoEl);

  useEffect(() => {
    const currentPage =
      location.pathname === "/" || location.pathname === "/Home"
        ? "/"
        : location.pathname.split("/").pop();
    setActivatedItem(currentPage);
  }, [location.pathname]);

  const activeItemClick = (item) => {
    setActivatedItem(item);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "https://e-commerce-project-backend-yec6.onrender.com/v1/customers/password/reset",
        {
          email: formData.email,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("User not found");
      } else {
        toast.error("Forgot password failed");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isLogin) {
        // Login
        function decodeJwt(token) {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          return JSON.parse(jsonPayload);
        }
        try {
          const response = await axios.post(
            "https://e-commerce-project-backend-yec6.onrender.com/v1/customers/login",
            {
              email: formData.email,
              password: formData.password,
            }
          );
          const { access_token, refresh_token } = response.data;
          authCtx.login(access_token, refresh_token);
          const decoded = decodeJwt(access_token);
          const customerid = decoded.customerid;
          localStorage.setItem("customerId", customerid);
          navigate("/");
          toast.success('logged in successfully');

        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            // If the server responds with an error message
            setError(error.response.data.error);
            toast.error(error.response.data.error);
          } else {
            // Handle other errors
            setError("An error occurred during login");
            toast.error("An error occurred during login");
          }
        }finally {
          AccountPopoverClose();
        }
      } else {
        // Register
        try {
          const response = await axios.post(
            "https://e-commerce-project-backend-yec6.onrender.com/v1/customers",
            formData
          );
          toast.success(
            response.data,
            "Check your Email to activate your account."
          );
          toast.success("Check your Email to activate your account.");
          setMessage();
        } catch (error) {
          if (error.response && error.response.status === 400) {
            const validationErrors = error.response.data.err;
            toast.error(
              [
                ...validationErrors,
                "Please check your input and try again.",
              ].join("\n")
            );
          } else {
            const errorMessage = error.response.data.err || "An error occurred";
            toast.error(errorMessage);
          }
        }
      }
    } catch (error) {
      console.error("Authentication failed", error);
    } finally {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      AccountPopoverClose();
    }
  };
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close the burger menu
  };

  return (
    <>
      <nav className={`navbaaar ${scrolled ? "scrolled" : ""}`}>
        <div className="navleft">
          <div
            className={`burger-menu ${isMenuOpen ? "show" : ""}`}
            onClick={toggleMenu}
          >
            <MenuRoundedIcon style={{ fontSize: "2em" }} />
          </div>
          <div className="title">
            <Link to="/">
              <img src={image} alt="" />
            </Link>
          </div>
          <div>
            <ul className={`menu ${isMenuOpen ? "show" : ""}`}>
              <div className="close">
                <CloseRoundedIcon onClick={closeMenu} style={{ fontSize: "2em" }} />
              </div>
              <div className="logo">
                <Link exact to="/Home">
                  <img src={image} alt="" />
                </Link>
              </div>
              <li className={`navItem ${activeItem === "Home" || activeItem === "/" ? "active" : ""}`}>
                <NavLink
                  exact
                  to="/Home"
                  activeClassName
                  className="active-link"
                  onClick={() => { activeItemClick("Home"); handleMenuItemClick(); }}
                >
                  Home
                </NavLink>
              </li>
              <li className={`navItem ${activeItem === "Shop" ? "active" : ""}`}>
                <NavLink
                  to="/Shop"
                  className="active-link"
                  onClick={() => { activeItemClick("Shop"); handleMenuItemClick(); }}
                >
                  Shop
                </NavLink>
              </li>
              <li className={`navItem ${activeItem === "Contact" ? "active" : ""}`}>
                <NavLink
                  to="/Contact"
                  className="active-link"
                  onClick={() => { activeItemClick("Contact"); handleMenuItemClick(); }}
                >
                  Contact
                </NavLink>
              </li>
              <li className="searchrespo">
                <div className="search-responsive">
                  <input
                    type="text"
                    placeholder="Search"
                    className="search-responsive-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <SearchIcon className="search-responsive-icon" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="navright">
        <div className="search">
          <input
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search"
          />
          <SearchIcon className="search-icon" />
        </div>
        <div className="icons">
          <div className="shoppingcart" onClick={AccountPopoverOpen}>
            {!authCtx.token || authCtx.refToken ? (
              <>
                <AccountCircleOutlinedIcon  />
                
                <Popover
            open={Accountopen}
            anchorEl={anchortwoEl}
            onClose={AccountPopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ marginTop: "20px", zIndex: 10000 }}
          >
            <Box p={2} maxWidth={500}>
              <Typography variant="h6">
                {isLogin ? "Login" : "Register"}
              </Typography>
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="registerform">
                    <TextField
                      label="First Name"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  name="email"
                  id="email"
                  autoComplete="on"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#590404",
                    color: "#fff",
                  }}
                  fullWidth
                >
                  {isLogin ? "LOGIN" : "REGISTER"}
                </Button>
              </form>
              <div
                style={{
                  cursor: "pointer",
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {isLogin ? (
                  <Link
                    to="#"
                    className="forgot-password"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password
                  </Link>
                ) : null}
                <Typography variant="body2" onClick={toggleForm}>
                  {isLogin
                    ? "Don't have an account? Register here."
                    : "Already have an account? Login here."}
                </Typography>
              </div>
            </Box>
            
          </Popover>
              </>
              
            ) : (
              <>
              <AccountCircleIcon  onClick={() => {
                  navigate("/Profil");
                  AccountPopoverClose()
                }}/>
              </>
            )}
          </div>
          

          <div className="like">
            <div className="shoppingcart">
              <Link
                style={{
                  cursor: "pointer",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                }}
                to="/Favorites"
              >
                <FavoriteBorderRoundedIcon />
              </Link>
            </div>
          </div>

          <div className="cart" onClick={handlePopoverOpen}>
            <div className="shoppingcart">
              <ShoppingBagOutlinedIcon />
            </div>
            <div className="numbercart">{cart.length}</div>
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ marginTop: "20px", zIndex: 10000 }}
          >
            <Box p={2} maxWidth={300}>
              <Typography variant="h6">Shopping Cart</Typography>
              {cart.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
              ) : (
                cart.map((item) => (
                  <Box
                    key={item._id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    // border="solid"
                    gap="20px"
                    mb={1}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        // border: "solid",
                      }}
                    >
                      <img
                        style={{ width: "3em", height: "3em" }}
                        src={item.product_image}
                        alt="Product"
                      />

                      <Typography>{item.product_name}</Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <div>
                        <RemoveCircleOutlineRoundedIcon
                          onClick={() => removeFromCart(item._id)}
                        />
                      </div>
                      <Typography>${item.price}</Typography>
                    </div>
                  </Box>
                ))
              )}
              <Button
                variant="contained"
                style={{
                  textDecoration: "none",
                  backgroundColor: "#590404",
                  color: "#fff",
                }}
                fullWidth
                onClick={() => {
                  handlePopoverClose();
                  navigate("/checkout");
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/Payment"
                >
                  Checkout
                </Link>
              </Button>
            </Box>
          </Popover>
        </div>   
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;

