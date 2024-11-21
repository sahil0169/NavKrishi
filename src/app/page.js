
"use client"
import { push, ref } from 'firebase/database';
import { database } from './firebase/firebase';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/home';
import Accordion1 from './components/accordion1';
import Footer from './components/Footer'

export default function Home1() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  return (
    <main>
      <Navbar />
      <Home />
      <Accordion1 />
      <Footer/>
    </main>
  )
}