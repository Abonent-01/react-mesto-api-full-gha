import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen])

  return (
    <PopupWithForm
          isOpen={isOpen}
          onClose={onClose}
          name={'add'}
          title={'Новое место'}
          buttonText={'Создать'}
          onSubmit={handleSubmit}>
          <label className="popup__field">
              <input className="popup__item popup__item_type_title" id="input-title" name="title" type="text" placeholder="Название" minLength="2"maxLength="30" required value={cardName ?? ""} onChange={(e) => setCardName(e.target.value)}/>
              <span className="popup__error" id="input-title-error"></span>
          </label>
          <label className="popup__field">
              <input className="popup__item popup__item_type_link" id="input-link" name="link" type="url" placeholder="Ссылка на картинку" required value={cardLink ?? ""} onChange={(e) => setCardLink(e.target.value)}/>
              <span className="popup__error" id="input-link-error"></span>
          </label>
        </PopupWithForm>
  )

}

export default AddPlacePopup;