import React, { useState, useEffect } from "react";
import PingTest from "./PingTest";
import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState(
    "You are not authorized to view this page."
  );
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
        setAuthorized(true);
      },
      (error) => {
        setContent("You are not authorized to view this page.");
        setAuthorized(false);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <h4>{authorized && <h3>Admin Ping Test</h3>}</h4>
      {authorized && <PingTest />}
    </div>
  );
};

export default BoardAdmin;
