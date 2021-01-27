// Native modules import
import React  from 'react';
import {BrowserRouter} from 'react-router-dom'

// Components import
import MainRouter from './MainRouter';

const App = () => (
  <BrowserRouter>
    <MainRouter/>
  </BrowserRouter>
)

export default App;
