import * as yup from "yup";

export const projectSchema = yup.object().shape({
  rank: yup.number().positive().integer(),
  title: yup.string(),
  use: yup.string(),
  description: yup.string(),
  websiteUrl: yup.string().url(),
  videoUrl: yup.string().url(),
  gitUrl: yup.string().url(),
  uiuxUrl: yup.string().url(),
  coverCaption: yup.string(),
  coverImageFilename: yup.string(),
  coverImagePath: yup.string().url(),
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
