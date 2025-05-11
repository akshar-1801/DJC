import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { TbHistoryToggle, TbSearch } from "react-icons/tb";
import { IoBagOutline, IoLogOutOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../../components/Cart/Cart";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const { cartCount, showCart, setShowCart } = useContext(Context);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleUserDropdown = useCallback(() => {
    setUserDropdownOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setUserDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen, handleClickOutside]);

  const handleHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user-info");
    setIsAuthenticated(false);
    navigate("/login");
  }, [setIsAuthenticated, navigate]);

  const handleSearchClick = useCallback(() => {
    setSearchModal(true);
  }, []);

  const handleLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleOrdersClick = () => {
    navigate("/orders");
  };

  const userInfo = JSON.parse(localStorage.getItem("user-info") || "{}");
  const userName = userInfo.name || "Guest";
  const userImage = userInfo.image || "";
  // console.log(userInfo);

  const navItems = ["Home", "About", "Consulting", "Blogs"];

  return (
    <>
      <header className={styles.mainHeader}>
        <div className={styles.headerContent}>
          <ul className={styles.left}>
            {navItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.center} onClick={handleHomeClick}>
            DJC
          </div>
          <div className={styles.right}>
            <TbSearch onClick={handleSearchClick} />
            <div className={styles.userIconWrapper}>
              <LuUser onClick={toggleUserDropdown} />
              {userDropdownOpen && (
                <div
                  className={`${styles.userDropdown} ${styles.active}`}
                  ref={dropdownRef}
                >
                  {isAuthenticated ? (
                    <>
                      <div className={styles.userInfo}>
                        {userImage && (
                          <img
                            src={userImage}
                            alt="User"
                            className={styles.userImage}
                          />
                        )}
                        <span className={styles.userName}>
                          Hello, {userName}
                        </span>
                        <div className={styles.btnContainer}>
                          <IoLogOutOutline
                            className={styles.ddlbutton}
                            onClick={handleLogout}
                          />
                          <TbHistoryToggle
                            className={styles.ddlbutton}
                            onClick={handleOrdersClick}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      className={styles.dropdownButton}
                      onClick={handleLoginClick}
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>
            <span className={styles.cartIcon} onClick={() => setShowCart(true)}>
              <IoBagOutline />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {searchModal && <Search setSearchModal={setSearchModal} />}
      {showCart && <Cart />}
    </>
  );
};

export default React.memo(Header);
