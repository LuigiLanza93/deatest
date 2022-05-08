import React from "react";
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import ContactForm from './contactFormComponent';
import LoginModal from './loginModalComponent';

gsap.registerPlugin(ScrollToPlugin)

function HomeCurriculum(props) {

  const goToNextSection = (event, element) => {
    event.preventDefault();
    const nextSection = element.closest('section').nextElementSibling;
    let offsetHeight;
    if (document.querySelector('.headerComponent')) {
      offsetHeight = document.querySelector('.headerComponent').clientHeight;
    }
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: nextSection,
        offsetY: offsetHeight,
        autoKill: false
      }
    });
  }
  const Visual = () => {
    return (
      <section className="HomeCurriculum_visual">
        <div className="HomeCurriculum_visual-content">
          <h1>Welcome<br />to my<br />resume</h1>
          <a href="#" onClick={(event) => { goToNextSection(event, event.target) }}>Let's check it out! <FontAwesomeIcon icon={faArrowDown} /></a>
        </div>
      </section>
    )
  }
  const CurriculumBody = () => {
    return (
      <section className="HomeCurriculum_body">
        <div className="container">
          <div className="HomeCurriculum_body-title">
            <h2>About Me</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, leo ut condimentum congue, orci mauris vestibulum dui, vestibulum blandit nisl leo a eros. Nam malesuada condimentum metus eu volutpat. Aenean malesuada tempus mi, eu volutpat justo rhoncus quis.
            </p>
            <p>
              <strong>Born in:</strong> 10/12/1993 - <strong>Living in:</strong> Milan - <strong>Working @:</strong> M&C Saatchi - Milano
            </p>
          </div>
        </div>
        <div className="container">
          <div className="HomeCurriculum_body-wrapper">
            <div className="HomeCurriculum_body-wrapper_column">
              <h2>Formation</h2>
              <div className="HomeCurriculum_body-wrapper_column__row">
                <h4 className="duration">10/2015 - 09/2016</h4>
                <h3 className="title">Graphic Designer</h3>
                <p className="description">Digital Shark Academy</p>
              </div>
            </div>
            <div className="HomeCurriculum_body-wrapper_column">
              <h2>Working Experience</h2>
              <div className="HomeCurriculum_body-wrapper_column__row">
                <h4 className="duration">27/11/2017 - NOW</h4>
                <h3 className="title">Front-End Developer</h3>
                <p className="description">M&C Saatchi</p>
              </div>
              <div className="HomeCurriculum_body-wrapper_column__row">
                <h4 className="duration">20/03/2017 - 21/07/2017</h4>
                <h3 className="title">Web Designer</h3>
                <p className="description">Rossi Web Media</p>
              </div>
            </div>
            <div className="HomeCurriculum_body-wrapper_column">
              <h2>Skills</h2>
              <div className="HomeCurriculum_body-wrapper_column__row">
                <h3 className="title">Development Skills</h3>
                <p className="description">HTML5 / Pug / XML / GreenSock GSAP / Webpack / React / Javascript / JSON / jQuery / Node / Bootstrap / SASS / LESS / CSS / Wordpress / Git / Grunt / Gulp</p>
                <h3 className="title">Design Skills</h3>
                <p className="description">Photoshop / Illustrator / Sketch / InVision</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }



  return (
    <div className="HomeCurriculum">
      <Visual />
      <CurriculumBody />
      <ContactForm />
      <LoginModal isLoggedCheck={props.isLoggedCheck} />
    </div>
  );
}

export default HomeCurriculum;