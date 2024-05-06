import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import testslide from "../../assets/testslide.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Carouselprdct from "react-multi-carousel";
import Carouselreviews from "react-multi-carousel";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

import "react-multi-carousel/lib/styles.css";
import { reviewsData } from "./data";
import firstcategorie from "../../assets/decodeco.png";
import secondcategorie from "../../assets/artifcollec.jpg";
import tirthcategorie from "../../assets/accessor.png";
import fourthcategorie from "../../assets/bookscateg.jpg";
import image from "../../assets/desinfinal.png";

import { useCart } from "../../Components/cart/cartcontext";
// import { useLike } from "../../Components/like/likecontext";

import Card from "../../Components/Card/card/mycard";
import Carousel from "../../Components/Card/Carousel";

// Our collection slide********************************************

import camera from "../../assets/camera.png";
import phone from "../../assets/phone.png";
import gramo from "../../assets/gramo.png";
import clocks from "../../assets/clocks.png";
import radio from "../../assets/radio.png";
import koora from "../../assets/koora.png";
import dactylo from "../../assets/dactyloo.png";
import dactyl from "../../assets/dactylo.png";
import grp from "../../assets/bg.png";

//last section *********************************************************

import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import DiscountRoundedIcon from "@mui/icons-material/DiscountRounded";

