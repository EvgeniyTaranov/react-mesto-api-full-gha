import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
          name,
          link,
        });
      };
      

    return (
        <PopupWithForm
            title="Новое место"
            name="addNewCardForm"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonLabel="Сохранить"
        >
            <div className="popup__fieldset">
                <input
                    id="place-field"
                    name="nameOfPlaceInput"
                    type="text"
                    placeholder="Название"
                    required=""
                    minLength={2}
                    maxLength={30}
                    className="popup__field popup__field_input_name"
                    value={name}
                    onChange={handleNameChange}
                />
                <span className="place-field-error popup__field-error" />
                <input
                    id="link-field"
                    name="imageLinkInput"
                    type="url"
                    placeholder="Ссылка на картинку"
                    required=""
                    className="popup__field popup__field_input_about"
                    value={link}
                    onChange={handleLinkChange}
                />
                <span className="link-field-error popup__field-error" />
            </div>
        </PopupWithForm>
    );
};

export default AddPlacePopup;
