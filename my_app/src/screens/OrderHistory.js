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
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/order-history', {
                    headers: {
                        authToken: token,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching order history:', error);
                if (error.response) {
                    setErrorMessage('Error fetching order history. Please try again later.');
                    if (error.response.status === 401) {
                        localStorage.removeItem('authToken');
                        navigate('/login');
                    }
                } else {
                    setErrorMessage('Network error. Please check your connection.');
                }
            }
        };

        fetchOrderHistory();
    }, [navigate]);

    // Handle reorder button click (send request to reorder the same items)
    const handleReorder = async (order) => {
        console.log('Reordering for order ID:', order);
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/reorder', {
                userId: order.userId, // Include the userId, fetched from the current order
                items: order.items,   // Send the same items
                totalPrice: order.totalPrice,
                address: order.address,
                size: order.size,
            }, {
                headers: {
                    authToken: token, // Pass the token to authenticate the reorder request
                },
            });

            if (response.data.success) {
                alert('Reorder successful!');
            }
        } catch (error) {
            console.error('Error reordering:', error);
            alert('Failed to reorder. Please try again.');
        }
    };

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (orders.length === 0) {
        return (
            <div className="container mt-5">
                <h2 className="text-center mb-4">Your Order History</h2>
                <p>No order history found.</p>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Your Order History</h2>
            <ul className="list-group">
                {orders.map((order) => (
                    <li key={order._id} className="list-group-item mb-3 shadow-sm p-3">
                        <div className="order-summary">
                            <h5 className="mb-3">Order Date: {new Date(order.date).toLocaleDateString()}</h5>
                            <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                            <p><strong>Delivery Address:</strong> {order.address}</p>
                        </div>

                        <div className="order-items">
                            <h6>Items Ordered:</h6>
                            <ul className="list-group mb-3">
                                {order.items.map((item, index) => (
                                    <li key={index} className="list-group-item">
                                        {item.name} (x{item.qty}) - ${item.price} ({item.size || 'N/A'})
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Reorder Button */}
                        <button
                            className="btn btn-success"
                            onClick={() => handleReorder(order)}
                        >
                            Reorder
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
