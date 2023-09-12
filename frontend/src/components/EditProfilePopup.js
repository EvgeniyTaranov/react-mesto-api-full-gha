import React, { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onUpdateProfile, onClose }) {
    const currentUser = useContext(CurrentUserContext);
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setAbout(currentUser.about);
        }
    }, [currentUser, isOpen]);

    useEffect(() => {
        setIsSubmitDisabled(!name || !about);
    }, [name, about]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateProfile({
            name: name,
            about: about,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="editProfileForm"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isSubmitDisabled={isSubmitDisabled}
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
                    value={about}
                    onChange={handleChangeAbout}
                />
                <span className="about-field-error popup__field-error" />
            </div>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
