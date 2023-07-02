import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import AddRecipe from './components/AddRecipe';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Indian from './components/Indian';
import American from './components/American';
import Italian from './components/Italian';
import Chinese from './components/Chinese';



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<AddRecipe/>} />
        <Route path='/indiancuisine' element={<Indian/>} />
        <Route path='/americancuisine' element={<American/>} />
        <Route path='/italiancuisine' element={<Italian/>} /> 
        <Route path='/chinesecuisine' element={<Chinese/>} />   
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
