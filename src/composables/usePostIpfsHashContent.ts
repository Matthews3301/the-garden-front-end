import env from '@/utils/env';
import lighthouse from '@lighthouse-web3/sdk'


export default async function usePostIpfsHashContent(content: string) {
  
  const apiKey = env().LIGHTHOUSE_API_KEY;

  try{
    const response = await lighthouse.uploadText(content, apiKey)

    return response?.data?.Hash;
  } catch (error) {
    console.log(error);
  }
}







/* 
* PINATA VERSION
*
* 
const formData = new FormData();
const JWT = env().PINATA_API_JWT;

const blob = new Blob([content], { type: "text/plain" });
const fileName = uuidv4();
formData.append('file', blob)
formData.append('pinataMetadata', JSON.stringify({ name: fileName }));
formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));

try{
  const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxBodyLength: "Infinity",
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      'Authorization': `Bearer ${JWT}`
    }
  });
  
  return response?.data?.IpfsHash;
} catch (error) {
  console.log(error);
} */