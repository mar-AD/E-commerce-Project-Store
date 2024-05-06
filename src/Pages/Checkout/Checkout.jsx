
import React, { useEffect }from 'react';
import { useCart } from '../../Components/Cart/Cartcontext';
import './Checkout.css'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const { cart, dispatch } = useCart();
  
    const removeFromCart = (productId) => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };
  
    const totalSum = cart.reduce((sum, item) => sum + item.price, 0);
    const shippingPrice = 5;
    const totalPrice = totalSum + shippingPrice;
    useEffect(() => {
        const customerId = localStorage.getItem('customerId');
    }, []);
    const handleCreateOrder = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
        'https://e-commerce-project-backend-yec6.onrender.com/v1/orders',
        {
            customerId: localStorage.getItem('customerId'),
            orderItems: cart,
            cartTotalPrice: totalPrice,
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
    const location = useLocation()

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [location.pathname]);
    
    return (
        <div className='checkout-page'>
            <div className="desc-product">
        {cart.length === 0 ? (
            <p>Your cart is empty.</p>
            ) : (
            <div>
                <ul>
                {cart.map((item) => (
                    <li className='checkout-products-list' key={item._id}>
                    <img className='product-image' src={item.product_image} alt="" />
                    <div className='product-details'>
                        <h3>{item.product_name}</h3>
                        <p>{item.long_description}</p>
                    </div>
                    <div className='product-price'>
                        ${item.price}
                    </div>
                    <div className='product-remove'>
                    <IconButton
                    onClick={() => removeFromCart(item._id)}
                    color="secondary"
                    aria-label="remove"
                    style={{ color: '#590404' }}
                    >
                    <DeleteIcon />
                    </IconButton>
                </div>
                    </li>
                ))}
                </ul>
            </div>
            )}
            </div>
            <div className='checkout-summary'>
                <h2>Order Summary:</h2>
            <div className='summary-item'>
                <span>Products Total:</span>
                <span>${totalSum.toFixed(2)}</span>
            </div>
            <div className='summary-item'>
                <span>Shipping:</span>
                <span>${shippingPrice.toFixed(2)}</span>
            </div>
            <div className='summary-item total'>
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className='payment-method'>
                <h2>Payment on delivery</h2>
            </div>
            <div className='payment-btn'>
                <button onClick={handleCreateOrder}>Pay Now</button>
            </div>
        </div>
        <ToastContainer/>
        </div>
        )
};

export default Checkout;