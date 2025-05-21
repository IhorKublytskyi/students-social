import { useState } from 'react'

import axios from 'axios'

import PasswordStrengthBar from 'react-password-strength-bar'

import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import VisibilityIcon from '@mui/icons-material/Visibility'

export default function SignupPage() {
    // States
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [firstNameError, setFirstNameError] = useState(false)
    const [secondNameError, setSecondNameError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const [isPasswordShow, setIsPasswordShow] = useState(false)

    const [score, setScore] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    // Functions
    function handleChange(e) {
        const { name, value } = e.currentTarget

        setFormData(prevData => ({ ...prevData, [name]: value }))

        if (e.currentTarget.validity.valid) {
            if (name === 'firstName') {
                setFirstNameError(false)
            } else if (name === 'secondName') {
                setSecondNameError(false)
            } else if (name === 'username') {
                setUsernameError(false)
            } else if (name === 'email') {
                setEmailError(false)
            } else if (name === 'password') {
                setPasswordError(false)
            } else if (name === 'confirmPassword') {
                setConfirmPasswordError(false)
            }
        } else {
            if (name === 'firstName') {
                setFirstNameError(true)
            } else if (name === 'secondName') {
                setSecondNameError(true)
            } else if (name === 'username') {
                setUsernameError(true)
            } else if (name === 'email') {
                setEmailError(true)
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (score <= 1) {
            setPasswordError(true)
        } else {
            if (formData.password === formData.confirmPassword) {
                setConfirmPasswordError(false)
                setIsLoading(true)

                axios.post('/api/register', formData)
                    .then(response => console.log(response))
                    .catch(err => console.log(err))
                    .finally(() => {
                        setIsLoading(false)
                    })

            } else {
                setConfirmPasswordError(true)
            }
        }
    }

    function handleScoreChange(score) {
        setScore(score)
    }

    function togglePasswordShow() {
        setIsPasswordShow(prevShow => !prevShow)
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
                    />
                    <TextField
                        id='secondName'
                        name='secondName'
                        label='Second Name'
                        variant='outlined'
                        placeholder='Horlach'
                        value={formData.secondName}
                        onChange={handleChange}
                        error={secondNameError}
                        inputProps={{ maxLength: 20 }}
                        fullWidth
                        required
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
                />
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
                            onClick={togglePasswordShow}
                        >
                            <VisibilityIcon />
                        </Button>
                    </Stack>
                    <PasswordStrengthBar
                        password={formData.password}
                        shortScoreWord={'Too short'}
                        scoreWords={['Too weak', 'Weak', 'Okay', 'Good', 'Strong']}
                        onChangeScore={handleScoreChange}
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
                <Button 
                    variant='contained' 
                    type='submit'
                    loading={isLoading}
                >Sign up</Button>
            </form>
        </>
    )
}