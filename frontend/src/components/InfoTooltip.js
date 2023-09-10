import failedAttemptImage from "../images/failed-auth.svg";
import successfulAttemptImage from "../images/succesful-auth.svg";

function InfoTooltip({ isOpen, onClose, result }) {

    return (
        <div className={`popup popup__info-tooltip ${isOpen && 'popup_opened'}`}>
            <form className="popup__form">
                <div className="popup__container">
                    <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                    <div className="popup__notification" style={result ? { backgroundImage: `url(${successfulAttemptImage})` } : { backgroundImage: `url(${failedAttemptImage})` }} />
                    <h3 className="popup__header popup__header_type_info-tooltip">{result ? "Вы зарегистрированы!" : "Ошибка! Попробуйте ещё раз."}</h3>
                </div>
            </form>
        </div>
    )
}

export default InfoTooltip;
