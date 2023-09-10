const PopupWithForm = (props) => {
  const { title, name, isOpen, onClose, submitButtonLabel, onSubmit, isDisabled } = props;

  return (
    <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
          <button
            className="popup__close-button"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          />
          <h3 className="popup__header">{title}</h3>
          {props.children}
          <button
            className={`popup__save-button ${isDisabled ? 'popup__save-button_disabled' : ''}`}
            type="submit"
            aria-label={submitButtonLabel}
            disabled={isDisabled}
          >
            {submitButtonLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
