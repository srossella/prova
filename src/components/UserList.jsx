import React, { useContext, useState, useMemo, useEffect } from "react";
import { Context } from "../context/Context";
import UserModal from "./UserModal";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaPlus,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";

const UserList = () => {
  const { users, deleteUser, addUser, updateUser } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setSortField("id");
    setSortOrder("asc");
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      updateUser(selectedUser.id, userData);
    } else {
      addUser(userData);
    }
    handleCloseModal();
  };

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  const sortedUsers = useMemo(() => {
    const compare = (a, b) => {
      if (sortField === "id") {
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      }
      const compareA = a[sortField]?.toLowerCase() || "";
      const compareB = b[sortField]?.toLowerCase() || "";
      return sortOrder === "asc"
        ? compareA.localeCompare(compareB)
        : compareB.localeCompare(compareA);
    };

    return [...filteredUsers].sort(compare);
  }, [filteredUsers, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="user-list">
      <h2>Lista Utenti</h2>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        <input
          type="text"
          placeholder="Cerca per nome o email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="users-search-input"
        />
        <button className="add-user-button" onClick={handleAddUser}>
          <FaPlus className="plus-icon" /> Aggiungi Utente
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID{" "}
                {sortField === "id" &&
                  (sortOrder === "asc" ? (
                    <FaSortAlphaDown />
                  ) : (
                    <FaSortAlphaUp />
                  ))}
              </th>
              <th onClick={() => handleSort("name")}>
                Nome e Cognome{" "}
                {sortField === "name" &&
                  (sortOrder === "asc" ? (
                    <FaSortAlphaDown />
                  ) : (
                    <FaSortAlphaUp />
                  ))}
              </th>
              <th onClick={() => handleSort("email")}>
                Email{" "}
                {sortField === "email" &&
                  (sortOrder === "asc" ? (
                    <FaSortAlphaDown />
                  ) : (
                    <FaSortAlphaUp />
                  ))}
              </th>
              <th>Opzioni</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td style={{ minWidth: "80px" }}>
                    <FaPencilAlt
                      className="icon edit-icon"
                      onClick={() => handleEditUser(user)}
                    />
                    <FaTrashAlt
                      className="icon delete-icon"
                      onClick={() => deleteUser(user.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Nessun risultato
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        initialData={selectedUser}
      />
    </div>
  );
};

export default UserList;
