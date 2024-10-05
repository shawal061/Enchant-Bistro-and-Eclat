import React, { useState } from "react";
import { useCart, useDispatch } from "../components/ContextReducer";
import { Link } from "react-router-dom";
import CheckOut from "./CheckOut";

export default function Cart() {
    const cartItems = useCart();
    const dispatch = useDispatch();

    // Modal state to show/hide
    const [showModal, setShowModal] = useState(false);

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + (item.price || 0) * (item.qty || 1), 0);

    // Handle removing item from cart
    const handleRemoveFromCart = (id, size) => {
        dispatch({ type: "REMOVE", id, size });
    };

    // Handle quantity change
    const handleQuantityChange = (id, size, qty) => {
        if (parseInt(qty) > 0) {
            dispatch({ type: "UPDATE_QTY", id, qty: parseInt(qty), size });
        }
    };

    return (
        <div className="container mt-5">
            <Link to="/" style={{ display: 'inline-block' }}>
                <img
                    src={process.env.PUBLIC_URL + "/logo/Clear Logo.png"}
                    alt="Logo"
                    className="navbar-brand"
                    style={{ maxWidth: "75px", maxHeight: "75px" }}
                />
            </Link>
            <h2>My Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row mt-3">
                    <div className="col-12">
                        <ul className="list-group">
                            {cartItems.map((item) => (
                                <li key={item.id} className="list-group-item">
                                    <div className="d-flex justify-content-between align-items-center">
                                        {/* Food Image */}
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            style={{
                                                width: "250px",
                                                height: "150px",
                                                objectFit: "cover",
                                                marginRight: "10px",
                                                borderRadius: "4px",
                                            }}
                                        />

                                        {/* Item Details */}
                                        <div className="flex-grow-1">
                                            <h5>{item.name}</h5>
                                            <p>Size: {item.size}</p>
                                            <p>Price: ${item.price}</p>
                                            <p>Quantity: {item.qty}</p>
                                        </div>

                                        {/* Quantity Input */}
                                        <div className="d-flex align-items-center">
                                            <label htmlFor="quantity" className="me-2">Quantity:</label>
                                            <input
                                                type="number"
                                                value={item.qty}
                                                onChange={(e) => handleQuantityChange(item.id, item.size, e.target.value)} // Pass size here
                                                className="form-control"
                                                min="1"
                                                style={{ width: "60px" }}
                                            />
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            className="btn btn-danger ms-3"
                                            onClick={() => handleRemoveFromCart(item.id, item.size)} // Pass the size here
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-12 mt-4 d-flex flex-column align-items-end">
                        <h4>Total Price: ${totalPrice}</h4>
                        <button className="btn btn-success mt-2" onClick={() => setShowModal(true)}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
            {/* Checkout Modal */}
            {showModal && (
                <CheckOut
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
