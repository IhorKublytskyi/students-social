import { Link } from 'react-router'

export default function NotFoundPage() {
    return (
        <main className='main'>
            <div className='container'>
                <div className='not-found-page'>
                    <h1>Not Found Page</h1>
                    <Link to='/'>Go Home</Link>
                </div>
            </div>
        </main>
    )
}