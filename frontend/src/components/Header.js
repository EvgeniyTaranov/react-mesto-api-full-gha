import mestoWhiteLogo from '../images/mesto-white-logo.svg';

const Header = () => {

  return (
    <header className="header">
      <img
        src={mestoWhiteLogo}
        alt="Белый логотип Место"
        className="header__logo"
      />
    </header>
  );
};

export default Header;
