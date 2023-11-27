import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (

      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold' href = "/">Qilin Therapeudics</h1>
        </Link>
          <ul className='flex gap-4'>
          <div className='flex justify-between items-center max-w-6xl mx-auto p-3 highlightTextIn container'>
            <Link to='/'>
                <li><a alt='Home'>Home</a></li>
              </Link>
              <Link to='/about'>
                <li><a alt='About'>About</a></li>
              </Link>
              <Link to='/bdi'>
                <li><a alt='BDI'>BDI</a></li>
              </Link>
              <Link to='/contact'>
                <li><a alt='Contact Us'>Contact Us</a></li>
              </Link>
              {/* <Link to='/graph'>
                <li><a alt='Graph'>Graph</a></li>
              </Link> */}
              <Link to='/graph2'>
                <li><a alt='Graph'>Graph</a></li>
              </Link>

              <Link to='/profile'>
                {currentUser ? (
                  <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
                ) : (
                  <li><a alt='Sign In'>Sign In</a></li>
                )}
              </Link>
          </div>
          </ul>
      </div>

  );
}
