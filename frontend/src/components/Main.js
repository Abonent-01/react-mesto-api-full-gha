import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

    function Main({
        cards,
        onEditProfile,
        onAddPlace,
        onEditAvatar,
        onCardClick,
        onCardDelete,
        onCardLike,
    }) {
        const { name, about, avatar } = useContext(CurrentUserContext);
    
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img className="profile__image" src={avatar} alt={name}/>
                </div>
                <div className="profile__info">
                    <div className="profile__info-container">
                        <h1 className="profile__title">{name}</h1>
                        <button className="profile__button-edit" title="Редактировать профиль" type="button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{about}</p>
                </div>
                <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;