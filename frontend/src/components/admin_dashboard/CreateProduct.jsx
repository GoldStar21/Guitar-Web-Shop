"use client";
import { useState } from "react";

const CreateProduct = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [images, setImages] = useState([]);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("We are sorry for inconvinience, please login again.");
    return;
  }

  // Stoping page reload
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Multipart form data
    const formData = new FormData();
    const productData = {
      brand,
      model,
      type,
      price,
      amount,
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    // Add images
    images.forEach((img) => {
      formData.append("images", img);
    });

    // Send
    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // If everything is ok, reset the form
      if (res.ok) {
        alert("Product created!");

        setBrand("");
        setModel("");
        setType("");
        setPrice("");
        setAmount("");
        setImages([]);
      } else {
        const errorText = await res.text();
        alert("Error: " + errorText);
      }
    } catch (err) {
      console.error("Error:", err);

      if (err.response) {
        console.error("Server resonse:", await err.response.text());
      }

      alert("Error occured while sending the data.");
    }
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
              <label className="createProduct__fields__label">BRAND:</label>
              <input
                className="createProduct__fields__input"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label className="createProduct__fields__label">MODEL:</label>
              <input
                className="createProduct__fields__input"
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label className="createProduct__fields__label">TYPE:</label>
              <input
                className="createProduct__fields__input"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label className="createProduct__fields__label">PRICE:</label>
              <input
                className="createProduct__fields__input"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label className="createProduct__fields__label">AMOUNT:</label>
              <input
                className="createProduct__fields__input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="createProduct__fields">
              <label className="createProduct__fields__label">IMAGES:</label>
              <input
                className="createProduct__fields__input"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files))}
              />
            </div>
            <div className="createProduct__buttons">
              <button className="createProduct__buttons__create" type="submit">
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
