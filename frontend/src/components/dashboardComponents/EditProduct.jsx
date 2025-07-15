import React, { useState } from "react";

const EditProduct = ({ product, setEditingProduct, onSave, onCancel }) => {
  // ✅ Dodano za nove slike
  const [newImages, setNewImages] = useState([]);

  // Funkcija za ažuriranje tekstualnih polja
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Funkcija za brisanje slike iz product.images
  const handleDeleteImage = (id) => {
    setEditingProduct((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
      deletedImageIds: [...(prev.deletedImageIds || []), id],
    }));
  };

  // ✅ Dodano: Funkcija za upravljanje novim slikama
  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  // Funkcija koja se poziva kada se forma šalje
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();

    const productData = {
      brand: product.brand,
      model: product.model,
      type: product.type,
      price: product.price,
      amount: product.amount,
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    // ✅ Dodano: nove slike
    newImages.forEach((image) => {
      formData.append("images", image);
    });

    // Ako ima obrisanih slika
    if (product.deletedImageIds && product.deletedImageIds.length > 0) {
      product.deletedImageIds.forEach((id) =>
        formData.append("deletedImageIds", id)
      );
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (res.ok) {
        alert("Product updated!");
        onSave(); // ili osvježi listu
      } else {
        const errText = await res.text();
        alert("Error: " + errText);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error while sending.");
    }
  };

  return (
    <div className="editProduct">
      <div className="c-container">
        <div className="editProduct__content">
          <form className="editProduct__form" onSubmit={handleSubmit}>
            {/* --- Polja za unos --- */}
            <div className="editProduct__fields">
              <label className="editProduct__fields__label">BRAND:</label>
              <input
                className="editProduct__fields__input"
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
            </div>

            <div className="editProduct__fields">
              <label className="editProduct__fields__label">MODEL:</label>
              <input
                className="editProduct__fields__input"
                type="text"
                name="model"
                value={product.model}
                onChange={handleChange}
              />
            </div>

            <div className="editProduct__fields">
              <label className="editProduct__fields__label">TYPE:</label>
              <input
                className="editProduct__fields__input"
                type="text"
                name="type"
                value={product.type}
                onChange={handleChange}
              />
            </div>

            <div className="editProduct__fields">
              <label className="editProduct__fields__label">PRICE:</label>
              <input
                className="editProduct__fields__input"
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </div>

            <div className="editProduct__fields">
              <label className="editProduct__fields__label">AMOUNT:</label>
              <input
                className="editProduct__fields__input"
                type="number"
                name="amount"
                value={product.amount}
                onChange={handleChange}
              />
            </div>

            {/* --- Postojeće slike --- */}
            {product.images && product.images.length > 0 && (
              <div className="editProduct__fields">
                <label className="editProduct__fields__label">IMAGES:</label>
                <div
                  className="editProduct__imagePreview"
                  style={{ display: "flex", gap: "10px" }}
                >
                  {product.images.map((img, index) => (
                    <div
                      key={img.id || index}
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <img
                        src={`http://localhost:8080${img.imagePath}`}
                        alt={`Product Image ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "auto",
                          display: "block",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img.id)}
                        style={{
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                          background: "rgba(255,0,0,0.7)",
                          border: "none",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          lineHeight: "18px",
                          padding: 0,
                        }}
                        aria-label="Delete image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- Novi upload --- */}
            <div className="editProduct__fields">
              <label className="editProduct__fields__label">
                ADD NEW IMAGES:
              </label>
              <input
                className="editProduct__fields__input"
                type="file"
                multiple
                accept="image/*"
                onChange={handleNewImagesChange}
              />

              {/* ✅ Dodano: prikaz novih slika */}
              {newImages.length > 0 && (
                <div
                  className="editProduct__newImagePreview"
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  {newImages.map((img, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`New Image ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* --- Dugmad --- */}
            <div className="editProduct__buttons">
              <button className="editProduct__buttons__save" type="submit">
                SAVE
              </button>
              <button
                className="editProduct__buttons__cancel"
                type="button"
                onClick={onCancel}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
