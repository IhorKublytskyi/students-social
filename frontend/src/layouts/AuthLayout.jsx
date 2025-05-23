import { Outlet, Navigate } from 'react-router'

export default function AuthLayout() {
    const isLogged = localStorage.getItem('email') ? true : false

    return isLogged ? <Outlet /> : <Navigate to='/login' />
}