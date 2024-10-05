import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useCart, useDispatch } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

// Create default icon for marker (Leaflet requires this)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function CheckOut({ showModal, handleClose }) {
    const cartItems = useCart();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

    // Address, contact, email state
    const [manualAddress, setManualAddress] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');

    // Location and selected address state
    const [location, setLocation] = useState([22.366393, 91.822945]); // Default location (2no. Gate)
    const [selectedAddress, setSelectedAddress] = useState(''); // To store human-readable address
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [showAlert, setShowAlert] = useState(false); // State for alert visibility
    const [alertMessage, setAlertMessage] = useState(''); // State for alert message

    // Leaflet map event to get user's selected location
    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setLocation([lat, lng]);
                fetchAddress(lat, lng); // Fetch address when location is updated
            },
        });
        return location === null ? null : <Marker position={location}></Marker>;
    }

    // Function to fetch the address from the coordinates using Nominatim API (Reverse Geocoding)
    const fetchAddress = async (lat, lng) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const address = response.data.display_name;
            setSelectedAddress(address);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    // SImulate payment
    const handleConfirmAndPay = () => {
        setLoading(true); // Set loading to true
        setShowAlert(false); // Hide alert

        // Log current cart items before payment
        console.log('Cart items before payment:', sessionStorage.getItem('cart'));

        // Simulate a payment process
        const paymentPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve("Payment successful");
            }, 5000); // Simulate a 5-second payment processing time
        });

        paymentPromise
            .then(() => {
                // Show success message
                setAlertMessage('Your order has been placed!');
                setShowAlert(true);

                // Clear cart items from sessionStorage
                sessionStorage.removeItem('cart');

                // Clear the cart from context state
                dispatch({ type: "CLEAR" }); // Ensure you add a CLEAR case to your reducer

                // Log current cart items after clearing
                console.log('Cart items after clearing:', sessionStorage.getItem('cart'));
            })
            .catch((error) => {
                setAlertMessage('There was an error processing your payment. Please try again.');
                setShowAlert(true);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after processing

                // Wait for 1 seconds before closing the modal and redirecting
                setTimeout(() => {
                    handleClose();
                    navigate('/');
                }, 1000);
            });
    };

    return (
        <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex="-1" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Checkout Summary</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <h6>Your Cart</h6>
                        <ul className="list-group mb-3">
                            {cartItems.map((item) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.name} (x{item.qty})
                                    <span>${item.price * item.qty}</span>
                                </li>
                            ))}

                        </ul>
                        <h6>Total Price: ${totalPrice}</h6>

                        <hr />

                        <h6>Payment Method</h6>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="creditCard" />
                            <label className="form-check-label" htmlFor="creditCard">Credit Card</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" />
                            <label className="form-check-label" htmlFor="paypal">PayPal</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="cashOnDelivery" />
                            <label className="form-check-label" htmlFor="cashOnDelivery">Cash on Delivery</label>
                        </div>

                        <hr />

                        <h6>Confirm Address</h6>

                        <div className="mb-3">
                            {/* Map Section */}
                            <h6>Select Delivery Location on Map:</h6>
                            <div style={{ height: '300px' }}>
                                <MapContainer
                                    center={location}
                                    zoom={13}
                                    style={{ height: '100%', width: '100%' }}
                                    whenCreated={(map) => map.invalidateSize()}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <LocationMarker />
                                </MapContainer>
                            </div>

                            {/* Show selected address from map or manual input */}
                            {selectedAddress && (
                                <div className="mt-3 mb-3">
                                    <h6>Selected Address (from map):</h6>
                                    <p>{selectedAddress}</p>
                                </div>
                            )}

                            <hr />

                            {/* Manual Address Input */}
                            <h6>Or Enter Address Manually:</h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your shipping address"
                                value={manualAddress}
                                onChange={(e) => setManualAddress(e.target.value)}
                            />
                        </div>

                        <hr />

                        {/* Contact and Email */}
                        <h6>Contact Information</h6>
                        <div className="mb-3">
                            <label htmlFor="contact" className="form-label">Contact Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="contact"
                                placeholder="Enter your phone number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Alert Message */}
                        {showAlert && (
                            <div className={`alert ${alertMessage.includes('error') ? 'alert-danger' : 'alert-success'}`} role="alert">
                                {alertMessage}
                            </div>
                        )}

                        {/* Loading Spinner */}
                        {loading && (
                            <div className="d-flex justify-content-center mt-3">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={handleClose}>Close</button>
                        <button type="button" className="btn btn-success" onClick={handleConfirmAndPay} disabled={loading}>
                            {loading ? 'Processing...' : 'Confirm and Pay'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
