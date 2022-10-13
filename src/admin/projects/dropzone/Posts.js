import React, { useEffect, useState } from 'react'

const Posts = (props) => {
  const { imagesData } = props;
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');

  //console.log('imagesData-post:', imagesData);
  console.log('image-post', imagesData[0])
  console.log('text-post', imagesData[1])

  useEffect(() => {
    setImages(imagesData[0]);
    setText(imagesData[1]);
  }, []);

  const postImages = (post) => {
    const post_images = post.images?.map((file) => {
      console.log('file', file);
      return (
        <div className='' key={file}>
          <img src={file} layout="fill" objectFit='cover' alt='' />
        </div>
      )
    })
    return post_images;
  }

  // useEffect(() => {
  //   const unsubscribe = setPosts(imagesData.map(
  //     (doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     })))
  //   return unsubscribe;
  // }, [])

  return (
    <div>
      <div className="">{text}</div>

    </div>
  )
}

export default Posts;
