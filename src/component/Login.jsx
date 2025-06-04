import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
        axios.post('https://admin-panel-backend-1tym.onrender.com/login', formData)
            .then(response => {
                console.log('Login successful:', response.data)
                // Store token or user data if needed
                localStorage.setItem('token', response.data.token)
                navigate('/dashboard')
            })
            .catch(error => {
                console.error('There was an error logging in:', error)
                alert('Login failed. Please check your credentials.')
            })
    }

    return (
        <div>
            {/* change my login background */}
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <form className="bg-gray-800 text-white p-10 rounded-xl shadow-xl [box-shadow:_0_0_20px_0_skyblue] flex flex-col w-96" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-10 mt-4">Login</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder='Enter your email'
                            className="text-sm w-full px-3 py-2 border-b-2 border-gray-300 rounded focus:border-none focus:outline-none focus:ring focus:ring-blue-900 placeholder:italic"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='Enter your password'
                            className="text-sm w-full px-3 py-2 border-b-2 border-gray-300 rounded focus:border-none focus:outline-none focus:ring focus:ring-blue-900 placeholder:italic"
                        />
                    </div>
                    <div className='flex justify-between items-center mt-10 mb-4'>
                        <button
                            type="submit"
                            onClick={() => navigate('/dashboard')}
                            className="w-[150px] bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
                        >
                            Login
                        </button>
                        <button
                            className="cursor-pointer text-white hover:text-blue-500 transition duration-200"
                            onClick={() => navigate('/signup')}
                        >
                            Go to Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
