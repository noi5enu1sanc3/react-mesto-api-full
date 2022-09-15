import React, { useContext } from "react";
import useLongPress from "../hooks/useLongPress";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete, onShowLikedBy }) {
  const currentUser = useContext(CurrentUserContext);

  const { handlers: likeButtonHandlers } = useLongPress({
    onLongPress: () => onShowLikedBy(card),
    onClick: () => handleLikeClick(),
  });

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = `cards__delete-btn ${
    isOwn ? "" : "cards__delete-btn_visibility_hidden"
  }`;

  const cardLikeButtonClassName = `cards__like-btn ${
    isLiked ? "cards__like-btn_status_active" : ""
  }`;

  const handleClick = () => onCardClick(card);

  const handleLikeClick = () => onCardLike(card);

  const handleDeleteClick = () => onCardDelete(card);

  const handleLikeCounterClick = (evt) =>
    evt.target !== evt.target.closest(".cards__like-btn") &&
    onShowLikedBy(card);

  return (
    <li className="cards__item">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        onClick={handleDeleteClick}
      />
      <img
        alt={card.name}
        className="cards__image"
        src={card.link}
        onClick={handleClick}
      />
      <div className="cards__info">
        <h2 className="cards__caption">{card.name}</h2>
        <div className="cards__like-element">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            {...likeButtonHandlers}
          />
          <p className="cards__like-count" onClick={handleLikeCounterClick}>
            {card.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
