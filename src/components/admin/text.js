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