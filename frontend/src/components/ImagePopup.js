import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image" ${props.card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_image">
                <button className="popup__button-close popup__button-close_type_image" title="Закрыть" type="button" onClick={props.onClose}></button>
                <img className="popup__img" src={props.card?.link} alt={props.card?.name}/>
                <h2 className="popup__title-image">{props.card?.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;