import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {LatLng, Marker, Polyline, Region} from 'react-native-maps';

type MapViewProps = {
  initialRegion: Region;
  markers?: Array<{
    id: string;
    coordinate: LatLng;
    title?: string;
    onPress?: (id: string) => void;
  }>;
  polylines?: Array<{
    coordinates: LatLng[];
    strokeColor?: string;
    strokeWidth?: number;
  }>;
  style?: object;
};

const MapViewComponent: React.FC<MapViewProps> = ({
  initialRegion,
  markers = [],
  polylines = [],
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        testID="map-view">
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => marker.onPress?.(marker.id)}
            testID={`marker-${marker.id}`}
          />
        ))}
        {polylines.map((polyline, index) => (
          <Polyline
            key={`polyline-${index}`}
            coordinates={polyline.coordinates}
            strokeColor={polyline.strokeColor || '#000'}
            strokeWidth={polyline.strokeWidth || 3}
            testID={`polyline-${index}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapViewComponent;
