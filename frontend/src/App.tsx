import { Menu } from 'react-feather';
import APIComponent from './components/APIcomponent';

function App() {
  return (
    <>
    <div className="bg-purple-400 px-5 py-2 flex flex col justify-between items-center">
      <p className="text-2xl font-bold text-white">KidsFlix</p>
      <Menu className='text-white hover:cursor-pointer'/>
    </div>
    <APIComponent />
    </>
  )
}

export default App
