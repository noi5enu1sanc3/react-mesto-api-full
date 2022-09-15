import React, { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onOverlay,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarRef = useRef();

  const [avatarInputError, setAvatarInputError] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    if (handleValidation() === true) {
      onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    } else {
      setAvatarInputError("Please enter url");
    }
  }

  function handleValidation() {
    if (
      avatarRef.current.value.length > 0 &&
      avatarRef.current.validity.valid
    ) {
      return true;
    }
  }

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
      setAvatarInputError("");
      setTimeout(() => avatarRef.current.focus(), 50);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonContent={!isLoading ? "Сохранить" : "Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isButtonEnabled={true}
    >
      <input
        ref={avatarRef}
        name="avatar"
        id="avatarLink-input"
        type="url"
        className="popup__input-form popup__input-form_type_avatar-link"
        placeholder="Ссылка на аватар"
        required
      />
      <div className="popup__input-error-container">
        <span className="popup__input-error" id="avatarLink-input-error">
          {avatarInputError}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
