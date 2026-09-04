import React from "react";
import { CartProvider, useCart } from "react-use-cart";
import "./Style.css";

function Cart() {
  const {
    items,
    updateItemQuantity,
    removeItem,
    totalItems,
    totalUniqueItems,
    cartTotal,
    isEmpty,
    emptyCart,
  } = useCart();

  return (
    <main className="page">
      <section className="shopping-cart dark">
        <div className="container">

          <div className="block-heading">
            <h2>Shopping Cart</h2>
          </div>

          <div className="content">
            <div className="cart-layout">

              {/* =========================
                  CART ITEMS
              ========================== */}
              <div className="items">

                {isEmpty ? (
                  <div className="text-center">
                    <h3>Your Cart Is Empty</h3>
                  </div>
                ) : (
                  items.map((item) => (
                    <div className="product" key={item.id}>

                      <div className="product-row">

                        {/* IMAGE */}
                        <div className="col-md-3">
                          <img
                            className="image"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        </div>

                        {/* PRODUCT DATA */}
                        <div className="info">

                          <div className="info-row">

                            {/* PRODUCT NAME */}
                            <div className="product-name">

                              <h4>
                                {item.title}
                              </h4>

                              <div className="product-info">

                                <div>
                                  Category:
                                  <span className="value">
                                    {" "}
                                    {item.category}
                                  </span>
                                </div>

                                <div>
                                  Brand:
                                  <span className="value">
                                    {" "}
                                    {item.brand}
                                  </span>
                                </div>

                                <div>
                                  Weight:
                                  <span className="value">
                                    {" "}
                                    {item.weight}
                                  </span>
                                </div>

                              </div>

                            </div>

                            {/* QUANTITY */}
                            <div className="quantity">

                              <label
                                htmlFor={`quantity-${item.id}`}
                              >
                                Quantity:
                              </label>

                              <input
                                id={`quantity-${item.id}`}
                                type="number"
                                min="1"
                                max={item.stock}
                                value={item.quantity}
                                onChange={(e) => {
                                  const quantity = Number(
                                    e.target.value
                                  );

                                  if (
                                    quantity >= 1 &&
                                    quantity <= item.stock
                                  ) {
                                    updateItemQuantity(
                                      item.id,
                                      quantity
                                    );
                                  }
                                }}
                                className="quantity-input"
                              />

                              <small>
                                Available: {item.stock}
                              </small>

                            </div>

                            {/* PRICE */}
                            <div className="price">

                              <span>
                                $
                                {(
                                  Number(item.price) *
                                  Number(item.quantity)
                                ).toFixed(2)}
                              </span>

                              <br />

                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(item.id)
                                }
                                className="btn-danger"
                              >
                                Remove
                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>
                  ))
                )}

              </div>

              {/* =========================
                  SUMMARY
              ========================== */}
              <div className="summary">

                <h3>Summary</h3>

                {/* TOTAL ITEMS */}
                <div className="summary-item">
                  <span className="text">
                    Items
                  </span>

                  <span className="price">
                    {totalItems}
                  </span>
                </div>

                {/* UNIQUE PRODUCTS */}
                <div className="summary-item">
                  <span className="text">
                    Unique Products
                  </span>

                  <span className="price">
                    {totalUniqueItems}
                  </span>
                </div>

                {/* SUBTOTAL */}
                <div className="summary-item">
                  <span className="text">
                    Subtotal
                  </span>

                  <span className="price">
                    ${Number(cartTotal).toFixed(2)}
                  </span>
                </div>

                {/* DISCOUNT */}
                <div className="summary-item">
                  <span className="text">
                    Discount
                  </span>

                  <span className="price">
                    $0.00
                  </span>
                </div>

                {/* SHIPPING */}
                <div className="summary-item">
                  <span className="text">
                    Shipping
                  </span>

                  <span className="price">
                    $0.00
                  </span>
                </div>

                {/* TOTAL */}
                <div className="summary-item">
                  <span className="text">
                    Total
                  </span>

                  <span className="price">
                    ${Number(cartTotal).toFixed(2)}
                  </span>
                </div>

                {/* CHECKOUT */}
                <button
                  type="button"
                  className="btn-primary"
                  disabled={isEmpty}
                >
                  Checkout
                </button>

                {/* EMPTY CART */}
                {!isEmpty && (
                  <button
                    type="button"
                    onClick={emptyCart}
                    className="btn-danger"
                    style={{ marginTop: "10px" }}
                  >
                    Empty Cart
                  </button>
                )}

              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}


/* ==========================================
   CART PROVIDER
========================================== */

function AllCart() {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
}

export default AllCart;