import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { list, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage, db, auth } from '../../utils/firebase';

const AdminProjectEdit = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  return (
    <div>
      <h1>{id}</h1>
      <h1>ProjectEdit</h1>

      <div className="APF-main-btn-group">
        <input
          type="button"
          value="Cancel"
          onClick={() => navigation('/admin/projects')}
        />
        <input type="submit" value="Save" />
      </div>
    </div>
  )
}

export default AdminProjectEdit
