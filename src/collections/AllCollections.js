import React, { useContext, useState } from "react";
import { apivalue } from "../Data/AllData";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

function PageCollection() {
  const data = useContext(apivalue);

  const { addItem } = useCart();

  const [search, setSearch] = useState("All");

  const getValue = (value) => {
    setSearch(value);
  };

  const filteredCollections = data.filter((item) => {
    if (search === "All") {
      return true;
    }

    return item.category === search;
  });

  return (
    <div>
      <div className="section trending">
        <div className="container">

          {/* Filter */}
          <ul className="trending-filter">

            <li>
              <button onClick={() => getValue("All")}>
                All
              </button>
            </li>

            <li>
              <button onClick={() => getValue("Rings")}>
                Rings
              </button>
            </li>

            <li>
              <button onClick={() => getValue("Necklaces")}>
                Necklaces
              </button>
            </li>

            <li>
              <button onClick={() => getValue("Bracelets")}>
                Bracelets
              </button>
            </li>

          </ul>

          {/* Products */}
          <div className="row trending-box">

            {filteredCollections.map((item) => (
              <div
                key={item.id}
                className="col-lg-4 col-md-6 align-self-center mb-30 trending-items"
              >

                <div className="item">

                  {/* Product Image */}
                  <div className="thumb">

                    {/* ✅ FIXED: كان /AllSingleProduct/... وده مش مطابق للـRoute المسجّل */}
                    <Link to={`/SingleProduct/${item.id}`}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                      />
                    </Link>

                    <span className="price">
                      <em>${item.price}</em>
                    </span>

                    <span className="id">
                      <em>{item.id}</em>
                    </span>

                  </div>

                  {/* Product Information */}
                  <div className="down-content">

                    <span className="category">
                      {item.category}
                    </span>

                    <h4>{item.title}</h4>

                    {/* View Details */}
                    {/* ✅ FIXED: كان /AllSingleProduct/... وده مش مطابق للـRoute المسجّل */}
                    <Link
                      className="view-details-btn"
                      to={`/SingleProduct/${item.id}`}
                    >
                      View Details
                    </Link>

                    {/* Add To Cart */}
                    <button
                      onClick={() => addItem(item)}
                    >
                      Add to cart
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}

function AllCollection() {
  return <PageCollection />;
}

export default AllCollection;