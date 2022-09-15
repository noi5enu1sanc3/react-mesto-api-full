import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function LikedByPopup({ isOpen, onOverlay, likes }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section
      className={`popup popup_style_liked-by ${isOpen && "popup_status_show"}`}
      onClick={onOverlay}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="popup__container popup__liked-by-container">
        {likes &&
          likes.length > 0 &&
          Array.from(likes).map((like) => (
            <div className="popup__likes-user" key={like._id}>
              <img className="popup__likes-avatar" src={like.avatar} alt={like.name}></img>
              <p className="popup__likes-name">
                {like._id === currentUser._id ? "You" : like.name}
              </p>
            </div>
          ))}
        {likes &&
          likes.length === 0 &&
          "Be the first one to like this post ♡(>ᴗ•)"}
      </div>
    </section>
  );
}

export default LikedByPopup;
