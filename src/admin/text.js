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

@media(max - width: 1200px) {
  #photos {
    -moz - column - count: 4;
    -webkit - column - count: 4;
    column - count: 4;
  }
}
@media(max - width: 1000px) {
  #photos {
    -moz - column - count: 3;
    -webkit - column - count: 3;
    column - count: 3;
  }
}
@media(max - width: 800px) {
  #photos {
    -moz - column - count: 2;
    -webkit - column - count: 2;
    column - count: 2;
  }
}
@media(max - width: 400px) {
  #photos {
    -moz - column - count: 1;
    -webkit - column - count: 1;
    column - count: 1;
  }
}

<Heading as='h4' size='lg' color='#FF69B4'>Skills List</Heading>


<Button
        position="absolute"
        bottom="0" left="320"
        borderTopRadius="md">Button 2
      </Button>

position: absolute;
top: -0px;
right: 130px;

<Textarea
  value={imagePath}
  isReadOnly
/>

<Flex wrap="wrap"></Flex>

data.push({ name: resRef.name, url: url });