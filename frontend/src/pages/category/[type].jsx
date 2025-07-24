import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ShopCategory = () => {
  const router = useRouter();
  const { type } = router.query;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  return (
    <>
      <div className="shopCategory">
        <div className="c-container">
          <Navbar />

          <div className="shopCategory__content">
            <h1 className="shopCategory__title">
              {type?.toUpperCase()} GUITARS
            </h1>

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
                      PRICE: {product.price}€
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>

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

        <Footer />
      </div>
    </>
  );
};

export default ShopCategory;
