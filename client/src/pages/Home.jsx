import Header from "../components/Header"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-sky-200'>
       <Navbar/>
       <Header/>
    </div>
  )
}

export default Home
