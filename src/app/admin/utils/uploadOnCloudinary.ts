import axios from "axios";

export const UploadAssets = async (file : File) => {

    const signatuerRes = await axios.get("http://localhost:3000/cloudinary_signature")
    const { signatuer , timestamp , CloudName  , APIKey } = signatuerRes.data

    const formData = new FormData();
    formData.append("file", file)
    formData.append('api_key', APIKey)
    formData.append('timestamp', timestamp)
    formData.append('signature', signatuer)

    const res = await axios.post(`https://api.cloudinary.com/v1_1/${CloudName}/image/upload` , formData)
    const imageDeets = { ImageURL : res.data.secure_url , ImageId :  res.data.public_id }
    return imageDeets
}