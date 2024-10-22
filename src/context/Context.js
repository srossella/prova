import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getUsers,
  addUser as apiAddUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
  getPosts,
} from "../services/api";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Fetch iniziale degli utenti
  useEffect(() => {
    getUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Errore nel caricamento utenti:", error);
        toast.error("Errore nel caricamento degli utenti");
      });
  }, []);

  // Funzione per aggiungere un nuovo utente
  const addUser = (user) => {
    apiAddUser(user)
      .then((response) => {
        setUsers((prevUsers) => [...prevUsers, response.data]);
        toast.success("Utente aggiunto con successo!");
      })
      .catch((error) => {
        console.error("Errore nell'aggiunta utente:", error);
        toast.error("Errore nell'aggiunta dell'utente");
      });
  };

  // Funzione per aggiornare un utente esistente
  const updateUser = (id, updatedUser) => {
    apiUpdateUser(id, updatedUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? response.data : user))
        );
        toast.success("Utente aggiornato con successo!");
      })
      .catch((error) => {
        console.error("Errore nella modifica utente:", error);
        toast.error("Errore nella modifica dell'utente");
      });
  };

  // Funzione per eliminare un utente
  const deleteUser = (id) => {
    apiDeleteUser(id)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        toast.success("Utente eliminato con successo!");
      })
      .catch((error) => {
        console.error("Errore nell'eliminazione utente:", error);
        toast.error("Errore nell'eliminazione dell'utente");
      });
  };

  // Fetch iniziale dei post
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Errore nel caricamento dei post:", error);
        toast.error("Errore nel caricamento dei post");
      }
    };

    fetchPosts();
  }, []);

  return (
    <Context.Provider value={{ users, deleteUser, addUser, updateUser, posts }}>
      {children}
    </Context.Provider>
  );
};
