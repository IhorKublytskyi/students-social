import { useState } from 'react'
import { Link, Navigate } from 'react-router'

import axios from '../axiosConfig'
import dayjs from 'dayjs'

import PasswordStrengthBar from 'react-password-strength-bar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import VisibilityIcon from '@mui/icons-material/Visibility'

export default function SignupPage() {
    // States
    const [formData, setFormData] = useState({
        firstName: 'Horlach',
        lastName: 'Artan',
        username: 'artan123',
        email: 'artan@gmail.com',
        birthDate: null,
        password: 'artan@gmail.com',
        confirmPassword: 'artan@gmail.com'
    })

    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [birthDateError, setBirthDateError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const [isPasswordShow, setIsPasswordShow] = useState(false)

    const [score, setScore] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState('')
    const [redirect, setRedirect] = useState(false)

    // Functions
    function handleChange(e) {
        const { name, value } = e.currentTarget

        setFormData(prevData => ({ ...prevData, [name]: value }))

        if (e.currentTarget.validity.valid) {
            if (name === 'firstName') {
                setFirstNameError(false)
            } else if (name === 'lastName') {
                setLastNameError(false)
            } else if (name === 'username') {
                setUsernameError(false)
            } else if (name === 'email') {
                setEmailError(false)
            } else if (name === 'birthDate') {
                setBirthDateError(false)
            } else if (name === 'password') {
                setPasswordError(false)
            } else if (name === 'confirmPassword') {
                setConfirmPasswordError(false)
            }
        } else {
            if (name === 'firstName') {
                setFirstNameError(true)
            } else if (name === 'lastName') {
                setLastNameError(true)
            } else if (name === 'username') {
                setUsernameError(true)
            } else if (name === 'email') {
                setEmailError(true)
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (score > 1) {
            if (formData.birthDate) {
                if (formData.password === formData.confirmPassword) {
                    
                    setConfirmPasswordError(false)
                    setBirthDateError(false)
                    setIsLoading(true)

                    // Format date
                    const {$M: month, $D: day, $y: year} = formData.birthDate
                    const date = `${month + 1}/${day}/${year}`

                    const userData = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        username: formData.username,
                        email: formData.email,
                        birthDate: date,
                        password: formData.password
                    }

                    try {
                        const response = await axios.post(
                            '/register',
                            userData,
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        )

                        setRedirect(true)
                    } catch (error) {
                        console.log(error)
                        
                        setError(error.response.data)
                    } finally {
                        setIsLoading(false)
                    }

                } else {
                    setConfirmPasswordError(true)
                }
            } else {
                setBirthDateError(true)
            }
        } else {
            setPasswordError(true)
        }
    }

    function handleBirthDateChange(newValue) {
        setFormData(prevData => ({ ...prevData, birthDate: newValue }))
        setBirthDateError(false)
    }

    if (redirect) {
        return <Navigate to='/login' state={{message: 'You have successfully registered'}} />
    }

    return (
        <>
            <h1 className='page-title'>Sign up</h1>
            <form className='auth-form' onSubmit={handleSubmit}>
                <Stack spacing={2} direction='row'>
                    <TextField
                        id='firstName'
                        name='firstName'
                        label='First Name'
                        variant='outlined'
                        placeholder='Artan'
                        value={formData.firstName}
                        onChange={handleChange}
                        error={firstNameError}
                        inputProps={{ maxLength: 20 }}
                        required
                        fullWidth
                        autoComplete='on'
                    />
                    <TextField
                        id='lastName'
                        name='lastName'
                        label='Last Name'
                        variant='outlined'
                        placeholder='Horlach'
                        value={formData.lastName}
                        onChange={handleChange}
                        error={lastNameError}
                        inputProps={{ maxLength: 20 }}
                        fullWidth
                        required
                        autoComplete='on'
                    />
                </Stack>
                <TextField
                    id='username'
                    name='username'
                    label='Username'
                    variant='outlined'
                    placeholder='horlach123'
                    value={formData.username}
                    onChange={handleChange}
                    error={usernameError}
                    inputProps={{ maxLength: 20 }}
                    fullWidth
                    required
                    autoComplete='on'
                />
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
                    fullWidth
                    required
                    autoComplete='on'
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Pick your birth date"
                        value={formData.birthDate}
                        onChange={handleBirthDateChange}
                        slotProps={{
                            textField: {
                                helperText: birthDateError ? 
                                    <span className='warning-text'>Please enter your birth data</span> 
                                    : ''
                            },
                        }}
                    />
                </LocalizationProvider>
                <Stack
                    spacing={2}
                    direction='column'
                >
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
                            className='eye-button'
                            onClick={() => setIsPasswordShow(prevShow => !prevShow)}
                        >
                            <VisibilityIcon />
                        </Button>
                    </Stack>
                    <PasswordStrengthBar
                        password={formData.password}
                        shortScoreWord={'Too short'}
                        scoreWords={['Too weak', 'Weak', 'Okay', 'Good', 'Strong']}
                        onChangeScore={(score) => setScore(score)}
                    />
                </Stack>
                <TextField
                    id='confirmPassword'
                    name='confirmPassword'
                    label='Confirm Password'
                    variant='outlined'
                    type={isPasswordShow ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={confirmPasswordError}
                    helperText={confirmPasswordError ? "Passwords don't match" : ''}
                    fullWidth
                    required
                />
                {error ? <p className="warning-text">{error}</p> : null}
                <Button
                    variant='contained'
                    type='submit'
                    loading={isLoading}
                >Sign up</Button>
                <p className='auth-form__text'>Already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </>
    )
}