import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useCart } from "./ContextReducer";

export default function Cards(props) {
    let dispatch = useDispatch();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const [selectedQty, setSelectedQty] = useState(1);
    const [showFullDesc, setShowFullDesc] = useState(false);

    const handleAddToCart = async () => {
        await dispatch({
            type: "ADD",
            id: props._id,
            name: props.name,
            price: props.finalPrice,
            qty: selectedQty,
            size: size
        });
        console.log(data);
    };

    const toggleFullDesc = () => {
        setShowFullDesc(!showFullDesc);
    };

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
                        <select
                            className="m-2 bg-success text-white rounded"
                            onChange={(e) => setSelectedQty(e.target.value)}
                        >
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select
                            className="m-2 bg-success text-white rounded"
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>
                                    {data}
                                </option>
                            ))}
                        </select>
                        <div className="d-inline fs-5">Total Price</div>
                    </div>
                    <hr />
                    <button
                        className="btn btn-success"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
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
