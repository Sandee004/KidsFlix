import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import APIComponent from './components/APIcomponent';

function App() {
  return (
    <>
    <div className="bg-[#373b69] px-5 py-2 flex flex col justify-between items-center sm:px-8">
      <p className="text-2xl font-bold text-white">KidsFlix</p>
      <input 
      className="rounded-sm bg-transparent px-5 py-1 border-2 border-[#22254b] font-sm text-white italic focus:outline-0 focus:bg-[#22254b] focus:border-slate-500 sm:w-[320px]"
      placeholder="Search" />
      <FontAwesomeIcon icon={faBars} />
    </div>
    <APIComponent />
    </>
  )
}

export default App
