import React, { useEffect, useState } from "react";
import Button from "../home_components/Button";

const EmployeeTable = () => {
  const [users, setUsers] = useState([]);

  // get users
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log("Response status:", response.status); // status HTTP-a
        console.log("Response ok?", response.ok);
        if (!response.ok) {
          throw new Error(
            "Ooops something went wrong while fetching the data."
          );
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Ooops:", error));
  }, []);

  // User DELETE
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setUsers((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="employeeTable">
      <table className="employeeTable__table">
        <thead className="employeeTable__thead">
          <tr className="employeeTable__tr">
            <th className="employeeTable__th">ID</th>
            <th className="employeeTable__th">USERNAME</th>
            <th className="employeeTable__th">ROLE</th>
            <th className="employeeTable__th">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="employeeTable__tbody">
          {users.map((user) => (
            <tr className="employeeTable__tr" key={user.id}>
              <td className="employeeTable__td" data-label="ID">
                {user.id}
              </td>
              <td className="employeeTable__td" data-label="USERNAME">
                {user.username}
              </td>
              <td className="employeeTable__td" data-label="ROLE">
                {user.role}
              </td>

              <td className="employeeTable__td--actions">
                <Button
                  label="DELETE"
                  onClick={() => handleDelete(user.id)}
                  modifier="deleteEmployee"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
