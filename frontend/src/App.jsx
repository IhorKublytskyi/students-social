import { BrowserRouter, Routes, Route } from 'react-router'

import NotFoundPage from './pages/NotFoundPage'

import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'
import AuthLayout from './layouts/AuthLayout'
import PageLayout from './layouts/PageLayout'

import { ActiveDropdownProvider } from './context/ActiveDropdownContext'

export default function App() {
    return (
        <ActiveDropdownProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />

                        <Route element={<AuthLayout />}>
                            <Route path='/' element={<Home />} />
                        </Route>

                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ActiveDropdownProvider>
    )
}