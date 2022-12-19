import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'nprogress/nprogress.css';

export const Router = () => {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ToastContainer />
        <Routes>

        </Routes>
      </BrowserRouter>
    </>
  )
}