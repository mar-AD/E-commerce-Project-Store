

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import './ProductDetail.css';
import { useCart } from '../../Components/Cart/Cartcontext';

const ProductDetail = () => {
{const { productId } = useParams();
const navigate = useNavigate();
const { likedProducts, dispatch } = useCart();

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const location = useLocation()

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [location.pathname]);


useEffect(() => {
const fetchProduct = async () => {
    try {
    const response = await axios.get(`https://e-commerce-project-backend-yec6.onrender.com/v1/products/${productId}`);
    setProduct(response.data[0]);
    } catch (error) {
    setError('Error loading product details. Please try again later.');
    } finally {
    setLoading(false);
    }
};

fetchProduct();
}, [productId]);

const handleCreateOrder = async () => {
    try {
        const shippingPrice = 5;
        const token = localStorage.getItem('token');
        const response = await axios.post(
            'https://e-commerce-project-backend-yec6.onrender.com/v1/orders',
            {
                customerId: localStorage.getItem('customerId'),
                orderItems: [product],
                cartTotalPrice: product.price + shippingPrice,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        toast.success('Order placed successfully');
    } catch (error) {
        toast.error('Error creating order');
        console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
};

const handleBuyNow = () => {
    handleCreateOrder();
};

const handleFavorite = async () => {
const isLiked = likedProducts.some((likedProduct) => likedProduct._id === product._id);

if (isLiked) {
    dispatch({ type: 'REMOVE_FROM_LIKED_PRODUCTS', payload: product._id });
} else {
    await dispatch({ type: 'ADD_TO_LIKED_PRODUCTS', payload: product });
}
};

if (loading) {
return <div>Loading...</div>;
}

if (error) {
return <div>{error}</div>;
}

if (!product) {
return <div>No product data available</div>;
}


return (
<div className='card-details'>
    <div className="shoppingcard">
    <img className="proImgg" src={product.product_image} alt={product.product_name} />
    <div className='shoppingcard-details'>
        <div className="nameSku">
        <h1>{product.product_name}</h1>
        <p>{product.sku}</p>
        </div>
        {product.options && product.options.includes('In Stock') ? (
        <p style={{ color: 'green', paddingBottom: '10px', fontWeight: '800' }}>{product.options}</p>
        ) : (
        <p style={{ color: 'red', paddingBottom: '10px' }}>{product.options}</p>
        )}
        <p style={{ paddingBottom: '2rem' }}>{product.long_description}</p>
        <div className='priceee' style={{ paddingBottom: '2rem' }}>
        <span style={{ fontSize: '2em', color: '#590404' }}>${Math.floor(product.price)}</span>
        <span style={{ fontSize: '1.5em' }}>.{Math.floor((product.price % 1) * 100)}</span>
        </div>
        <div className='payment'>
        <p style={{ fontSize: '1rem', paddingBottom: '10px' }}>Payment on delivery</p>
        <p>Shipping fee : $5.00</p>
        </div>

        <div className='cardFooter'>
        <button className='button1' onClick={handleBuyNow}>Buy Now</button>
        <button className='button2' onClick={handleFavorite}>
        {likedProducts.some((p) => p._id === product._id) ? (
            <FavoriteRoundedIcon />
            ) : (
            <FavoriteBorderRoundedIcon />
            )}
        </button>
        </div>
    </div>
    </div>
    <ToastContainer/>
</div>
);}
};

export default ProductDetail;