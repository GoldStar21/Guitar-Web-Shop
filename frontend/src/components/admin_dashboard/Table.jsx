import React, { useEffect, useState } from "react";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";
import AuthGuard from "./AuthGuard";
import Button from "../Button";

const Table = ({ canEdit = true, canDelete = true, canView = true }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const parts = search.trim().split(" ");
    const brand = parts[0];
    const model = parts.slice(1).join(" ");

    const url = search
      ? `http://localhost:8080/api/products/search?brand=${encodeURIComponent(
          brand
        )}&model=${encodeURIComponent(model)}`
      : "http://localhost:8080/api/products";

    fetch(url, {
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
  }, [search]);

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
      {editingProduct ? (
        <EditProduct
          product={editingProduct}
          onSave={handleEdit}
          onCancel={() => setEditingProduct(null)}
          setEditingProduct={setEditingProduct}
        />
      ) : viewProduct ? (
        <ViewProduct
          product={viewProduct}
          onBack={() => setViewProduct(null)}
        />
      ) : (
        <div className="productTable">
          <table className="productTable__table">
            <thead className="productTable__thead">
              <tr className="productTable__tr">
                <th className="productTable__th">ID</th>
                <th className="productTable__th">BRAND</th>
                <th className="productTable__th">MODEL</th>
                <th className="productTable__th">TYPE</th>
                <th className="productTable__th">PRICE</th>
                <th className="productTable__th">AMOUNT</th>
                <th className="productTable__th">
                  {/* Search input */}
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="productTable__search"
                  />
                </th>
              </tr>
            </thead>
            <tbody className="productTable__tbody">
              {products.map((product) => (
                <tr className="productTable__tr" key={product.id}>
                  <td className="productTable__td" data-label="ID">
                    {product.id}
                  </td>
                  <td className="productTable__td" data-label="BRAND">
                    {product.brand}
                  </td>
                  <td className="productTable__td" data-label="MODEL">
                    {product.model}
                  </td>
                  <td className="productTable__td" data-label="TYPE">
                    {product.type}
                  </td>
                  <td className="productTable__td" data-label="PRICE">
                    {product.price}
                  </td>
                  <td className="productTable__td" data-label="AMOUNT">
                    {product.amount}
                  </td>
                  <td className="productTable__td--actions">
                    {canView && (
                      <Button
                        label="VIEW"
                        onClick={() => handleViewClick(product)}
                        modifier="buttons"
                      />
                    )}
                    {canEdit && (
                      <Button
                        label="EDIT"
                        onClick={() => handleEditClick(product)}
                        modifier="buttons"
                      />
                    )}
                    {canDelete && (
                      <Button
                        label="DELETE"
                        onClick={() => handleDelete(product.id)}
                        modifier="buttons"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
