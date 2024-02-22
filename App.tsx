import { useState, useEffect } from 'react';
import {
  Text, View, Platform,
  StyleSheet, TextInput, ImageBackground
} from 'react-native';
import SearchInput from './components/SearchInput';

import getImageForWeather from './utils/getImageForWeather';
import { fetchRealWeather } from './utils/api';

const App = () => {

  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [temperature, setTemparature] = useState(0);
  const [weather, setWeather] = useState('');

  useEffect(() => {
    handleUpdateLocation('gazipur');
  }, []);

  const handleUpdateLocation = async (city: string) => {
    if (!city) return;

    console.log("Before making the call for fetchRealWeather");

    try {

      // console.log('I am inside try block');

      const obj = await fetchRealWeather(city);

      // console.log(obj);

      setLoading(false);
      setError(false);
      setLocation(obj.location);
      setWeather(obj.weather);
      setTemparature(obj.temparature);

    } catch (e) {
      setLoading(false);
      setError(true);
    }

    console.log("After making the call for fetchRealWeather");
    // console.log(obj);

  }

  return (

    <View style={styles.container}>
      <ImageBackground
        source={getImageForWeather('backImage')}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}

              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                  <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                  <Text style={[styles.largeText, styles.textStyle]}>{temperature}°C</Text>
                </View>
              )}

              <SearchInput
                pHolder="Search Any City"
                onSubmit={handleUpdateLocation}
              />
            </View>
          )}

        </View>
      </ImageBackground>
    </View>
  );

}


export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,

  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1.
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }
});