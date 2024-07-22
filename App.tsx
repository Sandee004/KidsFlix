import Home from './components/home'
import CreatedAccounts from './components/accounts'
import SignUp from './components/signup'
import Login from './components/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/accounts' element={<CreatedAccounts/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
