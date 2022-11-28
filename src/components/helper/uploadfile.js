
export const uploadfiles = async (file) => {
    if (!file) throw new Error("No hay archivos");
  
    const cloudUrl = "https://api.cloudinary.com/v1_1/dehnpaix4/upload";
    const formData = new FormData();
    formData.append("upload_preset", "poporo");
    formData.append("file", file);
  
    try {
      const resp = await fetch(cloudUrl, {
        method: "POST",
        body: formData,
      });
      const cloudinaryResp = await resp.json();
      return cloudinaryResp.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  