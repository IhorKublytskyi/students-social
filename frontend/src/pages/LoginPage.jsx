import { useLocation } from 'react-router'

export default function LoginPage() {
    const location = useLocation()

    return (
        <>
            {location.state?.message ? <p>{location.state.message}</p> : null}
            <h1>Login Page</h1>
        </>
    )
}