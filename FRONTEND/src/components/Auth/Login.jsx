import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { googleAuth } from "../../utils/api";
import { IoLeafOutline } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        // Call the backend API with the auth code
        const result = await googleAuth(authResult["code"]);

        // Log the entire response to inspect the user object
        console.log("Google API response:", result.data);

        // Extract the necessary fields
        const { email, name, picture, user_id } = result.data.user;
        const image = picture || ""; // Adjust according to the field name in the API response

        const isAdmin = user_id === import.meta.env.VITE_ADMIN_USER_ID;
        console.log("User is admin:", isAdmin);

        const token = result.data.token;
        const obj = { email, name, image, user_id, token, isAdmin };

        // Log the user info object to verify it contains the image URL
        console.log("User Info being saved:", obj);
        localStorage.setItem("user-info", JSON.stringify(obj));

        // Update the authentication state
        setIsAuthenticated(true);

        // Navigate to the home page after successful login
        navigate("/");
      }
    } catch (err) {
      console.error("Error during Google authentication:", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Google login error:", error);
    },
    flow: "auth-code",
  });

  return (
    <div className={styles.loginPage}>
      <RiArrowGoBackLine
        className={styles.homeIcon}
        onClick={() => navigate("/")}
      />
      <div className={styles.loginContainer}>
        <h1 className={styles.heading}>Welcome to THE DJC</h1>
        <p className={styles.paragraph}>Where Glory Meets Shine</p>
        <button onClick={googleLogin} className={styles.googleLoginButton}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
