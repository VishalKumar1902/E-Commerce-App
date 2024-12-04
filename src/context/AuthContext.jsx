import React, { createContext, useState, useEffect } from "react";
import { users } from "../data/db"; // Import users from db.js

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user data from localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.username) {
          setCurrentUser(parsedUser); // Initialize user from localStorage
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const login = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("authUser", JSON.stringify(user)); // Store the logged-in user in localStorage
      return user;
    }
    return { success: false, message: "Invalid credentials" };
  };

  const register = (username, password) => {
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
      role: "user",
      cart: [],
    };

    users.push(newUser); // Add new user to users array
    localStorage.setItem("users", JSON.stringify(users)); // Save the updated users array in localStorage
    localStorage.setItem("authUser", JSON.stringify(newUser)); // Store the new user in localStorage
    setCurrentUser(newUser); // Set the current user to the new user

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authUser"); // Remove user data from localStorage
  };

  const updateCart = (newCart) => {
    if (currentUser) {
      const updatedUsers = users.map((user) =>
        user.username === currentUser.username
          ? { ...user, cart: newCart }
          : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setCurrentUser({ ...currentUser, cart: newCart });
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, updateCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
