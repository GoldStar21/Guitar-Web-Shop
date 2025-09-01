import React, { useState } from "react";
import Button from "../Button";

const fields = [
  { label: "BRAND", name: "brand", type: "text" },
  { label: "MODEL", name: "model", type: "text" },
  { label: "TYPE", name: "type", type: "text" },
  { label: "PRICE", name: "price", type: "text" },
  { label: "AMOUNT", name: "amount", type: "number" },
];

const ImagePreview = ({ images, onDelete }) => (
  <div className="editProduct__fields">
    <label className="editProduct__fields__label">IMAGES:</label>
    <div className="editProduct__imagePreview">
      {images.map((img, index) => (
        <div key={img.id || index} className="editProduct__imageWrapper">
          <img
            src={`http://localhost:8080${img.imagePath}`}
            alt={`Product Image ${index + 1}`}
            className="editProduct__image"
          />
          <button
            type="button"
            onClick={() => onDelete(img.id)}
            className="editProduct__deleteBtn"
            aria-label="Delete image"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  </div>
);

const NewImagesPreview = ({ newImages }) =>
  newImages.length > 0 && (
    <div className="editProduct__newImagePreview">
      {newImages.map((img, index) => (
        <div key={index} className="editProduct__imageWrapper">
          <img
            src={URL.createObjectURL(img)}
            alt={`New Image ${index + 1}`}
            className="editProduct__image"
          />
        </div>
      ))}
    </div>
  );

const EditProduct = ({ product, setEditingProduct, onSave, onCancel }) => {
  const [newImages, setNewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteImage = (id) => {
    setEditingProduct((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
      deletedImageIds: [...(prev.deletedImageIds || []), id],
    }));
  };

  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

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

    newImages.forEach((img) => formData.append("images", img));

    if (product.deletedImageIds?.length > 0) {
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
        onSave();
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
            {fields.map(({ label, name, type }) => (
              <div key={name} className="editProduct__fields">
                <label className="editProduct__fields__label">{label}:</label>
                <input
                  className="editProduct__fields__input"
                  type={type}
                  name={name}
                  value={product[name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            {product.images?.length > 0 && (
              <ImagePreview
                images={product.images}
                onDelete={handleDeleteImage}
              />
            )}

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
              <NewImagesPreview newImages={newImages} />
            </div>

            <div className="editProduct__buttons">
              <Button
                label="CANCEL"
                onClick={onCancel}
                modifier="editButtons"
              />
              <Button label="SAVE" type="submit" modifier="editButtonss" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
