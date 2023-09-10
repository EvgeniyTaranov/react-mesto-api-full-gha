import React, { useContext, useState, useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState('');
  const avatarInputRef = useRef();

  useEffect(() => {
    setAvatar(currentUser?.avatar || '');
  }, [currentUser]);

  const handleChangeAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  };

  const isLinkValid = avatarInputRef.current?.validity.valid;

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editUserImage"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonLabel="Сохранить"
    >
      <div className="popup__fieldset">
        <input
          id="avatar-change"
          name="avatar"
          type="url"
          placeholder="Ссылка на новый аватар"
          required=""
          className="popup__field"
          value={avatar}
          onChange={handleChangeAvatar}
          ref={avatarInputRef}
        />
        <span className="avatar-change-error popup__field-error" />
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
