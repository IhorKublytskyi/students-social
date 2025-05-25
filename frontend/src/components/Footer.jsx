import { Link } from 'react-router'

import logo from '../assets/images/logo.svg'

export default function Footer() {
    return (
        <footer className='footer'>
            <Link className='logo' to='/'>
                <img className='logo__img' src={logo} alt='Students Social Logo' />
            </Link>
            <nav className='footer__nav'>
                <ul className='footer__list'>
                    <li className='footer__list-item'>
                        <Link to='/about-us'>About us</Link>
                    </li>
                    <li className='footer__list-item'>
                        <Link to='/contact'>Contact us</Link>
                    </li>
                    <li className='footer__list-item'>
                        <Link to='/privacy'>Privacy Policy</Link>
                    </li>
                    <li className='footer__list-item'>
                        <Link to='/terms'>Terms of Service</Link>
                    </li>
                </ul>
            </nav>
            <div className='footer__text'>Developed by <a href='https://github.com/1ways' target='_blank'>Anton Hryshchuk</a> and <a href='https://github.com/IhorKublytskyi' target='_blank'>Ihor Kublytskyi</a> © {new Date().getFullYear()}</div>
        </footer>
    )
}