import React from "react";
import styled from "styled-components";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../utils/firebase";

const Container = styled.div`

`

const DeleteSkill = (id) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete it?")) {
      try {
        await deleteDoc(doc(db, "Skills", id));
        toast("Skill deleted successfully", { type: "success" });
        const storageRef = ref(storage);
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting", { type: "error" });
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <button
        className=""
        onClick={handleDelete}
        style={{ cursor: "pointer" }}
      >
        Delete
      </button>
    </Container>
  )
}

export default DeleteSkill;