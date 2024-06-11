// import React from "react";

// export default function Cards(props) {
//     let options = props.options;
//     let priceOptions = Object.keys(options);

//     return (
//         <div>
//             <div
//                 className="card mt-3"
//                 style={{ width: "18rem", maxHeight: "3600 px" }}
//             >
//                 <img
//                     src={props.imgSrc}
//                     className="card-img-top"
//                     alt=""
//                     style={{ height: "240px", objectFit: "fill" }}
//                 ></img>
//                 <div className="card-body">
//                     <h5 className="card-title">{props.foodName}</h5>
//                     <p className="card-text">{props.desc}</p>
//                     <div className="container w-100">
//                         <select className="m-2 h-100 w-33.33 bg-success rounded">
//                             {Array.from(Array(6), (e, i) => {
//                                 return (
//                                     <option key={i + 1} value={i + 1}>
//                                         {i + 1}
//                                     </option>
//                                 );
//                             })}
//                         </select>
//                         <select className="m-2 h-100 w-33.33 bg-success rounded">
//                             {priceOptions.map((data) => {
//                                 return (
//                                     <option key={data} value={data}>
//                                         {data}
//                                     </option>
//                                 );
//                             })}
//                         </select>
//                         <div className="d-inline h-100 fs-5"> Total Price</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useCart } from "./ContextReducer";

export default function Cards(props) {
    const [showFullDesc, setShowFullDesc] = useState(false);

    let dispatch = useDispatch();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setsize] = useState("")

    const handleAddToCart = async () => {
        await dispatch({ type: "ADD", id: props._id, name: props.name, price: props.finalProce, qty: qty, size: size })
        console.log(data)
    }

    const toggleFullDesc = () => {
        setShowFullDesc(!showFullDesc);
    };

    return (
        <div>
            <div
                className="card mt-3 mb-3"
                style={{ width: "18rem", height: "40rem" }}
            >
                <img
                    src={props.imgSrc}
                    className="card-img-top"
                    alt=""
                    style={{ height: "240px", objectFit: "cover" }}
                ></img>
                <div className="card-body" style={{ height: "200px", overflow: "hidden" }}>
                    <h5 className="card-title">{props.foodName}</h5>
                    <p className="card-text">
                        {props.desc.length > 80 ? `${props.desc.substring(0, 80)}...` : props.desc}
                    </p>
                    {props.desc.length > 80 && (
                        <button
                            className="btn btn-link"
                            onClick={toggleFullDesc}
                        >
                            See Full Description
                        </button>
                    )}
                    <div className="container w-100 mt-3">
                        <select className="m-2 h-100 w-33.33 bg-success rounded" onChange={(e) => setsize(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select className="m-2 h-100 w-33.33 bg-success rounded" onChange={(e) => setsize(e.target.value)}>
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>
                                    {data}
                                </option>
                            ))}
                        </select>
                        <div className="d-inline h-100 fs-5"> Total Price</div>
                    </div>
                    <hr></hr>
                    <button
                        className="btn btn-success justify-center ms-2"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
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
        </div>
    );
}
