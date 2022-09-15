function InfoTooltip({ onClose, onOverlay, isOpen, isSuccessful }) {
  return (
    <section
      className={`popup ${isOpen ? "popup_status_show" : ""}`}
      onClick={onOverlay}
    >
      <div className="popup__container">
        <div
          className={`popup__icon ${
            isSuccessful
              ? "popup__icon_status_success"
              : "popup__icon_status_error"
          }`}
        />
        <h2 className="popup__heading popup__heading_style_centered">
          {isSuccessful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default InfoTooltip;
