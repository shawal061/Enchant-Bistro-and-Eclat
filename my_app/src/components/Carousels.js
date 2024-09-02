import React from "react";
import '../css/searchbar.css';

export default function Carousels({ search, setSearch }) {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "cover !important" }}
      >
        <div className="carousel-inner" id="carousel">

          {/* Carousel Image 1 */}
          <div className="carousel-item active">
            <img
              src={`${process.env.PUBLIC_URL}/carousel/11.avif`}
              className="d-block w-100 container-fluid"
              style={{ objectFit: "contain", width: "100%", maxHeight: "450px" }}
              alt="..."
            />
          </div>

          {/* Carousel Image 2 */}
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/carousel/22.avif`}
              className="d-block w-100 container-fluid"
              style={{ objectFit: "contain", width: "100%", maxHeight: "450px" }}
              alt="..."
            />
          </div>

          {/* Carousel Image 3 */}
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/carousel/33.avif`}
              className="d-block w-100 container-fluid"
              style={{ objectFit: "contain", width: "100%", maxHeight: "450px" }}
              alt="..."
            />
          </div>

          {/* Carousel Image 4 */}
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/carousel/44.avif`}
              className="d-block w-100 container-fluid"
              style={{ objectFit: "contain", width: "100%", maxHeight: "450px" }}
              alt="..."
            />
          </div>

          {/* Carousel Image 5 */}
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/carousel/55.avif`}
              className="d-block w-100 container-fluid"
              style={{ objectFit: "contain", width: "100%", maxHeight: "450px" }}
              alt="..."
            />
          </div>
          {/* Add more carousel items if needed */}

        </div>

        {/* Search Bar */}
        <div className="carousel-caption" style={{ zIndex: "10" }}>
          <div className="input-coverer">
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
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </>
  );
}
