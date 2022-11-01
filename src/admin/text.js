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

{
  rank: projectData.rank,
    filename: projectData.filenßame,
      title: projectData.title,
        use: projectData.use,
          description: projectData.description,
            websiteUrl: projectData.website,
              videoUrl: projectData.video,
                codeUrl: projectData.code,
                  uiuxUrl: projectData.uiux,
                    coverCaption: projectData.coverCaption,
                      coverImageFilename: projectData.coverImageName,
                        coverImagePath: projectData.coverImageUrl,
                          items: [
                            {
                              itemId: projectData.itemId,
                              itemCaption: projectData.itemCaption,
                              itemText: projectData.itemText,
                              itemImages: [
                                {
                                  itemImageId: projectData.itemImageId,
                                  itemImageFilename: projectData.itemImageName,
                                  itemImagePath: projectData.itemImageUrl,
                                }
                              ]
                            }
                          ], hidden: projectData.hidden,
    }