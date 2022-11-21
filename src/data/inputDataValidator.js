import * as yup from "yup";

export const projectSchema = yup.object().shape({
  rank: yup.number().positive().integer(),
  title: yup.string(),
  use: yup.string(),
  description: yup.string(),
  website: yup.string().url(),
  video: yup.string().url(),
  git: yup.string().url(),
  uiux: yup.string().url(),
  cover: yup.object().shape({
    caption: yup.string(),
    image: yup.mixed(),
    images: yup.array().of(
      yup.object().shape({
        imagePath: yup.string().url(),
        imageName: yup.string(),
      })
    ),
  }),
  items: yup.array().of(
    yup.object().shape({
      itemId: yup.number().positive().integer(),
      itemCaption: yup.string(),
      itemText: yup.string(),
      itemImages: yup.array().of(
        yup.object().shape({
          itemImageId: yup.number().positive().integer(),
          itemImageFilename: yup.string(),
          itemImagePath: yup.string().url(),
          itemImageFile: yup.mixed(),
        })
      )
    })
  )
});

export const skillSchema = yup.object().shape({
  name: yup.string().required(),
  level: yup.number().min(1).max(100).positive().integer().required(),
});
