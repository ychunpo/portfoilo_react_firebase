{
  images.map(image => {
    return (
      <div
        key={image.id}
        className=''
      >

        <div className="">
          {postImages(image)}
        </div>
      </div>
    )
  })
}