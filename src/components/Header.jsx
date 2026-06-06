import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";
import closeButton from "../assets/close-popup.svg";
import menuwhite from "../assets/menu-mobile-white.svg";
import signoutIcon from "../assets/sign-out-icon.svg";
import SavedNewsPage from "../pages/SavedNews";

export default function Header({ onAuthChange, isLoggedIn }) {
  const [modalMode, setModalMode] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userName, setUserName] = useState("");

  const closeModal = () => setModalMode("");
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSignIn = (event) => {
    event.preventDefault();
    const name = email.split("@")[0] || "User";
    setUserName(name);
    localStorage.setItem("userName", name);

    const token =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);

    localStorage.setItem("authToken", token);
    console.log("Signing in with:", { email, password, token });
    if (typeof onAuthChange === "function") {
      onAuthChange(true);
    }
    closeModal();
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const name = username.trim() || email.split("@")[0] || "User";
    setUserName(name);
    localStorage.setItem("userName", name);

    const token =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);

    localStorage.setItem("authToken", token);
    console.log("Signing up with:", { email, username, password, token });
    if (typeof onAuthChange === "function") {
      onAuthChange(true);
    }
    closeModal();
    setModalMode("signup-success");
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setUserName("");
    if (typeof onAuthChange === "function") {
      onAuthChange(false);
    }
  };

  const openSignUp = () => setModalMode("signup");
  const openSignIn = () => setModalMode("signin");

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const isModalOpen = modalMode !== "";
  const isSignInMode = modalMode === "signin";
  const isSignUpMode = modalMode === "signup";
  const isSignUpSuccessMode = modalMode === "signup-success";
  const isSignInValid = email.trim() !== "" && password.trim() !== "";
  const isSignUpValid =
    email.trim() !== "" && password.trim() !== "" && username.trim() !== "";

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedName = localStorage.getItem("userName");
      setUserName(storedName || "User");
    } else {
      setUserName("");
    }
  }, [isLoggedIn]);

  return (
    <header className="site-header">
      <div className="header-brand">
        <Link to="/" className="brand-link">
          NewsExplorer
        </Link>
      </div>
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation menu"
        onClick={toggleMobileMenu}>
        <img src={menuwhite} alt="menu" />
      </button>
      <div className="header-actions">
        <Link to="/" className="button-secondary home-action-button">
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/saved-news" className="saved-action-button">
              Saved Articles
            </Link>
            <div className="header-user-block">
              <span className="signed-in-name" onClick={handleSignOut}>
                {userName ? ` ${userName}` : "Signed in"}
                {typeof signoutIcon === "function" ? (
                  React.createElement(signoutIcon, {
                    className: "signout-icon",
                    alt: "Sign out",
                  })
                ) : (
                  <img
                    src={signoutIcon}
                    alt="Sign out"
                    className="signout-icon"
                  />
                )}
              </span>
            </div>
          </>
        ) : (
          <button type="button" className="sign-in-button" onClick={openSignIn}>
            Sign in
          </button>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          <Link
            to="/"
            className="button-secondary home-action-button"
            onClick={closeMobileMenu}>
            Home
          </Link>
          {!isLoggedIn ? (
            <button
              type="button"
              className="sign-in-button"
              onClick={() => {
                openSignIn();
                closeMobileMenu();
              }}>
              Sign in
            </button>
          ) : (
            <Link
              to="/saved-news"
              className="button-secondary saved-action-button"
              onClick={closeMobileMenu}>
              Saved Articles
            </Link>
          )}
        </div>
      )}

      {isModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={handleOverlayClick}>
          <div className="modal-window">
            <div className="modal-header">
              <h2 className="login-Title">
                {isSignUpSuccessMode
                  ? "Registration successfully completed!"
                  : isSignInMode
                    ? "Sign in"
                    : "Sign up"}
              </h2>
              <button
                type="button"
                className="modal-close popup-close"
                onClick={closeModal}
                aria-label="Close modal">
                <img src={closeButton} alt="Close" />
              </button>
            </div>
            {isSignUpSuccessMode ? (
              <div className="modal-content">
                <p className="modal-text">
                  Registration successfully completed!
                </p>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="button-primary"
                    onClick={openSignIn}>
                    Sign in
                  </button>
                </div>
              </div>
            ) : (
              <>
                <form
                  className="modal-form"
                  onSubmit={isSignInMode ? handleSignIn : handleSignUpSubmit}>
                  <label className="modal-label">
                    Email
                    <input
                      className="placeholder-Info"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter email"
                    />
                  </label>
                  <label className="modal-label">
                    Password
                    <input
                      className="placeholder-Info"
                      type="password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter password"
                    />
                  </label>
                  {isSignUpMode && (
                    <label className="modal-label">
                      Username
                      <input
                        className="placeholder-Info"
                        type="text"
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter username"
                      />
                    </label>
                  )}
                  <div className="modal-actions">
                    <button
                      type="submit"
                      className={`button-primary ${!(isSignInMode ? isSignInValid : isSignUpValid) ? "disabled" : ""}`}
                      disabled={
                        !(isSignInMode ? isSignInValid : isSignUpValid)
                      }>
                      {isSignInMode ? "Sign in" : "Sign up"}
                    </button>
                  </div>
                </form>
                {isSignInMode && (
                  <div className="modal-footer">
                    <span>or</span>
                    <button
                      type="button"
                      className="button-link"
                      onClick={openSignUp}>
                      Sign up
                    </button>
                  </div>
                )}
                {isSignUpMode && (
                  <div className="modal-footer">
                    <span>or</span>
                    <button
                      type="button"
                      className="button-link"
                      onClick={openSignIn}>
                      Sign in
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
