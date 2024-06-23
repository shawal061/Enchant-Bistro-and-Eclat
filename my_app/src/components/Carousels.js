import React from "react";
import '../css/searchbar.css';

export default function Carousels({ search, setSearch }) {
  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "container !important" }}
      >
        <div className="carousel-inner" id="carousel">

          {/* Carousel Image 1 */}
          <div className="carousel-item active">
            <img
              src={`${process.env.PUBLIC_URL}/carousel/1.jpg`}
              className="d-block w-100"
              style={{ objectFit: "cover", maxHeight: "450px" }}
              alt="..."
            />
          </div>

          {/* Carousel Image 2 */}
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/carousel/2.jpg`}
              className="d-block w-100"
              style={{ objectFit: "cover", maxHeight: "450px" }}
              alt="..."
            />
          </div>

          {/* Carousel Image 3 */}
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/carousel/3.jpg`}
              className="d-block w-100"
              style={{ objectFit: "cover", maxHeight: "450px" }}
              alt="..."
            />
          </div>

          {/* Add more carousel items if needed */}

        </div>

        {/* Search Bar */}
        <div className="carousel-caption" style={{ zIndex: "10" }}>
          <div className="input-container">
            <input
              className="input"
              name="text"
              type="text"
              placeholder="Search for what you are craving right now!"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
