import React from "react";

export default function Carousels() {
  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "container !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button
                className="btn btn-outline-success text-white bg-success"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="https://shorturl.at/jqIP2"
              className="d-block w-100"
              style={{ objectFit: "cover", maxHeight: "450px" }}
              alt="..."
            ></img>
          </div>
          <div className="carousel-item">
            <img
              src="https://shorturl.at/eqzAH"
              className="d-block w-100"
              style={{ objectFit: "cover", maxHeight: "450px" }}
              alt="..."
            ></img>
          </div>
          <div className="carousel-item">
            <img
              src="https://shorturl.at/tRX28"
              className="d-block w-100"
              style={{ objectFit: "cover", maxHeight: "450px" }}
              alt="..."
            ></img>
          </div>

        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
