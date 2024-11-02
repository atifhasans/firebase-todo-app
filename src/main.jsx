import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './Layout.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Todo from './Pages/Todo.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'todo',
        element: <ProtectedRoutes component={<Todo />}/>
      },
      {
        path: '',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: '*',  
        element: <div>404 - Page Not Found</div>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
)
