import { Outlet, Navigate } from 'react-router'

export default function AuthLayout() {
    const user = true

    return user ? <Outlet /> : <Navigate to='/login' />
}