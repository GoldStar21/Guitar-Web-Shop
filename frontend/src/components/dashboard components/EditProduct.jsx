const EditProduct = ({ product, setEditingProduct, onSave, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(); // poziva funkciju iz parent komponente
  };

  return (
    <div className="editProduct">
      <div className="c-container">
        <div className="editProduct__content">
          <form className="editProduct__form" onSubmit={handleSubmit}>
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

            {/* Prikaz postojećih slika (ako želiš) 
            {product.images && product.images.length > 0 && (
              <div className="editProduct__fields">
                <label className="editProduct__fields__label">IMAGES:</label>
                <div className="editProduct__imagePreview">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={`data:image/jpeg;base64,${img.data}`} // prilagodi kako ti backend vraća slike
                      alt={`Product ${index}`}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                  ))}
                </div>
              </div>
            )}
              */}

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
