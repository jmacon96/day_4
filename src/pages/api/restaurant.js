// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
export default async function handler(req, res) {
  if(!req.query.radius || !req.query.latitude || !req.query.longitude){
    res.statusCode = 400;
    res.json({error: "bad request"});
    return;
  }
  console.log(req.query.radius)
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
      location: `${req.query.latitude},${req.query.longitude}`,
      radius: req.query.radius,
      type: 'restaurant',
      pagetoken: '',
      key: process.env.MAPS_API_KEY,
    }
  })

  res.statusCode = 200;
  res.json(response.data);
}