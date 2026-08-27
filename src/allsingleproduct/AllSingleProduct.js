import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../products/Products";
function AllSingleProduct() {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  // بدل axios.get(`https://dummyjson.com/products/${id}`)
  const text = getProductById(id);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCart = () => {
    if (!text) return;

    const product = {
      id: text.id,
      name: text.title,
      price: text.price,
      quantity: quantity,
      image: text.images?.[0] || "",
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart successfully!");
  };

  if (!text) {
    return (
      <main className="single-product-page">
        <div className="container">
          <h2>Product not found</h2>

          <Link to="/Collections">
            Back to Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="single-product-page">
      <div className="container">

        {/* Breadcrumb */}
        <div className="product-breadcrumb">
          <Link to="/">Home</Link>

          <span>/</span>

          <Link to="/Collections">
            Collections
          </Link>

          <span>/</span>

          <span>{text.title}</span>
        </div>

        {/* Product */}
        <div className="single-product-grid">

          {/* Image */}
          <div className="single-product-image">
            <img
              src={text.images?.[0] || ""}
              alt={text.title}
            />
          </div>

          {/* Content */}
          <div className="single-product-content">

            <p className="single-product-category">
              {text.category}
            </p>

            <h1 className="single-product-title">
              {text.title}
            </h1>

            <p className="single-product-price">
              ${text.price}
            </p>

            <p className="single-product-description">
              {text.description}
            </p>

            <div className="product-divider"></div>

            {/* Information */}
            <div className="product-information">

              <div className="product-info-row">
                <span className="product-info-label">
                  Brand
                </span>

                <span className="product-info-value">
                  {text.brand || "N/A"}
                </span>
              </div>

              <div className="product-info-row">
                <span className="product-info-label">
                  Weight
                </span>

                <span className="product-info-value">
                  {text.weight || "N/A"}
                </span>
              </div>

              <div className="product-info-row">
                <span className="product-info-label">
                  Rating
                </span>

                <span className="product-info-value">
                  {text.rating || "N/A"}
                </span>
              </div>

              <div className="product-info-row">
                <span className="product-info-label">
                  Availability
                </span>

                <span className="product-info-value">
                  {text.stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </span>
              </div>

            </div>

            {/* Quantity + Cart */}
            <div className="quantity-cart">

              <div className="quantity-box">

                <button onClick={decreaseQuantity}>
                  −
                </button>

                <span id="quantity">
                  {quantity}
                </span>

                <button onClick={increaseQuantity}>
                  +
                </button>

              </div>

              <button
                className="add-cart-btn"
                onClick={addToCart}
              >
                Add To Cart
              </button>

            </div>

            {/* Extra */}
            <div className="product-extra">

              <div className="product-extra-item">

                <div className="product-extra-icon">
                  ✦
                </div>

                <div>
                  <h4>Handcrafted Quality</h4>

                  <p>
                    Every piece is carefully handcrafted
                    with attention to every detail.
                  </p>
                </div>

              </div>

              <div className="product-extra-item">

                <div className="product-extra-icon">
                  ✦
                </div>

                <div>
                  <h4>Secure Packaging</h4>

                  <p>
                    Your jewelry will arrive safely in our
                    premium luxury packaging.
                  </p>
                </div>

              </div>

              <div className="product-extra-item">

                <div className="product-extra-icon">
                  ✦
                </div>

                <div>
                  <h4>Easy Returns</h4>

                  <p>
                    Enjoy a simple and hassle-free return
                    process for your peace of mind.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default AllSingleProduct;
