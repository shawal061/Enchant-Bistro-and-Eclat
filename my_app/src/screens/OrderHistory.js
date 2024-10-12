import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [orderMessage, setOrderMessage] = useState(null);
    const [loadingOrderId, setLoadingOrderId] = useState(null);
    const navigate = useNavigate();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchOrderHistory = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
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
    }, [navigate]);

    useEffect(() => {
        fetchOrderHistory();
    }, [fetchOrderHistory]);

    const handleReorder = async (order) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        setLoadingOrderId(order._id);
        setOrderMessage(null);

        await delay(3000);

        try {
            const response = await axios.post('http://localhost:5000/api/reorder', {
                userId: order.userId,
                items: order.items,
                totalPrice: order.totalPrice,
                address: order.address,
                size: order.size,
            }, {
                headers: {
                    authToken: token,
                },
            });

            if (response.data.success) {
                setOrderMessage({ orderId: order._id, type: 'success', message: 'Reorder successful!' });
                // Proud :')
                // setLoadingOrderId(null);  // Clear loading state after processing
                await delay(3000);
                setOrderMessage(null);
                fetchOrderHistory();  // Refetch order history to update the UI
            }
        } catch (error) {
            console.error('Error reordering:', error);
            setOrderMessage({ orderId: order._id, type: 'error', message: 'Failed to reorder. Please try again.' });
        } finally {
            setLoadingOrderId(null);  // Clear loading state after processing
        }
    };

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (orders.length === 0) {
        return (
            <div className="container mt-5">
                <div className="d-flex align-items-center">
                    <span>
                        <Link to="/">
                            <img
                                src={process.env.PUBLIC_URL + "/logo/Clear Logo.png"}
                                alt="Logo"
                                className="navbar-brand"
                                style={{ maxWidth: "75px", maxHeight: "75px" }}
                            />
                        </Link>
                    </span>
                    <span>
                        <h2 className="text-center" style={{ marginLeft: "425px" }}>Your Order History</h2>
                    </span>
                </div>
                <p>No order history found.</p>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center">
                <span>
                    <Link to="/">
                        <img
                            src={process.env.PUBLIC_URL + "/logo/Clear Logo.png"}
                            alt="Logo"
                            className="navbar-brand"
                            style={{ maxWidth: "75px", maxHeight: "75px" }}
                        />
                    </Link>
                </span>
                <span>
                    <h2 className="text-center" style={{ marginLeft: "425px" }}>Your Order History</h2>
                </span>
            </div>

            {/* Toast-like notification for reorder success/error */}
            {orderMessage && (
                <div className={`alert alert-${orderMessage.type === 'success' ? 'success' : 'danger'} text-center`}>
                    {orderMessage.message}
                </div>
            )}

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
                            disabled={loadingOrderId === order._id}  // Disable button while processing
                        >
                            {loadingOrderId === order._id ? 'Processing...' : 'Reorder'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
