/* eslint-disable jsx-a11y/anchor-is-valid */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Users from './components/users';
import './App.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-light">
            Admin-UI
          </a>
        </div>
      </nav>
      <div className="mx-5">
        <Users />
      </div>
    </div>
  );
}

export default App;
