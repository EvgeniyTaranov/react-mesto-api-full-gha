import React, { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    };

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="editProfileForm"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonLabel="Сохранить"
        >
            <div className="popup__fieldset">
                <input
                    id="name-field"
                    name="name"
                    type="text"
                    placeholder="Введите имя"
                    required=""
                    minLength={2}
                    maxLength={40}
                    className="popup__field popup__field_input_name"
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="name-field-error popup__field-error" />
                <input
                    id="about-field"
                    name="about"
                    type="text"
                    placeholder="Укажите род занятий"
                    required=""
                    minLength={2}
                    maxLength={200}
                    className="popup__field popup__field_input_about"
                    value={description}
                    onChange={handleChangeDescription}
                />
                <span className="about-field-error popup__field-error" />
            </div>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
