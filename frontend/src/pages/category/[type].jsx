import Navbar from "@/components/home_components/Navbar";
import Button from "@/components/home_components/Button";
import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";
import Footer from "@/components/home_components/Footer";
import CardPanel from "@/components/shopping_cart/CardPanel";

const Products = () => {
  //--------------------------------------------------------
  // State and Function for opening side panel
  const [isPanelOpen, setPanelOpen] = useState(false);

  const cartState = () => {
    setPanelOpen(!isPanelOpen);
  };
  //--------------------------------------------------------
  // State for shopping cart
  const [cart, setCart] = useState([]);

  // State for product/item
  const [products, setProducts] = useState([]);

  // Add to cart function
  const addToCart = (products) => {
    localStorage.setItem("productId", products.id);
    setCart((previousCartState) => {
      const existingProduct = previousCartState.find(
        (item) => item.id === products.id
      );

      if (existingProduct) {
        return previousCartState.map((item) =>
          item.id === products.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...previousCartState,
          { ...products, quantity: 1, image: products.images[0]?.imagePath },
        ];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (id) => {
    setCart((previousItem) => previousItem.filter((item) => item.id !== id));
  };
  //--------------------------------------------------------
  // State for selected product
  const [selectedProduct, setSelectedProduct] = useState(0);
  //--------------------------------------------------------
  // Router i dohvat iz backeda "veza"
  const router = useRouter();
  const { type } = router.query;
  //--------------------------------------------------------
  // Odabir slika za saltanje
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
  //--------------------------------------------------------

  return (
    <div className="products">
      <div className="c-container">
        <Navbar />

        <div className="products__content">
          <div className="products__head">
            <h1 className="products__title">{type?.toUpperCase()} GUITARS</h1>
            <FiShoppingCart className="products__cart" onClick={cartState} />
            {cart.length > 0 && (
              <span className="products__badge">{cart.length}</span>
            )}
          </div>
          {/* Grid*/}
          {products.length > 0 ? (
            <div className="products__grid">
              {products.map((product) => (
                <div
                  className="products__card"
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:8080${product.images[0].imagePath}`}
                      alt={`${product.brand} ${product.model}`}
                      className="products__image"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <h3 className="products__title3">
                    {product.brand} - {product.model}
                  </h3>
                  <p className="products__type">Type: {product.type}</p>
                  <p className="products__price">
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
                      e.stopPropagation();
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

      <CardPanel
        cart={cart}
        setCart={setCart}
        removeFromCart={removeFromCart}
        setPanelOpen={setPanelOpen}
        setDeliveryFormOpen={() => {}} // možeš kasnije dodati pravu funkciju
        isPanelOpen={isPanelOpen}
      />

      {selectedProduct && (
        <div
          className="products__overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="products__modal" onClick={(e) => e.stopPropagation()}>
            {selectedProduct.images?.length > 0 && (
              <div className="products__modalImageWrapper">
                <img
                  src={`http://localhost:8080${selectedProduct.images[selectedImageIndex].imagePath}`}
                  alt={`Image ${selectedImageIndex + 1}`}
                  className="products__modalImage"
                />
                <div className="products__modalControls">
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

      <Footer />
    </div>
  );
};

export default Products;
