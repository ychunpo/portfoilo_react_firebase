setProjectData({
  ...projectData,
  rank: data.rank,
  title: data.title,
  use: data.use,
  description: data.description,
  websiteUrl: data.website,
  videoUrl: data.video,
  gitUrl: data.git,
  uiuxUrl: data.uiux,
  coverCaption: data.cover.caption,
  coverImageFilename: data.cover.image[0].name,
  coverImagePath: getCoverImagePath,
  items: [
    itemId: i,
    itemCaption: data.items[i].caption,
    itemText: data.items[i].text,
    itemImages: [
      itemImageId: j,
      itemImageFilename: data.items[i].image[j].name,
      itemImagePath: getStorageImagePath,
    ]
  ]
})



