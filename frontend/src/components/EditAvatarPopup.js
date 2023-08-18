import React, { useContext, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const refAvatar = useRef();

  useEffect(() => {
    refAvatar.current.value = ''
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: refAvatar.current.value,
    })
  }

  return (
    <PopupWithForm
          isOpen={isOpen}
          onClose={onClose}
          name={'avatar-input-link'}
          form={'popup-form'}
          title={'Обновить аватар'}
          buttonText={'Сохранить'}
          onSubmit={handleSubmit}>
          <label className="popup__field">
              <input className="popup__item popup__item_type_link" ref={refAvatar} id="avatar-input-link" name="link" type="url" placeholder="Ссылка на картинку" required/>
              <span className="popup__error" id="avatar-input-link-error"></span>
          </label>
        </PopupWithForm>
  )

}

export default EditAvatarPopup