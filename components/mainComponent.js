import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './headerComponent';
import HomeCurriculum from './homeCurriculumComponent';
import EditorPage from "./editorPageComponent";

import "./styles/mainComponent.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    }

    this.isLoggedCheck = this.isLoggedCheck.bind(this);
  }

  isLoggedCheck = (value) => {
    this.setState({
      isLoggedIn: value
    }, () => {
      console.log(this.state);
      if (this.state.isLoggedIn) {
        sessionStorage.setItem('isLoggedIn', true);
        window.location.href = '/editor';
      }
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header isLogged={sessionStorage.getItem('isLoggedIn')} />
          <Routes>
            <Route path="/" element={<HomeCurriculum isLoggedCheck={this.isLoggedCheck} />} />
            <Route path="/editor" element={sessionStorage.getItem('isLoggedIn') ? <EditorPage /> : <HomeCurriculum isLoggedCheck={this.isLoggedCheck} />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;