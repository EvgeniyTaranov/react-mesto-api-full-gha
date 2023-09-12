import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import successfulAttemptImage from "../images/succesful-auth.svg";
import failedAttemptImage from "../images/failed-auth.svg";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [registrationResult, setRegistrationResult] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        handleTokenCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleUpdateUser({ name, about }) {
        api.editProfile(name, about)
            .then(result => {
                setCurrentUser(result.data);
                closeAllPopups();
            })
            .catch(error => {
                console.log('Ошибка...:', error);
            });
    }

    const handleInfoTooltipOpen = () => {
        setIsInfoTooltipOpen(true);
    }

    function onEditProfile() {
        setIsEditProfilePopupOpen(true);
    }

    function onAddPlace() {
        setIsAddPlacePopupOpen(true);
    }

    function onEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    }

    function onConfirmationPopup() {
        setIsConfirmationPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        api.addLike(card._id)
            .then(updatedCard => {
                const updatedCards = cards.map(c => (c._id === card._id ? updatedCard.data : c));
                setCards(updatedCards);
            })
            .catch(error => {
                console.log('Ошибка...:', error);
            });
    }

    function handleCardDislike(card) {
        api.deleteLike(card._id)
            .then(updatedCard => {
                const updatedCards = cards.map(c => (c._id === card._id ? updatedCard.data : c));
                setCards(updatedCards);
            })
            .catch(error => {
                console.log('Ошибка...:', error);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter(item => item._id !== card._id));
            })
            .catch(error => {
                console.log('Ошибка...:', error);
            });
    }

    function handleUpdateAvatar(newAvatar) {
        api.updateUserPic(newAvatar.avatar)
            .then((result) => {
                setCurrentUser(result.data);
                closeAllPopups();
            })
            .catch((error) => {
                console.log('Ошибка...:', error);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data.name, data.link)
            .then(newCard => {

                setCards([newCard.data, ...cards]);
                setIsAddPlacePopupOpen(false);
            })
            .catch(error => {
                console.log('Ошибка...:', error);
            });
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard(null);
    }

    function handleRegistration(registerData) {
        auth.register(registerData.email, registerData.password)
            .then((res) => {
                navigate('/sign-in', { replace: true })
                setRegistrationResult(true);
                handleInfoTooltipOpen();
            })
            .catch((err) => {
                console.log('Ошибка...:', err);
                setRegistrationResult(false);
                handleInfoTooltipOpen()
            })
    };

    function handleLogin(loginData) {
        auth.login(loginData.email, loginData.password).then((res) => {
            handleTokenCheck();
        })
            .catch((err) => {
                console.log('Ошибка...:', err);
                setRegistrationResult(false);
                handleInfoTooltipOpen()
            })
    }

    function handleTokenCheck() {
        auth.checkToken().then((res) => {
            navigate('/', { replace: true });
            setLoggedIn(true);
            setEmail(res.email);

            api.getProfile()
                .then(data => {
                    setCurrentUser(data);
                    api.getCards()
                        .then(data => {
                            setCards(data);
                        })
                        .catch(error => {
                            console.log('Ошибка...:', error);
                        });
                })
                .catch(error => {
                    console.log('Ошибка...:', error);
                });

        }).catch((err) => {
            setEmail('');
            setLoggedIn(false);
        });
    }

    function handleExit() {
        auth.logout();
        setEmail('');
        setLoggedIn(false)
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    email={email}
                    onExit={handleExit}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRouteElement
                                element={Main}
                                loggedIn={loggedIn}
                                onAddPlace={onAddPlace}
                                isAddPlacePopupOpen={isAddPlacePopupOpen}
                                onEditProfile={onEditProfile}
                                isEditProfilePopupOpen={isEditProfilePopupOpen}
                                onEditAvatar={onEditAvatar}
                                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                                onCardClick={handleCardClick}
                                onCardDelete={handleCardDelete}
                                onCardLike={handleCardLike}
                                onCardDislike={handleCardDislike}
                                onConfirmationPopup={onConfirmationPopup}
                                cards={cards}
                            />
                        }
                    />
                    <Route path='/sign-up' element={
                        <Register
                            onSubmit={handleRegistration} />
                    } />
                    <Route path='/sign-in' element={
                        <Login
                            onSubmit={handleLogin} />
                    } />
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
                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    result={registrationResult}
                />
                <PopupWithForm
                    title="Уверены?"
                    name="confirmation"
                    isOpen={isConfirmationPopupOpen}
                    onClose={closeAllPopups}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
};

export default App;
