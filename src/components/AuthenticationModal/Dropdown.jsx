import AppLevelContext from '../../context/AppLevelContext'
import { useContext } from 'react';
import AuthenticationModalContext from '../../context/AuthenticationModalContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DropDown = () => {
    const { setAccountType } = useContext(AppLevelContext);
    const { teacherModal, studentModal } = useContext(AuthenticationModalContext)
    const setToTeacher = (e) => {
      e.preventDefault()
        setAccountType('teacher')
        teacherModal()
    }

    const setToStudent = (e) => {
      e.preventDefault()
        setAccountType('student')
        studentModal()
    }

  return (
    <div className="text-3xl p-6 flex flex-row">
    <button onClick={(e) => setToTeacher(e)} className='text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300 w-24 m-auto mt-4'>Teacher</button>
    <button onClick={(e) => setToStudent(e)} className='text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300 w-24 m-auto mt-4'>Student</button>
    </div>
  )
}

export default DropDown;