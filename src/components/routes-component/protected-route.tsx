import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
