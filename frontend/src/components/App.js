import React, { useState, useEffect } from 'react';
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

const App = () => {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
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

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

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

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header />
                    <Main
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDislike={handleCardDislike}
                        onCardDelete={handleCardDelete}
                    />
                    <Footer />
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
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </div>
            </CurrentUserContext.Provider>
        </>
    );
};

export default App;
