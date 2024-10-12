import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useCart } from "./ContextReducer";
import { useNavigate } from 'react-router-dom';

export default function Cards(props) {
    let dispatch = useDispatch();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [size, setSize] = useState("");
    const [selectedQty, setSelectedQty] = useState(1);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        const newItem = {
            id: props._id,
            name: props.foodName,
            price: finalPrice,
            qty: parseInt(selectedQty),
            size: size,
            img: props.imgSrc
        };

        // Dispatch the new item to the cart
        await dispatch({
            type: "ADD",
            ...newItem
        });

        // Log the newly added item
        console.log("Added item:", newItem);
        console.log("Already in Cart", data);
        //alert("Item added to cart")

        // Show the "Item added to cart" message
        setShowAddedMessage(true);

        // Hide the message after 2 seconds
        setTimeout(() => {
            setShowAddedMessage(false);
        }, 2000);
    };

    const toggleFullDesc = () => {
        setShowFullDesc(!showFullDesc);
    };

    const priceRef = useRef();
    let finalPrice = selectedQty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div className="mb-4">
            <div className="card mt-3 mb-3" style={{ width: "100%", height: "600px" }}>
                <img
                    src={props.imgSrc}
                    className="card-img-top"
                    alt={props.foodName}
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body" style={{ height: "200px", overflow: "hidden" }}>
                    <h5 className="card-title">{props.foodName}</h5>
                    <p className="card-text">
                        {props.desc.length > 80 ? `${props.desc.substring(0, 80)}...` : props.desc}
                    </p>
                    {props.desc.length > 80 && (
                        <button
                            className="btn btn-link p-0"
                            onClick={toggleFullDesc}
                        >
                            See Full Description
                        </button>
                    )}
                    <div className="container w-100 mt-3">
                        {/* Quantity input */}
                        <input
                            type="number"
                            className="m-2"
                            value={selectedQty}
                            onChange={(e) => setSelectedQty(e.target.value)}
                            min="1"
                            style={{
                                width: "50px",
                                height: "38px",
                                padding: "5px",
                                textAlign: "center",
                                borderRadius: "4px",
                            }}
                        />

                        {/* Size selection dropdown */}
                        <select
                            className="m-2"
                            onChange={(e) => setSize(e.target.value)}
                            ref={priceRef}
                            style={{
                                width: "100px",
                                height: "38px",
                                padding: "5px",
                                textAlign: "center",
                                borderRadius: "4px",
                            }}
                        >
                            {priceOptions.map((data) => (
                                <option key={data} value={data} style={{ textAlign: "left" }}>
                                    {data}
                                </option>
                            ))}
                        </select>
                        <div className="d-inline fs-5 fw-bold">${finalPrice}/-</div>
                    </div>
                    <hr />
                    {localStorage.getItem("authToken") ? (
                        <>
                            <button
                                className="btn btn-success"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            {showAddedMessage && (
                                <div className="alert alert-success mt-3" role="alert">
                                    Item added to cart!
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            className="btn btn-success"
                            onClick={() => { navigate("/login") }}
                        >
                            Login to add to your cart
                        </button>
                    )}
                </div>
            </div>
            {showFullDesc && (
                <Modal
                    show={showFullDesc}
                    onHide={toggleFullDesc}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{props.foodName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={props.imgSrc}
                            className="card-img-top"
                            alt={props.foodName}
                            style={{ height: "250px", objectFit: "contain" }}
                        />
                        <p>{props.desc}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleFullDesc}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}
