import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

const ShopCategory = () => {
  const router = useRouter();
  const { type } = router.query;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  //-------------------------------------------------------
  // State for shopping cart - Local storage spremanje kosarice
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  //-------------------------------------------------------
  // State for shopping cart side panel
  const [isPanelOpen, setPanelOpen] = useState(false);

  // Function for updating useState
  const cartState = () => {
    setPanelOpen(!isPanelOpen);
  };
  //-------------------------------------------------------
  // Product erase from chart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (type) {
      fetch(`http://localhost:8080/api/products/type/${type}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
  }, [type]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedProduct]);

  return (
    <>
      <div className="shopCategory">
        <div className="c-container">
          <Navbar />

          <div className="shopCategory__content">
            <div className="shopCategory__head">
              <h1 className="shopCategory__title">
                {type?.toUpperCase()} GUITARS
              </h1>
              <FiShoppingCart
                className="shopCategory__cart"
                onClick={cartState}
              />
              {cart.length > 0 && (
                <span className="shopCategory__badge">{cart.length}</span>
              )}
            </div>

            {products.length > 0 ? (
              <div className="shopCategory__grid">
                {products.map((product) => (
                  <div
                    className="shopCategory__card"
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`http://localhost:8080${product.images[0].imagePath}`}
                        alt={`${product.brand} ${product.model}`}
                        className="shopCategory__image"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                    <h3 className="shopCategory__title3">
                      {product.brand} - {product.model}
                    </h3>
                    <p className="shopCategory__type">Type: {product.type}</p>
                    <p className="shopCategory__price">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(parseFloat(product.price))}
                    </p>
                    <Button
                      label="BUY"
                      type="button"
                      modifier="buyProduct"
                      onClick={(e) => {
                        e.stopPropagation(); //  ovo sprečava da klik ide na parent
                        addToCart(product);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
        {/* OVDJE IDE PANEL KOŠARICE */}
        {isPanelOpen && (
          <div className="shopCategory__panel">
            <div className="shopCategory__panelHead">
              <h3 className="shopCategory__panelTitle">YOUR SHOPPING CART</h3>
              <CgClose
                className="shopCategory__close"
                onClick={() => setPanelOpen(false)}
              />
            </div>
            <div className="shopCategory__products">
              {cart.length === 0 ? (
                <p>Your shopping cart</p>
              ) : (
                <>
                  <ol>
                    {cart.map((item, index) => (
                      <li className="shopCategory__listLi" key={index}>
                        {item.brand} - {item.model} =
                        <span className="shopCategory__cartPrice">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(parseFloat(item.price))}
                        </span>
                        <CgClose
                          className="shopCategory__closeProduct"
                          onClick={() => removeFromCart(item.id)}
                        />
                      </li>
                    ))}
                  </ol>
                  <div className="shopCategory__total">
                    Total:{" "}
                    <span className="shopCategory__totalPrice">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        cart.reduce(
                          (acc, item) => acc + parseFloat(item.price),
                          0
                        )
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
            <Button
              label="Proceed to delivery info"
              type="button"
              modifier="buyProduct"
              onClick={(e) => {
                e.stopPropagation(); // <--- ovo sprečava da klik ide na parent
              }}
            />
          </div>
        )}
        {selectedProduct && (
          <div
            className="shopCategory__overlay"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="shopCategory__modal"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProduct.images?.length > 0 && (
                <div className="shopCategory__modalImageWrapper">
                  <img
                    src={`http://localhost:8080${selectedProduct.images[selectedImageIndex].imagePath}`}
                    alt={`Image ${selectedImageIndex + 1}`}
                    className="shopCategory__modalImage"
                  />
                  <div className="shopCategory__modalControls">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) =>
                          prev === 0
                            ? selectedProduct.images.length - 1
                            : prev - 1
                        );
                      }}
                    >
                      ◀
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) =>
                          prev === selectedProduct.images.length - 1
                            ? 0
                            : prev + 1
                        );
                      }}
                    >
                      ▶
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        // Kao u kodu gore napravi nove zagrade stanje dal je sta otvoreno i
        napravi formu za unos info
        <Footer />
      </div>
    </>
  );
};

export default ShopCategory;
