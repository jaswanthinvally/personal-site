import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './assets/Pages/Home'
import About from './assets/Pages/About'
import Error from './assets/Pages/Error'
import Projects from './assets/Pages/Projects'
import Blog from './assets/Pages/Blog'
import BlogPost from './assets/Pages/BlogPost'
import Contact from './assets/Pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
