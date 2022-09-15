import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onOverlay,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (currentUser !== null && isOpen) {
      resetForm();
      setValues({ name: currentUser.name, about: currentUser.about });
    }
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonContent={!isLoading ? "Сохранить" : "Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isButtonEnabled={isValid}
    >
      <input
        onChange={handleChange}
        value={values.name || ""}
        name="name"
        id="username-input"
        type="text"
        className="popup__input-form popup__input-form_type_username"
        placeholder="Как вас зовут?"
        minLength="2"
        maxLength="40"
        required
      />
      <div className="popup__input-error-container">
        <span className="popup__input-error" id="username-input-error">
          {errors.name}
        </span>
      </div>
      <input
        onChange={handleChange}
        value={values.about || ""}
        name="about"
        id="userinfo-input"
        type="text"
        className="popup__input-form popup__input-form_type_userinfo"
        placeholder="Кто вы?"
        minLength="2"
        maxLength="200"
        required
      />
      <div className="popup__input-error-container">
        <span className="popup__input-error" id="userinfo-input-error">
          {errors.about}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
