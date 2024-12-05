import React from "react";
import cartImage from "../../assets/cart.svg";
import userImage from "../../assets/user.svg";
import searchImage from "../../assets/search.svg";
import "./Header.scss";

export interface HeaderProps {
  onSearch?: (searchQuery: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <header>
      <div className="search__box">
        <img src={searchImage} alt="Search" className="header_search" />
        <input
          id="headerInput"
          type="text"
          placeholder="Search products"
          onInput={handleInput}
        />
      </div>
      <div className="item__box">
        <img src={cartImage} alt="Cart" className="header_cart" />
        <img src={userImage} alt="Userpage" className="header_userpage" />
      </div>
    </header>
  );
};

export default Header;