const HomePage = () => {
  // const { dispatch: cartDispatch } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { cart, likedProducts, dispatch } = useCart();
  const carouselRef = useRef(null);
  const [likedProductIds, setLikedProductIds] = useState([]);
  const [productData, setProductData] = useState([]);
  let cards = [
    {
      key: 1,
      content: <Card imagen={dactyl} />,
    },
    {
      key: 2,
      content: <Card imagen={grp} />,
    },
    {
      key: 3,
      content: <Card imagen={camera} />,
    },
    {
      key: 4,
      content: <Card imagen={gramo} />,
    },
    {
      key: 5,
      content: <Card imagen={clocks} />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-project-backend-yec6.onrender.com/v1/allproducts/"
        );
        if (response.status === 200) {
          setProductData(response.data);
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    const isProductInCart = cart.some(
      (cartProduct) => cartProduct._id === product._id
    );

    if (!isProductInCart) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  useEffect(() => {
    const likedIds = likedProducts.map((product) => product._id);
    setLikedProductIds(likedIds);
  }, [likedProducts]);

  const handleFavorite = async (product) => {
    const isLiked = likedProductIds.includes(product._id);

    if (isLiked) {
      dispatch({ type: "REMOVE_FROM_LIKED_PRODUCTS", payload: product._id });
      setLikedProductIds((prevIds) =>
        prevIds.filter((id) => id !== product._id)
      );
    } else {
      await dispatch({ type: "ADD_TO_LIKED_PRODUCTS", payload: product });
      setLikedProductIds((prevIds) => [...prevIds, product._id]);
    }
  };


  const navigateToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const product = productData.map((item) => (
    <div className="cardd" key={item._id}>
      <div className="likes-iconn" onClick={() => handleFavorite(item)}>
        {likedProductIds.includes(item._id) ? (
          <FavoriteRoundedIcon />
        ) : (
          <FavoriteBorderRoundedIcon />
        )}
      </div>
      <div className="imageprdctss">
        <img
          className="product--imagee"
          src={item.product_image}
          alt="product image"
        />
      </div>
      <div className="cart-textt">
        <span
          className="prdctnamee"
          onClick={() => navigateToProductDetail(item._id)}
        >
          {item.product_name}
        </span>
        <p
          className="desc_ellipsis"
          onClick={() => navigateToProductDetail(item._id)}
        >
          {item.short_description}
        </p>
        <div className="pricee">
          <div
            className="realprice"
            onClick={() => navigateToProductDetail(item._id)}
          >
            ${item.price}
          </div>
          <div className="addbuttonn">
            <Button
              style={{
                borderRadius: 8,
                outline: 0,
                padding: 5,
                backgroundColor: "#590404",
                color: "#fff",
                textAlign: "center",
                cursor: "pointer",
                fontSize: 14,
              }}
              onClick={() => addToCart(item)}
            >
              <AddShoppingCartRoundedIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  ));

  const Reviews = (props) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <span
            key={i}
            className={i <= props.stars ? "star-filled" : "star-empty"}
            style={{ padding: 0, fontSize: "1.4rem" }}
          >
            ★
          </span>
        );
      }
      return stars;
    };

    return (
      <div className="cardreviews">
        <img className="reviews--image" src={props.image} alt="product image" />
        <div className="cart-reviews">
          <span>{props.name}</span>
          <p>{props.description}</p>
          <div className="rating">{renderStars()}</div>
        </div>
      </div>
    );
  };

  const reviews = reviewsData.map((item) => (
    <Reviews
      key={item.id}
      name={item.name}
      image={item.image}
      description={item.description}
      stars={item.rating}
    />
  ));

  /***************CATEGORY_Carousel*****************/

  const categories = [
    {
      id: 1,
      title: "Furniture & Decor",
      description: "Explore antiques furniture, decor, and timeless elegance.",
      imageUrl: firstcategorie,
    },
    {
      id: 1,
      title: "Collectibles & Artifacts",
      description:
        "Discover collectibles, artifacts & more with captivating stories.",
      imageUrl: secondcategorie,
    },
    {
      id: 1,
      title: "Fashion & Accessories",
      description: "Adorn yourself with vintage timepieces and jewelry.",
      imageUrl: tirthcategorie,
    },
    {
      id: 1,
      title: "Books & More",
      description:
        "Bring the past home with retro kitchenware and classic tools.",
      imageUrl: fourthcategorie,
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Topcollection***************************************************************/
  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrevious = () => {
    carouselRef.current.previous();
  };

  const location = useLocation()

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <div className="section-home">
        <div className="half-home">
          <div className="home-one">
            <div className="one-title">
              <div className="titlesection">
                <h3>Vintage Flair for Modern Living</h3>
              </div>
              <div className="txthomeone">
                <p>
                  Whether you're a history enthusiast, a collector, or someone
                  seeking to add a touch of vintage flair to your space, our
                  store is a haven for those who appreciate the beauty of
                  antiquity.
                </p>
              </div>
              <div className="discoverbutton">
                <Link to="/Shop">
                  {" "}
                  <Button
                    style={{
                      padding: "px",
                      borderRadius: "12px",
                      marginTop: "10px",
                      backgroundColor: "#f9e9c8",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#590404",
                      cursor: "pointer",
                    }}
                  >
                    Discover Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="home-two">
            <img className="background" src={image} alt="" />
            <img className="testslide" src={testslide} alt="" />
            <img className="magana" src={clocks} alt="" />
            <img className="radio" src={radio} alt="" />
            <img className="camera" src={camera} alt="" />
            <img className="koora" src={koora} alt="" />
            <img className="phone" src={phone} alt="" />
            <img className="dactylo" src={dactylo} alt="" />
          </div>
        </div>

        {/* category-carousel********************************/}

        <div className="category-carousel">
          <div className="category-title">
            <span>Browse By Category</span>
            <p></p>
          </div>
          <div className="carousel-container">
            {categories.map((category, index) => (
              <div
                className={`category-card ${
                  index === currentIndex ? "activecard" : ""
                }`}
              >
                <img src={category.imageUrl} alt={`Product ${index + 1}`} />
                <div className="category-info">
                  <span>{category.title}</span>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(89, 5, 5,0.7)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(89, 5, 5,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(89, 5, 5,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#590404" />
            </g>
          </svg>
        </div>
      </div>

      {/* new arrivals*********************************************/}

      <div className="section-carousel">
        <span>New Arrivals</span>
        <Carouselprdct
          additionalTransfrom={0}
          arrows
          autoPlay
          dotListClass=""
          renderDotsOutside={true}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 1500 },
              items: 5,
              slidesToSlide: 2,
            },
            desktop: {
              breakpoint: { max: 1500, min: 800 },
              items: 4,
            },
            tablet: {
              breakpoint: { max: 800, min: 600 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 600, min: 0 },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {product}
        </Carouselprdct>
      </div>

      {/* cards******************************************************/}

      <div className="topcollection">
        <div className="text">
          <span>
            Step Back In Time and Explore Our Collection Of Vintage Treasures
          </span>
          <p>
            Experience the charm and elegence of bygone eras with our antique
            collection
          </p>
        </div>
        <div className="textslider">
          <Carousel
            cards={cards}
            height="500px"
            width="80%"
            margin="10px auto"
            offset={2}
            showArrows={false}
          />
        </div>
      </div>

      {/* Our Best Product *****************************/}

      <div className="section-carousel">
        <span>Our Best Product</span>
        <Carouselprdct
          additionalTransfrom={0}
          arrows
          autoPlay
          dotListClass=""
          renderDotsOutside={true}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 1500 },
              items: 5,
              slidesToSlide: 2,
            },
            desktop: {
              breakpoint: { max: 1500, min: 800 },
              items: 4,
            },
            tablet: {
              breakpoint: { max: 800, min: 600 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 600, min: 0 },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {product}
        </Carouselprdct>
      </div>

      {/* Reviews ****************************************************************/}

      <div className="reviewsection">
        <div className="title-reviews">
          <div className="secondtitle">
            <div>
              <FontAwesomeIcon
                className="iconfafa"
                icon={faQuoteLeft}
                style={{ color: "#ffffff", fontSize: "4em" }}
              />
            </div>

            <span>What Our Customers Say</span>
          </div>
          <div className="outsidebutton">
            <button onClick={handlePrevious}>
              <ArrowBackIosNewRoundedIcon />
            </button>
            <button onClick={handleNext}>
              <ArrowForwardIosRoundedIcon />
            </button>
          </div>
        </div>
        <div className="caroureviews">
          <Carouselreviews
            additionalTransfrom={0}
            arrows={false}
            centerMode={false}
            ref={carouselRef}
            partialVisible
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside
            renderDotsOutside={false}
            responsive={{
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 1500 },
                items: 5,
                slidesToSlide: 2,
              },
              desktop: {
                breakpoint: { max: 1500, min: 800 },
                items: 2,
                partialVisibilityGutter: 60,
              },
              tablet: {
                breakpoint: { max: 800, min: 600 },
                items: 2,
              },
              mobile: {
                breakpoint: { max: 600, min: 0 },
                items: 1,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {reviews}
          </Carouselreviews>
        </div>
        <div className="outsidebutton2">
          <button onClick={handlePrevious}>
            <ArrowBackIosNewRoundedIcon />
          </button>
          <button onClick={handleNext}>
            <ArrowForwardIosRoundedIcon />
          </button>
        </div>
      </div>

      {/* About our store **********************************************/}

      <div>
        <div className="services-title">
          <span>Why You Picking Us</span>
        </div>
        <div className="lastsection">
          <div className="infos-item">
            <div className="cardfontc">
              <div className="servicesicons">
                <HeadsetMicRoundedIcon style={{ fontSize: "4em" }} />
              </div>
              <h2>24/7 Days</h2>
              <span>Always here for you, anytime you need assistance.</span>
            </div>
          </div>
          <div className="infos-item">
            <div className="cardfontc">
              <div className="servicesicons">
                <MonetizationOnRoundedIcon style={{ fontSize: "4em" }} />
              </div>
              <h2>Money Return</h2>
              <span>Shop worry-free with our 100% money-back guarantee.</span>
            </div>
          </div>
          <div className="infos-item">
            <div className="cardfontc">
              <div className="servicesicons">
                <LocalShippingRoundedIcon style={{ fontSize: "4em" }} />
              </div>
              <h2>Free Delivery</h2>
              <span>Benefit from cost-free and dependable delivery.</span>
            </div>
          </div>
          <div className="infos-item">
            <div className="cardfontc">
              <div className="servicesicons">
                <DiscountRoundedIcon style={{ fontSize: "4em" }} />
              </div>
              <h2>Order Discount</h2>
              <span>Unlock savings with exclusive order discounts.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
