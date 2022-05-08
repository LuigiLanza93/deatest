import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.openLoginModal = this.openLoginModal.bind(this);
  }

  openLoginModal = () => {
    const loginModal = document.querySelector('.login-wrapper');
    loginModal.classList.add('openModal');
  }
  handleLogOut = () => {
    sessionStorage.clear();
    window.location.href = '/';
  }

  render() {
    let isLogged = this.props.isLogged;
    if (isLogged === null) {
      isLogged = false;
    }
    const pathName = window.location.pathname;

    return (
      <div className="headerComponent">
        <div className="headerComponent-header">
          <div className="headerComponent-header_logo">
            <a href="/">Luigi Lanza's CV</a>
          </div>
          <div className="headerComponent-header_menu">
            {
              isLogged && pathName != '/editor' ? <a href="/editor">Editor</a>
              : ''
            }
            {
              isLogged ? <a href="#" id="logoutButton" onClick={() => { this.handleLogOut() }}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout</a>
              : <a href="#" id="loginButton" onClick={() => { this.openLoginModal() }}><FontAwesomeIcon icon={faArrowRightToBracket} /> Login</a>
            }
          </div>
        </div>
        {!isLogged && pathName === '/editor' ? <div className="notLoggedError"><p>You must be logged in to access the <strong>Editor's page</strong>!</p></div> : ''}
      </div>
    );
  }
}

export default Header;