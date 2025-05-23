import { useState } from 'react'

import axios from '../axiosConfig'

import { useLocation, Link, Navigate } from 'react-router'

import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'

export default function LoginPage() {
    const location = useLocation()

    // States
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [isPasswordShow, setIsPasswordShow] = useState(false)

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [error, setError] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [redirect, setRedirect] = useState(false)

    // Functions
    function handleChange(e) {
        const { name, value } = e.currentTarget

        setFormData(prevData => ({ ...prevData, [name]: value }))

        if (e.currentTarget.validity.valid) {
            if (name === 'email') {
                setEmailError(false)
            } else if (name === 'password') {
                setPasswordError(false)
            }
        } else {
            if (name === 'email') {
                setEmailError(true)
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setIsLoading(true)

        try {
            const response = await axios.post('/login',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                localStorage.setItem('auth-token', response.data)
                localStorage.setItem('email', formData.email)

                setRedirect(true)
            }
        } catch (error) {
            setError(error.response.data)

        } finally {
            setIsLoading(false)
        }
    }

    if (redirect) {
        return <Navigate to='/' state={{ message: 'You have successfully locked in' }} />
    }

    return (
        <main className='main main--auth'>
            <div className='auth-form__wrapper'>
                {location.state?.message ? <Alert className='alert--success' severity="success">{location.state.message}</Alert> : null}
                <h1 className='auth-form__title'>Welcome Back 👋</h1>
                <p className="auth-form__text">Log in to your account to continue where you left off.</p>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <TextField
                        id='email'
                        name='email'
                        label='Email'
                        variant='outlined'
                        type='email'
                        placeholder='horlach@example.com'
                        value={formData.email}
                        onChange={handleChange}
                        error={emailError}
                        helperText={emailError ? 'Email is not valid' : ''}
                        required
                        fullWidth
                        autoComplete='on'
                    />
                    <Stack
                        spacing={2}
                        direction='column'
                        sx={{
                            position: 'relative',
                            marginTop: '0px'
                        }}
                    >
                        <TextField
                            id='password'
                            name='password'
                            label='Password'
                            variant='outlined'
                            type={isPasswordShow ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            error={passwordError}
                            helperText={passwordError ? "Password must be stronger" : ''}
                            required
                        />
                        <Button
                            variant='text'
                            className={`eye-button${isPasswordShow ? ' show' : ''}`}
                            onClick={() => setIsPasswordShow(prevShow => !prevShow)}
                        >
                            <VisibilityIcon />
                        </Button>
                    </Stack>
                    {error ? <p className="warning-text">{error}</p> : null}
                    <Button
                        variant='contained'
                        type='submit'
                        loading={isLoading}
                    >Login</Button>
                    <p className='auth-form__text'>Don't have an account yet? <Link to='/signup'>Sign up</Link></p>
                </form>
            </div>
        </main>
    )
}