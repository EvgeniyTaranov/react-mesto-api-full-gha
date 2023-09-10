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

const App = () => {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [registrationResult, setRegistrationResult] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setIsConfirmationPopupOpen(false);
        setSelectedCard(null);
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await api.getProfile();
                setCurrentUser(response);
            } catch (error) {
                console.log(error);
            }
        };

        getUserInfo();
    }, []);

    useEffect(() => {
        const getCards = async () => {
            try {
                const response = await api.getCards();
                setCards(response);
            } catch (error) {
                console.log(error);
            }
        };

        getCards();
    }, []);

    useEffect(() => {
        handleTokenCheck();
    }, []);

    function onEditProfile() {
        setIsEditProfilePopupOpen(true);
    }

    function onAddPlace() {
        setIsAddPlacePopupOpen(true);
    }

    function onEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    function onConfirmationPopup() {
        setIsConfirmationPopupOpen(true);
    }

    const handleInfoTooltipOpen = () => {
        setIsInfoTooltipOpen(true);
    };

    function handleTokenCheck() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            auth.checkToken(token)
                .then((res) => {
                    setLoggedIn(true);
                    setEmail(res.data.email);
                    navigate('/', { replace: true });
                })
                .catch((err) => {
                    console.log('Ошибка:', err);
                });
        }
    }

    function handleLogin(loginData) {
        auth.login(loginData.email, loginData.password)
            .then((res) => {
                localStorage.setItem('token', res.token);
                handleTokenCheck();
            })
            .catch((err) => {
                console.log('Ошибка...:', err);
                setRegistrationResult(false);
                handleInfoTooltipOpen();
            });
    }

    const handleCardLike = async (card) => {
        const isLiked = card.likes.some((like) => like._id === currentUser._id);

        try {
            let updatedCard;

            if (isLiked) {
                updatedCard = await api.deleteLike(card._id);
            } else {
                updatedCard = await api.addLike(card._id);
            }

            setCards((prevCards) =>
                prevCards.map((c) => (c._id === card._id ? updatedCard : c))
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleCardDislike = async (card) => {
        const isLiked = card.likes.some((like) => like._id === currentUser._id);

        try {
            let updatedCard;

            if (isLiked) {
                updatedCard = await api.deleteLike(card._id);
            } else {
                updatedCard = await api.addLike(card._id);
            }

            setCards((prevCards) =>
                prevCards.map((c) => (c._id === card._id ? updatedCard : c))
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleCardDelete = (cardToDelete) => {
        api.deleteCard(cardToDelete._id)
            .then(() => {
                setCards((prevCards) => prevCards.filter((card) => card._id !== cardToDelete._id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleUpdateUser = async (userData) => {
        try {
            const updatedUser = await api.editProfile(userData.name, userData.about);
            setCurrentUser(updatedUser);
            closeAllPopups();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateAvatar = async (avatarData) => {
        try {
            const updatedUser = await api.updateUserPic(avatarData.avatar);
            setCurrentUser(updatedUser);
            closeAllPopups();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddPlaceSubmit = (newCardData) => {
        api.addCard(newCardData.name, newCardData.link)
            .then((newCard) => {
                setCards((prevCards) => [newCard, ...prevCards]);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function handleRegistration(registerData) {
        auth.register(registerData.email, registerData.password)
            .then((res) => {
                navigate('/sign-in', { replace: true });
                setRegistrationResult(true);
                handleInfoTooltipOpen();
            })
            .catch((err) => {
                console.log('Ошибка...:', err);
                setRegistrationResult(false);
                handleInfoTooltipOpen();
            });
    }

    function handleExit() {
        localStorage.removeItem('token');
        setEmail('');
        setLoggedIn(false);
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
