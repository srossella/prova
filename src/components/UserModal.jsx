import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const initialUserData = {
  name: "",
  email: "",
  address: {
    street: "",
    zipcode: "",
    city: "",
  },
  phone: "",
  company: { name: "" },
};

const UserModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    if (initialData) {
      setUserData({
        name: initialData.name || "",
        email: initialData.email || "",
        address: {
          street: initialData.address?.street || "",
          zipcode: initialData.address?.zipcode || "",
          city: initialData.address?.city || "",
        },
        phone: initialData.phone || "",
        company: {
          name: initialData.company?.name || "",
        },
      });
    } else {
      setUserData(initialUserData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevData) => {
      if (name in prevData.address) {
        return {
          ...prevData,
          address: {
            ...prevData.address,
            [name]: value,
          },
        };
      }

      if (name === "company") {
        return {
          ...prevData,
          company: {
            ...prevData.company,
            name: value,
          },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Inserisci i dati</h2>
        <form onSubmit={handleSubmit}>
          {renderInputField(
            "Nome e Cognome:",
            "name",
            userData.name,
            handleChange,
            true,
            "Nome"
          )}
          {renderInputField(
            "E-mail:",
            "email",
            userData.email,
            handleChange,
            true,
            "E-mail",
            "email"
          )}
          {renderInputField(
            "Via:",
            "street",
            userData.address.street,
            handleChange,
            false,
            "Via"
          )}
          {renderInputField(
            "Cap:",
            "zipcode",
            userData.address.zipcode,
            handleChange,
            false,
            "Cap"
          )}
          {renderInputField(
            "Città:",
            "city",
            userData.address.city,
            handleChange,
            false,
            "Città"
          )}
          {renderInputField(
            "Telefono:",
            "phone",
            userData.phone,
            handleChange,
            false,
            "Telefono"
          )}
          {renderInputField(
            "Nome azienda:",
            "company",
            userData.company.name,
            handleChange,
            false,
            "Nome azienda"
          )}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const renderInputField = (
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder
) => (
  <div>
    <label>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default UserModal;
