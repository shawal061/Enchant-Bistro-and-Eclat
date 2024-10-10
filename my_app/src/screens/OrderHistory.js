import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/login'); // Redirect to login if no token found
                return; // Ensure we exit early if no token
            }

            try {
                const response = await axios.get('http://localhost:5000/api/order-history', {
                    headers: {
                        authToken: token, // Send token in headers
                    },
                });
                // console.log('Order History Response:', response.data);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching order history:', error);
                if (error.response) {
                    setErrorMessage('Error fetching order history. Please try again later.');
                    if (error.response.status === 401) {
                        // Token is invalid or expired
                        localStorage.removeItem('authToken'); // Clear token
                        navigate('/login');
                    }
                } else {
                    setErrorMessage('Network error. Please check your connection.');
                } try {
                    const response = await axios.get('http://localhost:5000/api/order-history', {
                        headers: {
                            authToken: token,
                        },
                    });
                    console.log('Order History Response:', response.data);
                    if (response.data.length === 0) {
                        setErrorMessage('No orders found for this user.');
                    } else {
                        setOrders(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching order history:', error);
                    if (error.response) {
                        setErrorMessage('Error fetching order history. Please try again later.');
                        if (error.response.status === 401) {
                            // Token is invalid or expired
                            localStorage.removeItem('authToken');
                            navigate('/login');
                        }
                    } else {
                        setErrorMessage('Network error. Please check your connection.');
                    }
                }
            }
        };

        fetchOrderHistory();
    }, [navigate]);

    // Handle case when there are no orders
    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (orders.length === 0) {
        return <p>No order history found.</p>;
    }

    return (
        <div className="container mt-5">
            <h2>Your Order History</h2>
            <ul className="list-group mt-4">
                {orders.map((order) => (
                    <li key={order._id} className="list-group-item">
                        <h5>Order Date: {new Date(order.date).toLocaleDateString()}</h5>
                        <p>Total Price: ${order.totalPrice}</p>
                        <p>Delivery Address: {order.address}</p>

                        <h6>Items Ordered:</h6>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    {item.name} (x{item.qty}) - ${item.price} ({item.size})
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
