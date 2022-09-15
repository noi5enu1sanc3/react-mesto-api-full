function PopupWithForm({
  name,
  isOpen,
  title,
  onClose,
  onOverlay,
  onSubmit,
  children,
  buttonContent,
  isButtonEnabled,
}) {
  return (
    <section
      className={`popup popup_role_${name} ${
        isOpen ? "popup_status_show" : ""
      }`}
      onClick={onOverlay}
    >
      <div className="popup__container">
        <h2 className="popup__heading">{title}</h2>
        <form
          name={name}
          className="popup__form js-form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className={`popup__save-btn ${
              isButtonEnabled ? "" : "popup__save-btn_disabled"
            }`}
            disabled={!isButtonEnabled}
          >
            {buttonContent}
          </button>
        </form>
        <button type="button" className="popup__close-btn" onClick={onClose} />
      </div>
    </section>
  );
}

export default PopupWithForm;
