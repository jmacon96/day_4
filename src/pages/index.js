import React from "react";
import axios from "axios";
import Location, { usePosition } from "../pages/api/location.js"
import queryString from "query-string";
export default function Home() {

  const [restaurants_raw, setRestaurants] = React.useState();
  const [playing, setPlaying] = React.useState(false);
  const [radius, setRadius] = React.useState('15000')
  const [response, setResponse] = React.useState("");
  const [restaurantImage, setRestaurantImage] = React.useState("")
  const position = usePosition();

  const handle_change = (event) => {
    const value = event.target.value;
    setRadius(value);
    console.log("Set Radius ", radius)
  };
  // location=34.71113129220071,-82.7900928825088
  const latitude = 34.71113129220071
  const longitude = -82.7900928825088
  const OnSubmit = () => {
    const URL = queryString.stringifyUrl({
      url: "/api/restaurant",
      query: {
        radius, latitude: position.latitude, longitude: position.longitude, 
      }
    })

    if(position.latitude){
      console.log(playing, radius, position.latitude, position.longitude)
      axios.get(URL).then((response) => setRestaurants(response.data));
    }
    
  
  }
  console.log(restaurants_raw)
  const restaurants = restaurants_raw && restaurants_raw.results
  const restaurantOpenNow = restaurants && restaurants.filter(r => r.opening_hours != undefined)
  const restaurantNames = restaurantOpenNow && restaurantOpenNow.map(restaurant=> (
    restaurant.name))
  

  
  
  // Get next page token, this is used to go to the next page of results using googles api
  // const nextPageToken = restaurantOpenNow && restaurantOpenNow.map(restaurant=> (
  //   restaurant.next_page_token))

  // Randomly pick a restaurant 
  const selection = 0
  const yourRestaurant = restaurantNames && restaurantNames[selection]
  

  return (
    <main>
      <div className="bg-indigo-100">

        <h1>First restaurant from google API is {yourRestaurant}</h1>
    
            <input
              placeholder="Radius"
              value={radius}
              onChange={handle_change}/>
            <button
              onClick={OnSubmit}
            >
              Let's Eat!
            </button>
          </div>
  </main>
  );
}


//    <AnswerInput onGuess={guess}/>