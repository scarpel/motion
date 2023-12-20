import { object, string, array, mixed } from "yup";

export const UploadFormSchema = object({
  name: string().required(),
  tags: array().of(string()),
  thumbnail: mixed().required(),
});
