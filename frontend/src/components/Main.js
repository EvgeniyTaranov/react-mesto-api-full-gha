import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

const Main = ({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDislike,
  onCardDelete
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser && currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__header-block">
            <h1 className="profile__name">{currentUser && currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Изменить"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__about">{currentUser && currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDislike={onCardDislike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
