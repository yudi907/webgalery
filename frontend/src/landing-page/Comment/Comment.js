import { Card, Col, Row, Spinner, Container, Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Comment.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuth } from '../../auth/AuthContext';

const Comment = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState([]);
  const navigate = useNavigate();
  const { authToken, Id } = useAuth();

  const [formData, setFormData] = useState({
    isi_comment: '',
    id_gambar: id,
    id_user: Id
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/comment', formData,
        {   
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${authToken}`,
              },
            }
        );
        console.log('berhasil');
        fetchData();
        setFormData({
          isi_comment: '',
        });
    } catch (error) {
        console.error('Error:', error.response.data);        
    } finally {
        setLoading(false);
    }
};

  const fetchData = async () => {
    try {
      const responseImages = await axios.get(`http://127.0.0.1:8000/api/gambar/${id}`);
      const dataImages = responseImages.data;

      const responseComments = await axios.get(`http://127.0.0.1:8000/api/comment/${id}`);
      const dataComments = responseComments.data;
      
      setComment(dataComments);
      setImages(dataImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <Container className='mt-4'>
      <Link to="/home" className='btn btn-sm btn-danger mb-3'>
        <i className="bi bi-arrow-left"></i>
        <span> Kembali</span>
      </Link>
      <Card.Body className='mb-5'>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        ) : (
          <Row className="d-flex">
            <Col xs={12} md={4} className="mb-3">
              {/* Left side (image and name) */}
              <Card>
                <Card.Body>
                    <img
                      src={`http://localhost:8000/files/` + images.gambar}
                      alt="gambar"
                      style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '3%' }}
                    />
                  <p className='fw-bold mt-2'>{images.nama_gambar}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Card className='h-75 comment-card'>
                <Card.Body>
                  <div className="comment-container">
                  {comment.map((comments) => (
                  <div className="comment-box">
                    <p className="comment-text">{comments.isi_comment}</p>
                    <span className="comment-username">{comments.name}</span>
                  </div>
                  ))}
                  </div>
                </Card.Body>
              </Card>
              <Row className='justify-content-center'>
                <Col xs={12} md={11}>
              <div className="mt-3">
                  <input
                    type="text"
                    name='isi_comment'
                    className='form-control'
                    placeholder="Tambahkan komentar..."
                    onChange={handleChange}
                    value={formData.isi_comment}>
                  </input>
              </div>
              </Col>
              <Col xs={12} md={1}>
              <a role='button' className='btn btn-secondary mt-3' onClick={handleSubmit} ><i className="bi bi-send"></i></a>
              </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Container>
  );
}

export default Comment;
