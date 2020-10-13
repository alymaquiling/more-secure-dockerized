import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const BoardModerator = () => {
  const [content, setContent] = useState(
    "You are not authorized to view this page."
  );

  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent("You are not authorized to view this page");
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardModerator;
