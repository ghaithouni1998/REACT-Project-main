import { Routes,Route,Navigate } from 'react-router-dom';
import Auctions from './pages/Auctions';
import Admin_pannel from './pages/Admin_pannel';
import Admin_Creation from './pages/Admin_Creation';
import Admin_Edit from './pages/Admin_Edit';
import LiveAuction from './pages/LiveAuction/LiveAuction';
import LogReg from './pages/LogReg'
import LogLog from './pages/LogLog'
import NotFound from './pages/NotFound'
import Home from './pages/HomePage/Home'
import Navbar from './components/common/Navbar';
import UserAccount from './pages/UserAccount';
import User_Edit from './pages/User_Edit'

function App() {
  return (
    <section className='min-h-screen duration-100'>
      <Navbar/>
      <Routes>
        <Route path="/auctions/upcoming" element={<Auctions/>} />
        <Route path='/auctions/admin' element ={<Admin_pannel/>}/>
        <Route path='/auctions/live' element={<LiveAuction/>} />

        <Route path='/register' element={<LogReg />} />
        <Route path='/login' element={<LogLog />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="/user/edit" element={<User_Edit />} />


        <Route path='/auctions' element={<Home />} />
        <Route path='/' element={<Home />} />

        <Route path='/auctions/admin/new' element={<Admin_Creation />} />

        <Route path='/auctions/edit/:id' element={<Admin_Edit />} />

        {/* <Route path='/auctions/:id' element={<ShowOneAuction />} /> */}

        <Route path='/notfound' element={<NotFound />} />
        <Route path='*' element={<Navigate to={'/auctions'} />} />

      </Routes>
      </section>
  )
}

export default App;
