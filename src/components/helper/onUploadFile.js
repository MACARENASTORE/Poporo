import { uploadfiles } from "./uploadfile";

export const onUploadfiles = async (files = []) => {
    const filesUploadPromises = [];
    for (const file of files) {
      filesUploadPromises.push(uploadfiles(file));
    }
  
    const photourls = await Promise.all(filesUploadPromises);
    return photourls;
  };