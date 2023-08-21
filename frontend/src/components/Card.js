import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((card) => card === currentUser._id);
  const cardLikeButton = (`elements__like ${isLiked && 'elements__like_active'}`);

  return(
    <CurrentUserContext.Provider value={currentUser}>

    <li className="elements__item">
        <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick}/>
        <div className="elements__card-container">
            <h2 className="elements__title">{card.name}</h2>
            <div>
                <button className={cardLikeButton} onClick={handleLikeClick} type="button"></button>
                <p className="elements__like-counter">{card.likes.length}</p>
            </div>  
        </div>
        {isOwn && <button className="elements__delete" onClick={handleDeleteClick} />}
    </li>
    </CurrentUserContext.Provider>

  )
}

export default Card;