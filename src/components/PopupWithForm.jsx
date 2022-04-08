import React from "react";

function PopupWithForm({
  name,
  title,
  formName,
  submitButtonValue,
  isOpen,
  children,
  onClose,
}) {
  return (
    <div className="PopupWithForm">
      <section
        onClick={onClose}
        className={`popup popup_${name} ${isOpen && "popup_opened"}`}
      >
        <div className="popup__container">
          <button className="popup__close" />
          <h2 className="popup__title"> {title} </h2>
          <form className="popup__form" name={formName} noValidate>
            {children}
            <button
              type="submit"
              className="popup__save-button"
              value={submitButtonValue}
            >
              {submitButtonValue}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default PopupWithForm;
