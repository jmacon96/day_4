import axios from "axios";
import getRawBody from "raw-body";
import isJpg from "is-jpg";
import isPng from "is-png";

const keyId = process.env.BACKBLAZE_KEY_ID;
const keyName = process.env.BACKBLAZE_KEY_NAME;
const applicationKey = process.env.BACKBLAZE_APPLICATION_KEY;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function backblazeApiHandler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.json({ error: "Method Not Allowed" });
    return;
  }

  const image = await getRawBody(req);

  let extension = "";
  if (isJpg(image)) extension = "jpg";
  if (isPng(image)) extension = "png";

  if (!extension) {
    res.statusCode = 415;
    res.json({ error: "Unsupported Media Type" });
  }

  console.log("extension", extension);
  console.log("category", req.query.category);

  const base64 = Buffer.from(`${keyId}:${applicationKey}`).toString("base64");
  const authResponse = await axios.get(
    `https://api.backblazeb2.com/b2api/v2/b2_authorize_account`,
    { headers: { Authorization: `Basic ${base64}` } }
  );

  const uploadUrlResponse = await axios.post(
    `${authResponse.data.apiUrl}/b2api/v2/b2_get_upload_url`,
    {
      bucketId: authResponse.data.allowed.bucketId,
    },
    {
      headers: { Authorization: authResponse.data.authorizationToken },
    }
  );

  const uploadFileResponse = await axios.post(
    uploadUrlResponse.data.uploadUrl,
    image,
    {
      headers: {
        Authorization: uploadUrlResponse.data.authorizationToken,
        "Content-Type": "b2/x-auto",
        "X-Bz-File-Name": `${req.query.category}-${Date.now()}.${extension}`,
        "X-Bz-Content-Sha1": "do_not_verify",
      },
    }
  );

  res.statusCode = 201;
  res.json({ message: "Created" });
}
