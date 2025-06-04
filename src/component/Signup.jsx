import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://admin-panel-backend-1tym.onrender.com/signup', formData)
            console.log('Signup successful:', response.data)
            alert(response.data.msg) // Show a success message
            navigate('/') // Redirect to login
        } catch (error) {
            console.error('Signup error:', error)
            alert(error?.response?.data?.msg || 'Signup failed')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-10 rounded-xl shadow-xl [box-shadow:_0_0_20px_0_skyblue] flex flex-col w-96">
                <h2 className="text-2xl font-bold mb-10 mt-4">Sign Up</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder='Enter your name'
                        className="text-sm w-full px-3 py-2 border-b-2 border-gray-300 rounded focus:border-none focus:outline-none focus:ring focus:ring-blue-900 placeholder:italic"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-2">Email</label>
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-500 mb-2">Password</label>
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
                    <button type="submit" className="w-[150px] bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer">Sign Up</button>
                    <button type="button" className="cursor-pointer text-white hover:text-blue-500 transition duration-200" onClick={() => navigate('/')}>Go to Login</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
