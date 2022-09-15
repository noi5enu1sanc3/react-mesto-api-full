import logo from "../images/logo.svg";
import { Route, Link } from "react-router-dom";

function Header({ userEmail, onLogOut }) {
  return (
    <header className="header">
      <input className="burger-menu" id="burger-menu" type="checkbox" />
      <label htmlFor="burger-menu" className="burger-menu__elements">
        <span className="burger-menu__element" />
      </label>
      <img src={logo} alt="логотип проекта Место" className="header__logo" />
      <div className="header__link-container">
        <Route path="/signin">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/signup">
          <Link to="/signin" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <p className="header__email">{userEmail}</p>
          <button className="header__logout-btn" onClick={onLogOut}>
            Выйти
          </button>
        </Route>
      </div>
    </header>
  );
}

export default Header;
