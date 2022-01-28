import React from "react";

const ForumItem = (props) => {
  return (
    <a href="/">
      <div class="card forum-list-card mt-3">
        <div class="card-body">
          <h5 class="card-title">{props.heading}</h5>
          <p class="card-text">{props.text}</p>
        </div>
      </div>
    </a>
  );
};

export default ForumItem;
