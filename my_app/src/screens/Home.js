import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import Carousels from "../components/Carousels";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log("Food Categories:", foodCat);
    console.log("Food Items:", foodItem);
  }, [foodCat, foodItem]);

  return (
    <div>
      <Navbar />

      {/* Add top margin or padding to ensure carousel is below the navbar */}
      <div style={{ marginTop: "5px" }}>
        <Carousels search={search} setSearch={setSearch} />

        {/* Display filtered cards based on search */}
        <div className="container">
          {foodCat.length > 0 &&
            foodCat.map((data) => (
              <div key={data._id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem.length > 0 &&
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Cards
                          foodName={filterItems.name}
                          options={filterItems.options[0]}
                          imgSrc={filterItems.img}
                          desc={filterItems.description}
                        />
                      </div>
                    ))}
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
