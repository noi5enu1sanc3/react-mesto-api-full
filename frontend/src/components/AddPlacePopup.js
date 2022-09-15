import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onOverlay, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonContent={!isLoading ? "Создать" : "Сохранение..."}
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
        id="cardName-input"
        type="text"
        className="popup__input-form popup__input-form_type_card-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <div className="popup__input-error-container">
        <span className="popup__input-error" id="cardName-input-error">
          {errors.name}
        </span>
      </div>
      <input
        onChange={handleChange}
        value={values.link || ""}
        name="link"
        id="cardLink-input"
        type="url"
        className="popup__input-form popup__input-form_type_card-link"
        placeholder="Ссылка на картинку"
        required
      />
      <div className="popup__input-error-container">
        <span className="popup__input-error" id="cardLink-input-error">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
