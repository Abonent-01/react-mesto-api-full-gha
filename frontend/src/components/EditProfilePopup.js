import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm 
          onClose={onClose}
          isOpen={isOpen}
          onSubmit={handleSubmit}
          name={'edit'}
          title={'Редактировать профиль'}
          form={'popup-form'}
          buttonText={'Сохранить'}>
              <label className="popup__field">
                  <input className="popup__item popup__item_type_name" id="input-name" name="name" type="text" placeholder="Имя" minLength="2"maxLength="40" required onChange={(evt) => setName(evt.target.value)}
          value={name ?? ''}/>
                  <span className="popup__error" id="input-name-error"></span>
              </label>
              <label className="popup__field">
                  <input className="popup__item popup__item_type_about" id="input-job" name="about" type="text" placeholder="О себе" minLength="2"maxLength="200" required onChange={(evt) => setDescription(evt.target.value)}
          value={description ?? ''}/>
                  <span className="popup__error" id="input-job-error"></span>
              </label>
        </PopupWithForm>
  )
}



export default EditProfilePopup;