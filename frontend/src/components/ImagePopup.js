const ImagePopup = ({ card, onClose }) => {

    return (
        <div className={`image-popup popup ${card ? 'popup_opened' : ''}`}>
            <div className="image-popup__container">
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                <img className="image-popup__image" src={card?.link} alt={card?.name} />
                <h3 className="image-popup__title">{card?.name}</h3>
            </div>
        </div>
    );
};

export default ImagePopup;
