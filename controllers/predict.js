import axios from "axios";

export const predictImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image);

    if (!image) return res.status(400).send("No image");
    let cleansedImage = image.replace(/^data:image\/\w+;base64,/, "");

    let b64string = cleansedImage;
    //Buffer objects are used to represent a fixed-length sequence of bytes
    let buffer = Buffer.from(b64string, "base64");

    const requestToAWS = axios({
      method: "post",
      //url: 'https://kry5urq07j.execute-api.us-east-2.amazonaws.com/production/predict-pneumonia',
      //url: "https://kry5urq07j.execute-api.us-east-2.amazonaws.com/blocked_ip/predict-pneumonia",
      url: "https://kry5urq07j.execute-api.us-east-2.amazonaws.com/allowed_ip/predict-pneumonia",
      headers: {
        "Content-type": "application/x-image",
      },
      data: buffer,
    })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log("Error", err);
      });

    const respFromAWS = await requestToAWS;
    return res.json({ message: respFromAWS });
  } catch (err) {
    console.log(err);
  }
};
