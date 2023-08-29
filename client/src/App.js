import './App.css';
import Header from './Header';
import Layout from './Layout';
import Post from './Post';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContextProvider } from './context/UserContext';
import CreatePost from './pages/CreatePost';
import PostsPage from './pages/PostsPage';
import EditPosts from './pages/EditPosts';

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/create'} element={<CreatePost/>}/>
        <Route path={'/post/:id'} element={<PostsPage/>}/>
        <Route path={'/edit/:id'} element={<EditPosts/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
