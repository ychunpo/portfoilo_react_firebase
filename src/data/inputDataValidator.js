import * as yup from "yup";

export const projectSchema = yup.object().shape({
  rank: yup.number().positive().integer().required(),
  title: yup.string().required(),
  use: yup.string().required(),
  description: yup.string().required(),
  website: yup.string().url(),
  video: yup.string().url(),
  code: yup.string().url(),
  uiux: yup.string().url(),
  file: yup.mixed(),
  caption: yup.string(),
});

export const skillSchema = yup.object().shape({
  name: yup.string().required(),
  level: yup.number().min(1).max(100).positive().integer().required(),
});
