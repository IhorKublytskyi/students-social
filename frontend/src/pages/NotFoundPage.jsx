import { Link } from 'react-router'

export default function NotFoundPage() {
    return (
        <div className='not-found-page'>
            <h1>Not Found Page</h1>
            <Link to='/'>Go Home</Link>
        </div>
    )
}