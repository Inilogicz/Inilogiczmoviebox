import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div
      id="error-page"
      className="h-screen flex justify-center items-center flex-col"
    >
      <h1>Oops!</h1>
      <h6>Sorry, an unexected error has occured</h6>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="underline text-lg">
        Go back to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
