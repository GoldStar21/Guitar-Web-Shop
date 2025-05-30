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

    // Dodaj slike
    images.forEach((img) => {
      formData.append("images", img);
    });

    // Slanje svega
    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Ako je sve ok resetuj fromu i daj poruku
      if (res.ok) {
        alert("Proizvod uspješno kreiran!");
        // Po želji resetuj formu
        setBrand("");
        setModel("");
        setType("");
        setPrice("");
        setAmount("");
        setImages([]);
      } else {
        const errorText = await res.text();
        alert("Greška: " + errorText);
      }
    } catch (err) {
      console.error("Greška prilikom slanja:", err);

      if (err.response) {
        console.error("Odgovor servera:", await err.response.text());
      }

      alert("Došlo je do greške pri slanju proizvoda.");
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
              <button type="submit">CREATE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
