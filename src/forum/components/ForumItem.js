import React from "react";

const ForumItem = (props) => {
  return (
    <a href="/">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{props.heading}</h5>
          <p class="card-text">{props.text}</p>
        </div>
      </div>
    </a>
  );
};

export default ForumItem;
