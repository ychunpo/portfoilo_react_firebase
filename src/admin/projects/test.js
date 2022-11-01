// useEffect(() => {
//   if (errors
//     && Object.keys(errors).length === 0
//     && Object.getPrototypeOf(errors) === Object.prototype) {
//     return;
//   } else { console.log('errors', errors); }
// }, [])

setProjectData(previousState => {
  return { ...previousState, coverImagePath: getCoverImagePath };
});

for (let num = 0; num < itemListNo.length; num++) {
  console.log('getItemImagePath[num]:', getItemImagePath)
  let i = itemListNo[num].i;
  let j = itemListNo[num].j;
  let path = items[i]
  let pathTwo = path.itemImages[j]
  pathTwo.itemImagePath = getItemImagePath[num];
}

() => {
  getDownloadURL(uploadImage.snapshot.ref).then((url) => {
    const projectRef = collection(db, "Projects");
    addDoc(projectRef, {
      rank: singleProjectData.rank,
      title: singleProjectData.title,
      use: singleProjectData.use,
      description: singleProjectData.description,
      website: singleProjectData.website,
      video: singleProjectData.video,
      code: singleProjectData.code,
      uiux: singleProjectData.uiux,
      images: [],
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

<button onClick={() => navigation(`/admin/project/edit/${row.original.id}`)}>Edit</button>
<button onClick={() => hiddenItem(row.original.id)}>Hidden</button>
<button onClick={() => deleteItem(row.original.id)}>Delete</button>
