import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
    else {
      axios.get('https://admin-panel-backend-1tym.onrender.com/dashboard', {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(response => {
          setDashboardData(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the dashboard data:', error);
        });
    }
  }, []);

  // State to hold the list of students
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students from the server
  const fetchStudents = () => {
    axios.get('https://admin-panel-backend-1tym.onrender.com/students/getstudents')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the students:', error);
      });
  }

  const [addStudent, setAddStudent] = useState({
    name: '',
    email: ''
  });

  const handlechange = (e) => {
    setAddStudent({
      ...addStudent,
      [e.target.name]: e.target.value
    });
  }

  // Function to handle adding a student
  const handleAddStudent = () => {
    if (editIndex !== null) {
      // If editIndex is set, update the student
      axios.put(`https://admin-panel-backend-1tym.onrender.com/students/updatestudent/${editIndex}`, addStudent)
        .then(response => {
          console.log('Student updated successfully:', response.data);
          fetchStudents();
        })
        .catch(error => {
          console.error('There was an error updating the student:', error);
        });
      setEditIndex(null);
    }
    else {
      // If editIndex is null, add a new student
      axios.post('https://admin-panel-backend-1tym.onrender.com/students/addstudent', addStudent)
        .then(response => {
          console.log('Student added successfully:', response.data);
          fetchStudents();
        })
        .catch(error => {
          console.error('There was an error adding the student:', error);
        });
    }
    setAddStudent({
      name: '',
      email: ''
    });
  }

  const [editIndex, setEditIndex] = useState(null);
  // Function to handle editing a student
  const handleEditStudent = (id) => {
    setEditIndex(id);
    const studentToEdit = students.find(student => student._id === id);
    setAddStudent({
      name: studentToEdit.name,
      email: studentToEdit.email
    });
  }

  // Function to handle deleting a student
  const handleDeleteStudent = (id) => {
    axios.delete(`https://admin-panel-backend-1tym.onrender.com/students/deletestudent/${id}`)
      .then(response => {
        console.log('Student deleted successfully:', response.data);
        fetchStudents();
      })
      .catch(error => {
        console.error('There was an error deleting the student:', error);
      });
  }

  return (
    <div className='bg-gray-800 w-full min-h-screen'>
      <div className='bg-gray-900 w-full p-10 flex justify-center items-center'>
        <h1 className='w-full font-bold flex items-center justify-between text-lg text-gray-300'>
          Hi, {dashboardData?.user?.name}
          <span className='text-3xl font-bold text-gray-300'>Welcome to the Dashboard</span>
          <span onClick={() => {
            localStorage.removeItem('token')
            navigate('/')
          }} className='ml-5 px-5 py-2 rounded text-sm cursor-pointer bg-blue-900 hover:bg-blue-600 text-gray-300'>Logout</span>
        </h1>
      </div>
      <div className='p-10 w-full h-[84vh] flex justify-between items-center'>
        {/* Make Student form  */}
        <div className='p-10 w-[30%] rounded-xl shadow-xl [box-shadow:_0_0_5px_0_skyblue] bg-gray-900'>
          <h2 className='text-lg font-bold mb-10 mt-5 text-white'>{editIndex !== null ? 'UPDATE YOUR TASK' : 'ADD YOUR TASKS'}</h2>
          <input type="text" placeholder="Enter Title" className='text-white text-sm w-full mb-2 px-3 py-2 border-b-2 border-gray-300 rounded focus:border-none focus:outline-none focus:ring focus:ring-blue-900 placeholder:italic' onChange={handlechange} name="name" value={addStudent.name} />
          <input type="email" placeholder="Enter Description" className='text-white text-sm w-full mb-2 px-3 py-2 border-b-2 border-gray-300 rounded focus:border-none focus:outline-none focus:ring focus:ring-blue-900 placeholder:italic' onChange={handlechange} name="email" value={addStudent.email} />
          <button className='w-[150px] h-[40px] rounded text-white bg-blue-900 hover:bg-blue-600 mt-10 cursor-pointer' onClick={handleAddStudent}>{editIndex !== null ? 'Task Update' : 'Task Add'}</button>
        </div>

        <div className='border w-[65%] h-full bg-gray-900 rounded-xl shadow-xl [box-shadow:_0_0_5px_0_skyblue] p-10'>
          {/* View Student form */}
          <h2 className='text-white text-lg font-bold mb-5'>Task Lists</h2>
          <div className='w-full h-[90%] flex flex-col overflow-auto gap-2'>
            {students.length == 0
              ? <h2 className='w-full h-full text-white text-lg font-bold flex justify-center items-center'>No Task Found</h2>
              : students.map((student, index) => (
                <div key={index} className="px-10 py-2 rounded-full bg-gray-800 flex justify-between items-center">
                  <div className="w-[80%] h-full flex items-center">
                    <span className='w-[10%] h-full flex items-center text-gray-300'>{index + 1}.</span>
                    <span className='w-[40%] h-full flex items-center text-gray-300'>{student.name}</span>
                    <span className='w-[50%] h-full flex items-center text-gray-300'>{student.email}</span>
                  </div>
                  <div className="w-[12%] h-full flex justify-between items-center">
                    <button className="w-[40px] h-[40px] rounded-full text-sm cursor-pointer bg-blue-900 hover:bg-blue-600 text-gray-300 flex justify-center items-center" onClick={() => handleEditStudent(student._id)}><i class="fa-solid fa-pen-to-square"></i></button>
                    <button className="w-[40px] h-[40px] rounded-full text-sm cursor-pointer bg-red-900 hover:bg-red-600 text-gray-300 flex justify-center items-center" onClick={() => handleDeleteStudent(student._id)}><i class="fa-solid fa-trash-can"></i></button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
