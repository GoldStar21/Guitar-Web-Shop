"use client";
import { useState } from "react";

const CreateProduct = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="createProduct">
      <div className="c-container">
        <div className="createProduct__content">
          <form
            className="createProduct__form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="createProduct__fields">
              <label>BRAND:</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label>MODEL:</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label>TYPE:</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label>PRICE:</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label>AMOUNT:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label>IMAGES:</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files))}
              />
            </div>
            <div className="createProduct__buttons">
              <button
                type="reset"
                onClick={() => {
                  setBrand("");
                  setModel("");
                  setType("");
                  setPrice("");
                  setAmount("");
                  setImages([]);
                }}
              >
                CANCEL
              </button>
              <button type="submit">CREATE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
