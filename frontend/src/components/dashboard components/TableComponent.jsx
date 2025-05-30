import React, { useEffect, useState } from "react";
import ViewProduct from "./ViewProduct";

const TableComponent = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Ooops something went wrong while fetching the data."
          );
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Ooops:", error));
  }, []);

  // * OnClick for DELETE button *

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // POSTAVI proizvod za editovanje
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  // * onClick for EDIT button *

  const handleEdit = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/api/products/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingProduct),
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
  };

  // * onClick for VIEW button *

  const handleViewClick = (product) => {
    setViewProduct(product);
  };

  return (
    // Conditional expression that enables opening table and product view section depending on condition
    <>
      {viewProduct ? (
        <ViewProduct
          product={viewProduct}
          onBack={() => setViewProduct(null)}
        />
      ) : (
        <table className="productTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>BRAND</th>
              <th>MODEL</th>
              <th>TYPE</th>
              <th>PRICE</th>
              <th>AMOUNT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.brand}</td>
                <td>{product.model}</td>
                <td>{product.type}</td>
                <td>{product.price}</td>
                <td>{product.amount}</td>
                <td>
                  <button onClick={() => handleViewClick(product)}>VIEW</button>
                  <button onClick={() => handleEditClick(product)}>EDIT</button>
                  <button onClick={() => handleDelete(product.id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        // Edit form "needs to be made"
      )}
    </>
  );
};

export default TableComponent;
