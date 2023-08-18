import React from 'react';

function PopupWithForm({ name, title, isOpen, buttonText, onClose, onSubmit, children   }) {
    return (
      <div className={`popup popup_type_${name} ${isOpen ? `popup_opened`: ""}`}>
        <div className="popup__container">
          <form className="popup__form" name={`form-${name}`} onSubmit={onSubmit}>
            <h3 className="popup__title">{title}</h3>
            {children}
            <button className="popup__button-submit" type="submit" title="Сохранить">{buttonText}</button>
          </form>
          <button className="popup__button-close" type="button" title="Закрыть" onClick={onClose}/>
        </div>
      </div>
    )
  }
  
  export default PopupWithForm;