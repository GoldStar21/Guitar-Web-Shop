const ViewProduct = ({ product, onBack }) => {
  return (
    <div className="viewTable">
      <h2>
        {product.brand} - {product.model}
      </h2>
      <p>Type: {product.type}</p>
      <p>Price: {product.price}</p>
      <p>Amount: {product.amount}</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default ViewProduct;
