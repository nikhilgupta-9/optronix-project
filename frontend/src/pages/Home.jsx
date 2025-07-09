import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomerForm from './CustomerForm';
import '../styles/Home.css';

const Home =()=>{
  return(
    <>
    
      <Header />
      <main className='hero-section'>
        <CustomerForm />
      </main>
      <Footer />
    </>
  )
}

export default Home;