export const fetchRealWeather = async city => {

  // console.log("I am inside fetchRealWeather");

  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=853P9S48LMZN52LAR6A43EUSS&contentType=json`
  );

  const jsonResponse = await response.json();
  console.log(jsonResponse);

  console.log("I am after the fetch call inside fetchRealWeather");

  console.log( jsonResponse.address);
  console.log( jsonResponse.days[0].conditions);
  console.log( jsonResponse.days[0].temp);

  return {
    location : jsonResponse.address,
    weather : jsonResponse.days[0].conditions,
    temparature : jsonResponse.days[0].temp
  };

}