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

{
  openUpdate && (
    <div className="update-skill">
      <UpdateSkills
        allData={allData}
        setOpenUpdate={setOpenUpdate}
        updateSingleSkill=''
        handleUpdateSubmit=''
      />
    </div>
  )
}

 //data.cover.imgUrl = "";
      // Object.defineProperty(data.cover, "imgUrl", {
      //   value: '',
      //   writable: true,
      //   enumerable: true,
      //   configurable: true,
      // })