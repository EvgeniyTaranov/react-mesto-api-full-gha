import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDislike, onCardDelete }) => {
    const currentUser = useContext(CurrentUserContext);

    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
        if (isLiked) {
            onCardDislike(card);
        } else {
            onCardLike(card);
        }
    };

    const handleDeleteClick = () => {
        onCardDelete(card);
    };

    const isOwner = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    const cardLikeButtonClassName = `elements__like-button ${isLiked ? 'elements__like-button_type_active' : ''}`;

    return (
        <li className="elements__card">
            <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="elements__lower-block">
                <h2 className="elements__place">{card.name}</h2>
                <div className="elements__likes-container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label={isLiked ? 'Дизлайк' : 'Лайк'}
                        onClick={handleLikeClick}
                    />
                    <span className="elements__likes-counter">{card.likes.length}</span>
                </div>
            </div>
            {isOwner && (
                <button className="elements__trash-button" type="button" aria-label="Удалить" onClick={handleDeleteClick} />
            )}
        </li>
    );
};

export default Card;
