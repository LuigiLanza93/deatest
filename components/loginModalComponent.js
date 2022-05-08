import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loginError: false,
        }

        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.enableLoginCta = this.enableLoginCta.bind(this);
        this.disableLoginCta = this.disableLoginCta.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.loginHandleSubmit = this.loginHandleSubmit.bind(this);
    }

    componentDidMount = () => {
        this.disableLoginCta();
    }

    componentDidUpdate = () => {
        this.enableLoginCta();
    }

    closeLoginModal = () => {
        const loginModal = document.querySelector('.login-wrapper');
    
        if (loginModal.classList.contains('openModal')) {
            loginModal.classList.remove('openModal');
        }
      }

    enableLoginCta = () => {
        if (this.state.usernameValidate && this.state.passwordValidate) {
            const loginForm = document.querySelector('.LoginModal form');
            if (loginForm) {
                const loginFormCta = loginForm.querySelector('.cta');
                if (loginFormCta.hasAttribute('disabled')) {
                    loginFormCta.removeAttribute('disabled');
                }
            }
        } else {
            this.disableLoginCta();
        }
    }
    disableLoginCta = () => {
        const loginForm = document.querySelector('.LoginModal form');
        if (loginForm) {
            const loginFormCta = loginForm.querySelector('.cta');

            if (!loginFormCta.getAttribute('disabled')) {
                loginFormCta.setAttribute('disabled', true);
            }
        }
    }
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })

        const toInvalidateValue = `${target.id}Validate`;
        if (this.state[toInvalidateValue]) {
            this.setState({
                [toInvalidateValue]: false
            })
        }
    }
    validateField = (field) => {
        console.log(field);
        const fieldValue = field.value;
        const toValidateValue = `${field.id}Validate`;
        console.log(toValidateValue);
        if (!this.state[toValidateValue] && fieldValue != '') {
            this.setState({
                [toValidateValue]: true
            }, () => {
                console.log(this.state);
            })
        } else {
            this.setState({
                [toValidateValue]: false
            }, () => {
                console.log(this.state);
            })
        }
    }


    loginHandleSubmit = (e) => {
        e.preventDefault();
        if (this.state.username === 'admin' && this.state.password === 'admin') {
            
            this.props.isLoggedCheck(true)
            // this.props.isLoggedCheck(true);
            // this.closeLoginModal();
        }else{
            this.setState({
                loginError: true,
            })
        }
    }


    render() {
        return (
            <div className='login-wrapper'>
                <div className="LoginModal">
                    <div className='closeIcon' onClick={() => {this.closeLoginModal()}}><FontAwesomeIcon icon={faXmark} /></div>

                    <h2>Login</h2>
                    <p>Use the value <strong>admin</strong> for both Username and Password</p>

                    <div className='LoginModal-wrap'>
                        <form onSubmit={this.loginHandleSubmit}>
                            <div className='inputContainer'>
                                <input id="username" name='username' autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.username} required onChange={this.handleInputChange} onBlur={(event) => {this.validateField(event.target)}}></input>
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className='inputContainer'>
                                <input id="password" name='password' autoComplete="off" placeholder=" " type="password" min="0" max="50" value={this.state.password} required onChange={this.handleInputChange} onBlur={(event) => {this.validateField(event.target)}}></input>
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className='cta' type="submit">Log in</button>
                            {this.state.loginError ? <p className='errorResult'>Username and password must have <strong>admin</strong> as value!</p> : <></>}
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default LoginModal;