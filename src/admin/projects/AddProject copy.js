import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
//import { useForm } from "react-hook-form";
import styled from "styled-components";
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { storage, db, auth } from "../../utils/firebase";


const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;  
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;  

  .main {
    padding: 5px;
    width: 60%;    
    position: relative;
    background-color: rgb(245, 245, 245);
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
    margin: 5px 15px;
    padding: 5px 20px;
    width: 90%;  
    position: absolute;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
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
    
    height: 30px;
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

const AddProject = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({});

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files });
  }

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
            <Link to="/signin">Go To Login!</Link>
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
              <div className="form-item">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-item">
                <label className="form-label">Use</label>
                <input
                  type="text"
                  name="use"
                  className="form-input"
                  value={formData.use}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-item">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-input"
                  value={formData.description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-item">
                <label className="form-label">Website</label>
                <input
                  type="url"
                  name="website"
                  className="form-input"
                  value={formData.website}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-item">
                <label className="form-label">Video</label>
                <input
                  type="url"
                  name="video"
                  className="form-input"
                  value={formData.video}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-item">
                <label className="form-label">Code</label>
                <input
                  type="url"
                  name="code"
                  className="form-input"
                  value={formData.code}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-item">
                <label className="form-label">UI/UX</label>
                <input
                  type="url"
                  name="uiux"
                  className="form-input"
                  value={formData.uiux}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-item">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-input"
                  onChange={(e) => handleImageChange(e)}
                />

                {progress === 0 ? null : (
                  <div className="">
                    <div className=""
                      style={{ width: `${progress}%` }}
                    >
                      {`uploading image ${progress}%`}
                    </div>
                  </div>
                )}
              </div>
              <div className="btn-group">
                <button
                  className="btn-cancel"
                  onClick=""
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

export default AddProject;