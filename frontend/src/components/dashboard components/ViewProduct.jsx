import { useState } from "react";

const ViewProduct = ({ product, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = product.images || [];

  const previousIndex = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? images.length - 1 : previousIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="viewTable">
      <div className="viewTable__content">
        <div className="viewTable__text">
          <h2 className="viewTable__title">
            {product.brand} - {product.model}
          </h2>
          <p className="viewTable__p">TYPE: {product.type}</p>
          <p className="viewTable__p">PRICE: {product.price} $</p>
          <p className="viewTable__p">AMOUNT: {product.amount}</p>
        </div>

        <div className="viewTable__images">
          {images.length > 0 ? (
            <>
              <img
                src={`http://localhost:8080${images[currentIndex].imagePath}`}
                alt={`Product ${currentIndex + 1}`}
                style={{ width: "300px", height: "auto" }}
              />
              <div>
                <button onClick={previousIndex}>Prev</button>
                <button onClick={handleNext}>Next</button>
              </div>
            </>
          ) : (
            <p>No images available.</p>
          )}
        </div>
      </div>

      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default ViewProduct;
