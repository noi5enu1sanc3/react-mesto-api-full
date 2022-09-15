import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  onShowLikedBy,
}) {
  const user = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div className="profile__avatar-overlay" onClick={onEditAvatar} />
          <img
            alt="аватар пользователя"
            className="profile__avatar"
            src={user !== null ? user.avatar : ""}
          />
        </div>
        <div className="profile__about">
          <div className="profile__name-edit-wrapper">
            <h1 className="profile__username">
              {user !== null ? user.name : ""}
            </h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-btn"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__userinfo">{user !== null ? user.about : ""}</p>
        </div>
        <button
          type="button"
          aria-label="Загрузить фото"
          className="profile__add-btn"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards">
        <ul className="cards__items">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onShowLikedBy={onShowLikedBy}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
