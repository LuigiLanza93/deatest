import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faFloppyDisk, faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';

class EditorPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formationCategory: [
                {
                    isEditing: false,
                    startDate: '10/2015',
                    endDate: '09/2016',
                    role: 'Graphic Designer',
                    company: 'Digital Shark Academy'
                }
            ],
            workCategory: [
                {
                    isEditing: false,
                    startDate: '27/11/2017',
                    endDate: 'NOW',
                    role: 'Front-End Developer',
                    company: 'M&C Saatchi'
                },
                {
                    isEditing: false,
                    startDate: '20/03/2017',
                    endDate: '21/07/2017',
                    role: 'Web Designer',
                    company: 'Rossi Web Media'
                }
            ],
            skillsCategory: [
                {
                    isEditing: false,
                    skillName: 'HTML'
                },
                {
                    isEditing: false,
                    skillName: 'Pug'
                },
                {
                    isEditing: false,
                    skillName: 'XML'
                }
            ],
            newElement: {
                isEditing: '',
                startDate: '',
                endDate: '',
                role: '',
                company: '',
                skillName: '',
            },
            activeCategory: 'formation',
        }

        this.handleActiveMenu = this.handleActiveMenu.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.renderInfoBuild = this.renderInfoBuild.bind(this);
    }

    componentDidMount = () => {
        this.handleActiveMenu();
    }

    openMenu = () => {
        const burgerMenu = document.querySelector('.EditorPage-body_menuButton');
        const menu = document.querySelector('.EditorPage-body_menu');
        if (window.getComputedStyle(burgerMenu).display != 'none') {
            if(burgerMenu.classList.contains('active')){
                burgerMenu.classList.remove('active')
            }else{
                burgerMenu.classList.add('active')
            }
            
            if(menu.classList.contains('menuOpen')){
                menu.classList.remove('menuOpen')
            }else{
                menu.classList.add('menuOpen')
            }
        }
    }
    handleActiveMenu = () => {
        const activeCategory = this.state.activeCategory;
        if (document.querySelector('.EditorPage-body_menu-category.active')) {
            document.querySelector('.EditorPage-body_menu-category.active').classList.remove('active')
        }
        document.querySelector('#'+activeCategory).classList.add('active')
    }

    handleInputChange = (event, activeCategory, i) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (activeCategory === 'newElement') {
            var stateCopy = Object.assign({}, this.state);
            stateCopy[activeCategory][name] = value;
            this.setState(stateCopy, () => {
                console.log(this.state);
            })
        }else{
            var stateCopy = Object.assign({}, this.state);
            stateCopy[activeCategory][i][name] = value;
    
            this.setState(stateCopy)
        }
    }

    changeCategory = (e, category) => {
        e.preventDefault();
        var stateCopy = Object.assign({}, this.state);
            stateCopy.newElement.isEditing = false;
            stateCopy.activeCategory = category;
        this.setState(stateCopy, () => {
            console.log(this.state);
            this.handleActiveMenu();
            this.openMenu();
        })
    }

    enabledEditMode = (activeCategory, i) => {
        var stateCopy = Object.assign({}, this.state);
        stateCopy[activeCategory][i].isEditing = true;

        this.setState(stateCopy)
    }
    saveDetailInfo = (activeCategory, i) => {
        var stateCopy = Object.assign({}, this.state);
        stateCopy[activeCategory][i].isEditing = false;

        this.setState(stateCopy)
    }

    removeInfo = (activeCategory, i) => {
        console.log(activeCategory);
        var stateCopy = Object.assign({}, this.state);
        stateCopy[activeCategory] = stateCopy[activeCategory].filter((_, index) => index !== i);

        this.setState(stateCopy)
    }

    addNewElement = () => {
        var stateCopy = Object.assign({}, this.state);
            stateCopy.newElement.isEditing = true;
            this.setState(stateCopy, () => {
                console.log(this.state);
        })
    }
    saveNewelement = (actualCategory, i) => {
        var stateCopy = Object.assign({}, this.state);
            stateCopy.newElement.isEditing = false;
            if (this.state.newElement.startDate != '' || this.state.newElement.endDate != '' || this.state.newElement.role != '' || this.state.newElement.company != '' || this.state.newElement.skillName != '') {
                stateCopy[actualCategory][i] = {...this.state.newElement};
                stateCopy.newElement.startDate = '';
                stateCopy.newElement.endDate = '';
                stateCopy.newElement.role = '';
                stateCopy.newElement.company = '';
                stateCopy.newElement.skillName = '';
            }
            this.setState(stateCopy, () => {
                console.log(this.state);
        })
    }

    renderInfoBuild = () => {
        const actualCategory = this.state.activeCategory + 'Category'
        const activeCategory = this.state[actualCategory];
        let toRenderInfo, finalPointer = 0, newElement;
        if (this.state.activeCategory === 'skills') {
            toRenderInfo = activeCategory.map((element, i) => {
                finalPointer = i;
                return (
                    <div key={i} className={`EditorPage-body_details-wrapper ${element.isEditing ? 'editMode' : ''}`}>
                        <div className='detail-editor-row'>
                            <div className='inputContainer'>
                                <input id={`skill${i}`} name={`skillName`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={element['skillName']} required onChange={(e) => { this.handleInputChange(e, actualCategory, i) }}></input>
                                <label htmlFor={`skill${i}`}>Skill</label>
                            </div>
                            <div className='save' onClick={() => { this.saveDetailInfo(actualCategory, i) }}>
                                {this.state[actualCategory].skillName === '' ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faFloppyDisk} />}
                                
                            </div>
                        </div>
                        <div className='detail-info-row'>
                            <div className='skill'>
                                <p>{element.skillName}</p>
                            </div>
                            <div className='actionsWrapper'>
                                <div className='edit' onClick={() => { this.enabledEditMode(actualCategory, i) }}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </div>
                                <div className='remove' onClick={() => { this.removeInfo(actualCategory, i) }}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            newElement = () => {
                finalPointer++;
                return(
                    <div key={finalPointer} className={`EditorPage-body_details-wrapper ${this.state.newElement.isEditing ? 'editMode' : ''}`}>
                        <div className='detail-editor-row'>
                        <div className='inputContainer'>
                            <input id={`skillName${finalPointer}`} name={`skillName`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.newElement['skillName']} required onChange={(e) => { this.handleInputChange(e, 'newElement') }}></input>
                            <label htmlFor={`skillName${finalPointer}`}>Skill</label>
                        </div>
                            <div className='save' onClick={() => { this.saveNewelement(actualCategory, finalPointer) }}>
                                {this.state.newElement.skillName === '' ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faFloppyDisk} />}
                                
                            </div>
                        </div>
                        <div className='detail-info-row'>
                            <div className='addNew' onClick={(e) => { this.addNewElement(e) }}>
                                <p><FontAwesomeIcon icon={faCirclePlus} /><strong> Add New Element</strong></p>
                            </div>
                        </div>
                    </div>
                )
            }
        } else {
            toRenderInfo = activeCategory.map((element, i) => {
                finalPointer = i;
                return (
                    <div key={i} className={`EditorPage-body_details-wrapper ${element.isEditing ? 'editMode' : ''}`}>
                        <div className='detail-editor-row'>
                            <div className='detail-editor-row_dateWrapper'>
                                <div className='inputContainer'>
                                    <input id={`startDate${i}`} name={`startDate`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={element['startDate']} required onChange={(e) => { this.handleInputChange(e, actualCategory, i) }}></input>
                                    <label htmlFor={`startDate${i}`}>Start</label>
                                </div>
                                <div className='inputContainer'>
                                    <input id={`endDate${i}`} name={`endDate`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={element['endDate']} required onChange={(e) => { this.handleInputChange(e, actualCategory, i) }}></input>
                                    <label htmlFor={`endDate${i}`}>End</label>
                                </div>
                            </div>
                            <div className='inputContainer'>
                                <input id={`role${i}`} name={`role`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={element['role']} required onChange={(e) => { this.handleInputChange(e, actualCategory, i) }}></input>
                                <label htmlFor={`role${i}`}>{activeCategory === 'work' ? 'Job Role' : 'Formation Role'}</label>
                            </div>
                            <div className='inputContainer'>
                                <input id={`company${i}`} name={`company`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={element['company']} required onChange={(e) => { this.handleInputChange(e, actualCategory, i) }}></input>
                                <label htmlFor={`company${i}`}>{activeCategory === 'work' ? 'Company' : 'School'}</label>
                            </div>
                            <div className='save' onClick={() => { this.saveDetailInfo(actualCategory, i) }}>
                                {(this.state[actualCategory].startDate === '' && this.state[actualCategory].endDate === '' && this.state[actualCategory].role === '' && this.state[actualCategory].company === '') ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faFloppyDisk} />}
                                
                            </div>
                        </div>
                        <div className='detail-info-row'>
                            <div className='date'>
                                <div className='startDate'>
                                    <p>{element.startDate} </p>
                                </div>
                                <div className='endDate'>
                                    <p>- {element.endDate}</p>
                                </div>
                            </div>
                            <div className='role'>
                                <p><strong>{element.role}</strong></p>
                            </div>
                            <div className='company'>
                                <p>{element.company}</p>
                            </div>
                            <div className='actionsWrapper'>
                                <div className='edit' onClick={() => { this.enabledEditMode(actualCategory, i) }}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </div>
                                <div className='remove' onClick={() => { this.removeInfo(actualCategory, i) }}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            newElement = () => {
                finalPointer++;
                return(
                    <div key={finalPointer} className={`EditorPage-body_details-wrapper ${this.state.newElement.isEditing ? 'editMode' : ''}`}>
                        <div className='detail-editor-row'>
                            <div className='detail-editor-row_dateWrapper'>
                                <div className='inputContainer'>
                                    <input id={`startDate${finalPointer}`} name={`startDate`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.newElement['startDate']} required onChange={(e) => { this.handleInputChange(e, 'newElement') }}></input>
                                    <label htmlFor={`startDate${finalPointer}`}>Start</label>
                                </div>
                                <div className='inputContainer'>
                                    <input id={`endDate${finalPointer}`} name={`endDate`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.newElement['endDate']} required onChange={(e) => { this.handleInputChange(e, 'newElement') }}></input>
                                    <label htmlFor={`endDate${finalPointer}`}>End</label>
                                </div>
                            </div>
                            <div className='inputContainer'>
                                <input id={`role${finalPointer}`} name={`role`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.newElement['role']} required onChange={(e) => { this.handleInputChange(e, 'newElement') }}></input>
                                <label htmlFor={`role${finalPointer}`}>{activeCategory === 'work' ? 'Job Role' : 'Formation Role'}</label>
                            </div>
                            <div className='inputContainer'>
                                <input id={`company${finalPointer}`} name={`company`} autoComplete="off" placeholder=" " type="text" min="0" max="50" value={this.state.newElement['company']} required onChange={(e) => { this.handleInputChange(e, 'newElement') }}></input>
                                <label htmlFor={`company${finalPointer}`}>{activeCategory === 'work' ? 'Company' : 'School'}</label>
                            </div>
                            <div className='save' onClick={(e) => { this.saveNewelement(actualCategory, finalPointer) }}>
                                {(this.state.newElement.startDate === '' && this.state.newElement.endDate === '' && this.state.newElement.role === '' && this.state.newElement.company === '') ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faFloppyDisk} />}
                                
                            </div>
                        </div>
                        <div className='detail-info-row'>
                            <div className='addNew' onClick={(e) => { this.addNewElement(e) }}>
                                <p><FontAwesomeIcon icon={faCirclePlus} /><strong> Add New Element</strong></p>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <>
                {toRenderInfo}
                {newElement()}
            </>
        )
    }

    render() {
        return (
            <section className='EditorPage'>
                <div className="container">
                    <div className="EditorPage-title">
                        <h2>Welcome to your editor page!</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, leo ut condimentum congue, orci mauris vestibulum dui, vestibulum blandit nisl leo a eros. Nam malesuada condimentum metus eu volutpat. Aenean malesuada tempus mi, eu volutpat justo rhoncus quis.
                        </p>
                    </div>
                </div>
                <div className='container'>
                    <div className='EditorPage-body'>
                        <div className='EditorPage-body_menuButton' onClick={() => {this.openMenu()}}><div className='burger'></div></div>
                        <div className='EditorPage-body_menu'>
                            <a href="#" className='EditorPage-body_menu-category' id="formation" onClick={(e) => { this.changeCategory(e, 'formation') }}>
                                Formation
                            </a>
                            <a href="#" className='EditorPage-body_menu-category' id="work" onClick={(e) => { this.changeCategory(e, 'work') }}>
                                Working experience
                            </a>
                            <a href="#" className='EditorPage-body_menu-category' id="skills" onClick={(e) => { this.changeCategory(e, 'skills') }}>
                                Skills
                            </a>
                        </div>
                        <div className='EditorPage-body_details'>
                            {this.renderInfoBuild()}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default EditorPage;