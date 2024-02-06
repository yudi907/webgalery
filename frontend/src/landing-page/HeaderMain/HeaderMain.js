import Kategori from '../Kategori/Kategori';
import Comment from '../Comment/Comment';
import Topbar from '../Topbar/Topbar';
import './HeaderMain.css';
import { Route, Routes } from 'react-router-dom';

const HeaderMain = () => {
  return (
    <div className='h_main'>
    <Topbar/>
    <Routes>
      <Route index element={<Kategori/>} />
      <Route path="comment-gambar/:id" element={<Comment/>} />
      </Routes>
    </div>
  )
}

export default HeaderMain