import React, { useState } from 'react';
//import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { storage, db, auth } from '../../utils/firebase';
import { listData } from '../../data/listData';
import Dropzone from './dropzone/Dropzone';
import Posts from './dropzone/Posts'

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;  
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;  

  .main {
    padding: 5px 0;
    width: 60%;    
    position: relative;
    background-color: rgb(245, 245, 245);
    background-repeat: no-repeat;
  }

  .header {
    padding: 5px;
  }

  .title {
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
  }

  .form {
    margin: 5px 0;
    padding: 5px 0;
    width: 100%;  
    position: absolute;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(245, 245, 245);
  }

  .form-item {
    margin-bottom: 10px;
    width: 80%;
  }

  .form-label {
    font-size: 1.1rem;   
    display: inline-block;    
    margin-bottom: 6px;    
  }

  .form-input {
    font-size: 1.1rem;
    display: block;
    outline: none;
    border-radius: 2px;
    border: none;
    width: 100%    
  }

  .form-input::placeholder {
    color: #595959;
    font-size: 1.2rem;
  }

  .form-item input {    
    height: 20px;
  }

  .form-item textarea {    
    height: 60px;
  }

  .btn-group {
    width: 80%;
    display: flex;
    justify-content: space-around;
  }

  button {
    padding: 5px;
    width: 90px;
    font-size: 1.3rem;
    cursor: pointer;
  }

  .btn-cancel {}

  .btn-save {} 
`

const AdminProjectHandle = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);
  const [imagesData, setImagesData] = useState({});
  const [imagesText, setImagesText] = useState('');
  //const [deleteItem, setDeleteItem] = useState({});
  //const captionRef = useRef(null);

  //console.log('progress', progress);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const getImagesData = (value) => {
    setImagesData(value);
  }

  // const deleteImages = (index) => {
  //   setDeleteItem({ index });
  // }

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.websiteUrl) {
      alert("Please fill this field");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${formData.imageUrl.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.imageUrl);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        console.log(error);
      },
      () => {
        setFormData({
          title: "",
          use: "",
          description: "",
          website: "",
          video: "",
          code: "",
          uiux: "",
          image: [],
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const projectRef = collection(db, "Projects");
          addDoc(projectRef, {
            title: formData.title,
            use: formData.use,
            description: formData.description,
            website: formData.website,
            video: formData.video,
            code: formData.code,
            uiux: formData.uiux,
            image: [],
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error adding article", { type: "error" });
            });
        })
      }
    )
  }

  return (
    <Container>
      {!user ? (
        <>
          <h2>
            <Link to="/auth">Go To Login!</Link>
          </h2>
        </>
      ) : (
        <>
          <div className="main">
            <div className="header">
              <div className="title">
                <p>Create Project Data</p>
              </div>
            </div>
            <form className="form">
              {
                listData.map((item) => {
                  return (
                    <div className="form-item" key={item.id}>
                      <label className="form-label">{item.inputLabel}</label>
                      <input
                        type={item.inputType}
                        name={item.inputName}
                        className="form-input"
                        value={formData[item.inputName] || ''}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  )
                })
              }

              <div className="form-item">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-input"
                  value={formData.description || ''}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-item">
                <label className="form-label">Image - Cover</label>
                <div>
                  <Dropzone
                    getImagesData={getImagesData}
                  />
                </div>
                <div>
                  <Posts
                    imagesData={imagesData}
                  />
                </div>
              </div>

              <div className="btn-group">
                <button
                  className="btn-cancel"
                  onClick={handleSubmit}
                >
                  Cancel
                </button>
                <button
                  className="btn-save"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </Container>
  )
}

export default AdminProjectHandle;