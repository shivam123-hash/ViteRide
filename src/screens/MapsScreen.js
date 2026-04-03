import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
    return (
        <SafeAreaView style={styles.container}>

            {/* Ek chota sa header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>ViteRide Map</Text>
            </View>

            {/* MapView Component */}
            <View style={styles.mapContainer}>
                <MapView
                    // PROVIDER_GOOGLE lagana zaroori hai iOS mein Google Maps dikhane ke liye
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    // initialRegion batata hai ki map khulte hi kaunsi location dikhani hai
                    initialRegion={{
                        latitude: 28.6139,       // New Delhi Latitude
                        longitude: 77.2090,      // New Delhi Longitude
                        latitudeDelta: 0.05,     // Zoom level (kam value matlab zyada zoom)
                        longitudeDelta: 0.05,    // Zoom level
                    }}
                    showsUserLocation={true}   // User ki current location ka blue dot dikhane ke liye
                    showsMyLocationButton={true} // Location button dikhane ke liye
                >

                    {/* Map par Pin/Marker lagane ke liye */}
                    <Marker
                        coordinate={{
                            latitude: 28.6139,
                            longitude: 77.2090
                        }}
                        title="Start Point"
                        description="Yeh aapki ride ka start point hai"
                    />

                </MapView>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 15,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    mapContainer: {
        flex: 1, // Map ko screen ki baaki saari jagah lene ke liye flex 1 zaroori hai
    },
    map: {
        ...StyleSheet.absoluteFillObject, // Map ko full width aur height dene ke liye sabse best tarika
    },
});