import React from 'react';
import successLogo from '../images/popup/SUCCES.svg';
import errorLogo from '../images/popup/ERROR.svg';

function InfoTooltip({ tooltipIcon, message, isOpen, onClose }) {

  return (
    <div className={`popup ${isOpen && "popup_opened"}`} >
      <div className="popup__container popup__container_type_tooltip">
        <div className="popup__icon-tooltip">
          {tooltipIcon === "success" && (
            <img src={successLogo} alt="Регистрация прошла успешно"
            style={{ marginBottom: 32, marginTop: 60 }} />
          )}
          {tooltipIcon === "error" && <img src={errorLogo} alt="Ошибка"
          style={{ marginBottom: 32, marginTop: 60 }} />}
        </div>
        <h3 className="popup__title popup__title_type_tooltip" >{message}</h3>
        <button className="popup__button-close" type="button" title="Закрыть" onClick={onClose}/>
      </div>
    </div>
  )
}

export default InfoTooltip;