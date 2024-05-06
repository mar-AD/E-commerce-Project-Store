
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdAddShoppingCart } from "react-icons/md";
import { FaFilter, FaSort } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useCart } from "../../Components/Cart/Cartcontext";
import { useLocation } from "react-router-dom";
import "./Shop.css";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const Shop = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState({
    min: 0,
    max: 20000,
  });
  const { cart, likedProducts, dispatch } = useCart();
  const [likedProductIds, setLikedProductIds] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-project-backend-yec6.onrender.com/v1/allproducts?query=${searchQuery}`
        );
        setProducts(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    const likedIds = likedProducts.map((product) => product._id);
    setLikedProductIds(likedIds);
  }, [likedProducts]);

  const sortProducts = () => {
    let sortedProducts = [...products];

    if (sortBy === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newestArrivals") {
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return sortedProducts;
  };

  const filterProducts = (sortedProducts) => {
    let filteredProducts = [...sortedProducts];

    if (conditionFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.condition === conditionFilter
      );
    }

    if (categoryFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.categoryName === categoryFilter
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRangeFilter.min &&
        product.price <= priceRangeFilter.max
    );

    return filteredProducts;
  };

  const addToCart = (product) => {
    const isProductInCart = cart.some(
      (cartProduct) => cartProduct._id === product._id
    );

    if (!isProductInCart) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

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

  const handleCategoryChange = (newCategory) => {
    setCategoryFilter(newCategory);
    setCurrentCategory(newCategory);
    setVisibleProducts(8);
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navigate = useNavigate();

  const navigateToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="shopy">
      <div className="mt-4">
        <div className="filter-sidebar">
          <label style={{ display: "grid" }}>
            <p
              className="tittle"
              style={{
                marginBottom: "10px",
                fontSize: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Sort By <FaSort />
            </p>
            <select
              className="selects"
              style={{
                padding: "10px 5px",
                borderRadius: "16px",
                marginBottom: "20px",
                fontSize: "1rem",
              }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="priceLowToHigh">Price Low to High</option>
              <option value="priceHighToLow">Price High to Low </option>
              <option value="newestArrivals">Newest Arrivals</option>
            </select>
          </label>

          <label style={{ display: "grid" }}>
            <p
              className="tittle"
              style={{
                marginBottom: "10px",
                fontSize: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Category Filter
              <FaFilter />
            </p>
            <select
              className="selects "
              style={{
                padding: "10px 5px",
                borderRadius: "16px",
                marginBottom: "20px",
                fontSize: "1rem",
              }}
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Furniture & Decor">Furniture & Decor</option>
              <option value="Collectibles & Artifacts">
                Collectibles & Artifacts
              </option>
              <option value="Fashion & Accessories">
                Fashion & Accessories
              </option>
              <option value="Books & More">Books & More</option>
            </select>
          </label>

          <div style={{ display: "grid" }} controlId="priceRangeFilter">
            <label style={{ display: "grid" }}>
              <p className="tittle" style={{ marginBottom: "10px" }}>
                Price Range Filter
              </p>
              <input
                className=".custom-input-range"
                type="range"
                min={0}
                max={20000}
                step={1}
                value={priceRangeFilter.max}
                onChange={(e) =>
                  setPriceRangeFilter({
                    min: 0,
                    max: parseFloat(e.target.value),
                  })
                }
              />
              <span style={{ textAlign: "center", paddingTop: "10px" }}>
                ${priceRangeFilter.min} - ${priceRangeFilter.max}
              </span>
            </label>
          </div>
        </div>
        <div className="forCrdss" >
          {noResults ? (
            <div className="no-results-message" style={{ textAlign: "center" }}>
              <p style={{ fontSize: "35px" }}>
                No products found for "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="product-list">
              {filterProducts(sortProducts())
                .filter(
                  (product) =>
                    currentCategory === "all" ||
                    product.categoryName === currentCategory
                )
                .slice(0, visibleProducts)
                .map((item) => (
                  <div className="card" key={item._id}>
                    <div
                      className="likes-icon"
                      onClick={() => handleFavorite(item)}
                    >
                      {likedProductIds.includes(item._id) ? (
                        <FavoriteRoundedIcon />
                      ) : (
                        <FavoriteBorderRoundedIcon />
                      )}
                    </div>

                    <div
                      className="imageprdcts"
                      onClick={() => navigateToProductDetail(item._id)}
                    >
                      <img
                        className="product--image"
                        src={item.product_image}
                        alt="product image"
                      />
                    </div>

                    <div
                      className="cart-text"
                      onClick={() => navigateToProductDetail(item._id)}
                    >
                      <span className="prdctname">{item.product_name}</span>
                      <p className="ellipsis">{item.short_description}</p>
                      <p className="price">
                        <span style={{ fontSize: "1.5em", color: "#590404" }}>
                          ${Math.floor(item.price)}
                        </span>
                        <span style={{ fontSize: "1em" }}>
                          .{Math.floor((item.price % 1) * 100)}
                        </span>
                      </p>
                    </div>

                    <div className="addbutton">
                      <Button
                        style={{
                          position: "absolute",
                          bottom: "0",
                          right: "0",
                          borderRadius: "8px",
                          border: "none",
                          outline: 0,
                          padding: 5,
                          margin: "10px",
                          backgroundColor: "#590404",
                          color: "#fff",
                          textAlign: "center",
                          cursor: "pointer",
                          fontSize: 14,
                          display: "flex",
                        }}
                        onClick={() => addToCart(item)}
                      >
                        <MdAddShoppingCart style={{ fontSize: "1.5rem" }} />
                        
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {visibleProducts < filterProducts(sortProducts()).length && (
            <Button
              onClick={() =>
                setVisibleProducts((prevVisible) => prevVisible + 8)
              }
              style={{
                margin: "20px auto",
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#590404",
                color: "#fff",
                fontSize: "16px",
                display: "flex",
                cursor: "pointer",
              }}
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
