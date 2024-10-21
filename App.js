import * as React from 'react';
import * as Location from 'expo-location'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';

const utlogo = require('./assets/images/logout.webp');


export default function App() {
  const [origin, setOrigin] = React.useState({
    latitude: 32.437935, 
    longitude:-114.715310,

  });

  const [destination, setDestination] = React.useState({
    latitude:32.480169, 
    longitude: -114.778629,
  });


  async function getLocationPermission() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted') {
        alert('Permiso denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const curret = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }

      setOrigin(curret);
  }

  React.useEffect(() => {
    getLocationPermission();
}, [])


  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      }}
      >
        
        <Marker 
          draggable
          coordinate={origin}
          image={utlogo}
          onDragEnd={(direction) => 
            setOrigin(direction.nativeEvent.coordinate)}
        />
        

        <Marker
          draggable
          coordinate={destination}
          onDragEnd={(direction) => 
            setDestination(direction.nativeEvent.coordinate)}
        />

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="green"
          strokeWidth={4}
        
        />




        <Polyline
          coordinates={[ origin,destination ]}
          strokeColor="green"
          strokeWidth={4}
        />

       </MapView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
