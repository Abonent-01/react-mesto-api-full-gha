import React from 'react';
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
/*import PopupWithForm from './PopupWithForm';*/
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Register from './Register.js';
import Login from './Login';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [email, setEmail] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
    const [tooltipMessage, setTooltipMessage] = useState('')
    const [tooltipIcon, setTooltipIcon] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
      if (loggedIn) {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
          .then(([user, card]) => {
            setCurrentUser(user);
            setCards(card);
          })
          .catch((err) => alert(err))
      }
    }, [loggedIn]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsInfoTooltipPopupOpen(false);
    }

    function onRegister() {
      setTooltipMessage("Вы успешно зарегистрировались!");
      setTooltipIcon("success");
      setIsInfoTooltipPopupOpen(true);
    }
  
    function handleError() {
      setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
      setTooltipIcon("error");
      setIsInfoTooltipPopupOpen(true);
    }
  
   /* function checkToken() {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt)
          .then((res) => {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/");
          })
          .catch(err => console.log(err));
      }
    }
  
    useEffect(() => {
      checkToken();
    }, []);
  */

    useEffect(() => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        auth.getContent(jwt)
          .then((res) => {
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true });
          })
          .catch(err => console.log(err));
      }
    }, [navigate]);
  


    function handleLogin(password, email) {
      auth.authorize(password, email)
        .then(res => {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true);
          navigate("/")
        })
        .catch(err => {
          handleError();
          console.log(err);
        });
    }
  
    function handleRegistration(password, email) {
      auth.register(password, email)
        .then(() => {
          navigate("/signin");
          onRegister();
        })
        .catch(err => {
          handleError();
          console.log(err);
        });
    }
  
    function logOut() {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
    }

    function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      api
        .likeCard(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => alert(err));
    }

    function handleCardDelete(card) {
      api
        .deleteCard(card._id)
        .then(() => {
          setCards(state => state.filter((c) => c._id !== card._id));
        })
        .catch((err) => alert(err));
    }

    function handleUpdateAvatar(value) {
      api
        .updateUserAvatar(value)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => alert(err));
    }

    function handleUpdateUser(value) {
      api
        .updateUserProfile(value)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => alert(err));
    }

    function handleAddPlaceSubmit(card) {
      api
        .postCard(card)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch((err) => alert(err));
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} logOut={logOut} loggedIn={loggedIn} />
        <Routes>
          <Route
            path='/'
            element={<ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onUpdateAvatar={handleUpdateAvatar}
            />}
          />

          <Route path="/sign-in" element={<Login onLogin={handleLogin} setEmail={setEmail} />} />

          <Route path="/sign-up" element={<Register onRegister={handleRegistration} />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
         />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        /> 

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        
        <InfoTooltip
          message={tooltipMessage}
          tooltipIcon={tooltipIcon}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
