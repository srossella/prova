import React from "react";
import { ContextProvider } from "./context/Context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./components/UserList";
import PostList from "./components/PostList";
import ImageList from "./components/ImageList";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./styles.scss";

const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <div className="main-container">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/users" element={<UserList />} />
                <Route path="/images" element={<ImageList />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="*" element={<Navigate to="/users" />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;
