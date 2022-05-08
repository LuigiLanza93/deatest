import React, { Component } from 'react';

class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            subject: '',
            email: '',
            destinationEmail: '',
            message: '',
            mailSent: false,
            error: null
        }
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.errorCheck = this.errorCheck.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount = () => {
        this.disableButton();
        this.errorCheck();
    }
    componentDidUpdate() {
        this.enableButton();
    }
    enableButton = () => {
        if (this.state.nameValidate && this.state.subjectValidate && this.state.emailValidate && this.state.messageValidate) {
            const formSection = document.querySelector('.ContactForm');
            if (formSection) {
                const formSectionForm = formSection.querySelector('form');
                const formSectionFormCta = formSectionForm.querySelector('.cta');
                if (formSectionFormCta.hasAttribute('disabled')) {
                    formSectionFormCta.removeAttribute('disabled');
                }
            }
        } else {
            this.disableButton();
        }
    }
    disableButton = () => {
        const formSection = document.querySelector('.ContactForm');
        if (formSection) {
            const formSectionForm = formSection.querySelector('form');
            const formSectionFormCta = formSectionForm.querySelector('.cta');

            if (!formSectionFormCta.getAttribute('disabled')) {
                formSectionFormCta.setAttribute('disabled', true);
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
        const toValidateValue = `${field.id}Validate`;
        console.log(toValidateValue);
        if (!this.state[toValidateValue]) {
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

    errorCheck = () => {
        const form = document.querySelector('.ContactForm form');
        const inputContainers = form.querySelectorAll('.inputContainer');
        inputContainers.forEach(inputContainer => {
            let inputContainerField = inputContainer.querySelector('input')
            if (!inputContainerField) {
                inputContainerField = inputContainer.querySelector('textarea')
            }

            inputContainerField.addEventListener('focus', () => {
                if (inputContainer.classList.contains('error')) {
                    inputContainer.classList.remove('error');
                }
            })
            inputContainerField.addEventListener('blur', () => {
                const stringFormat = /^[a-zA-Z\s]+$/g;
                const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (inputContainerField.id === 'name' && !stringFormat.test(this.state.name)
                    || inputContainerField.id === 'subject' && !stringFormat.test(this.state.subject)
                    || inputContainerField.id === 'email' && !mailFormat.test(this.state.email)
                    || inputContainerField.id === 'destinationEmail' && !mailFormat.test(this.state.email)
                    || inputContainerField.value === '') {
                    inputContainer.classList.add('error');
                } else if (inputContainerField.value !== '') {
                    this.validateField(inputContainerField);
                }
            })
        })
    }


    handleFormSubmit = (e) => {
        e.preventDefault();
        const mailerPath = `https://www.luigilanza.com/form.php`;
        let data = `name=${this.state.name}&subject=${this.state.subject}&email=${this.state.email}&destinationEmail=${this.state.destinationEmail}&message=${this.state.message}`
            console.log(data);

        const xmlhttp = new XMLHttpRequest();

        xmlhttp.open("POST", mailerPath, true);

        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xmlhttp.send(data);

        xmlhttp.onload = () => {
            this.setState({
                mailSent: true,
            })
        }
        xmlhttp.onerror = () => {
            this.setState({
                error: true,
            })
        }
    };

    render() {
        return (
            <section className="ContactForm">
                <div className='container'>
                    <div className="ContactForm-title">
                        <h2>Let's get in touch!</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, leo ut condimentum congue, orci mauris vestibulum dui, vestibulum blandit nisl leo a eros. Nam malesuada condimentum metus eu volutpat. Aenean malesuada tempus mi, eu volutpat justo rhoncus quis.
                        </p>
                        <p>
                            <strong>Phone:</strong> 3393369651 - <strong>Email:</strong> <a href="mailto: luigilanza93@gmail.com">luigilanza93@gmail.com</a>
                        </p>
                    </div>
                </div>
                <div className='container'>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className='formTopWrapper'>
                            <div className='inputContainer'>
                                <input id="name" name='name' autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.name} required onChange={this.handleInputChange}></input>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className='inputContainer'>
                                <input id="email" name='email' autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.object} required onChange={this.handleInputChange}></input>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className='formTopWrapper'>
                            <div className='inputContainer'>
                                <input id="subject" name='subject' autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.object} required onChange={this.handleInputChange}></input>
                                <label htmlFor="subject">Subject</label>
                            </div>
                            <div className='inputContainer'>
                                <input id="destinationEmail" name='destinationEmail' autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.object} required onChange={this.handleInputChange}></input>
                                <label htmlFor="destinationEmail">Destination email</label>
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <textarea id="message" name='message' autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.object} required onChange={this.handleInputChange}></textarea>
                            <label htmlFor="message">Message</label>
                        </div>

                        <button className='cta' type="submit">Send message</button>

                        {this.state.mailSent ? <p className='successResult'>Thank you, your email has been delivered to <strong>{this.state.destinationEmail}</strong>!</p> : <></>}
                        {this.state.error ? <p className='errorResult'>We are sorry, there was a problem delivering your email. Please try again leter.</p> : <></>}
                    </form>
                </div>
            </section>
        )
    }
}

export default ContactForm;