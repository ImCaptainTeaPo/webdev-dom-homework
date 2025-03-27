// рендер комментов
import { comments } from "./state.js";
import { stripHTMLTags } from "./api.js";
import { setLikeHandlers, setReplyHandlers } from "./handlers.js";

export function renderComments() {
  const commentsList = document.querySelector(".comments");
  commentsList.innerHTML = "";

  comments.forEach((comment, index) => {
    const commentElement = document.createElement("li");
    commentElement.classList.add("comment");

    commentElement.innerHTML = `
      <div class="comment-header">
        <div>${stripHTMLTags(comment.name)}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${comment.text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${
            comment.isLiked ? "-active-like" : ""
          }" data-index="${index}"></button>
        </div>
      </div>
    `;

    commentsList.appendChild(commentElement);
  });

  setLikeHandlers();
  setReplyHandlers();
}
