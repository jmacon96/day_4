// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.71113129220071,-82.7900928825088&radius=15000&type=restaurant&key=AIzaSyBaQrKP5YhbUNZj9RCrUhcu46-R9Fo3BTU`
  );

  res.statusCode = 200;
  res.json(response.data);
}
