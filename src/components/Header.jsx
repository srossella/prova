import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="user-info">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F021%2F548%2F095%2Foriginal%2Fdefault-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg&f=1&nofb=1&ipt=f9eb8fc70e37ac04237ad9bc3fb0a69dbaaee920c2e037971cbeea24604db36c&ipo=images" 
          alt="User Avatar"
          width="35px"
          className="avatar"
        />
        <div className="welcome-text">
          <p>Welcome</p>
          <h3>Sandra Mondaini</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
