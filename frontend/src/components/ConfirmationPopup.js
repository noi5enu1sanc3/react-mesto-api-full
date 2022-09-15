import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({
  isOpen,
  onClose,
  onOverlay,
  onCardDelete,
  cardId,
  isLoading,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();

    onCardDelete(cardId);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonContent={!isLoading ? "Да" : "Удаление..."}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
      cardId={cardId}
      isLoading={isLoading}
      isButtonEnabled={true}
    />
  );
}

export default ConfirmationPopup;
