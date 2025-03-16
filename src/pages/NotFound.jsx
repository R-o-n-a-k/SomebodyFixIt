import React from "react";
import "../components/NotFound.css";

function NotFound() {
  return (
    <div className="notFound">
      <div className="notFound-msg">
        <h1>404</h1>
        <h3>Page Not Found!</h3>
        <p>
          The specified file was not found on this website. Please check the URL
          for any mistakes and try again.
        </p>

        <button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
