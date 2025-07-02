import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../shared/types';
import MapView from '../../components/MapViewComponent';
import useWorkerDetailViewModel from './useWorkerDetailViewModel';

type WorkerDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'WorkerDetail'
>;

const WorkerDetailScreen: React.FC = () => {
  const route = useRoute<WorkerDetailScreenRouteProp>();
  const {selectedWorker, breadcrumbs, triggerEmergency} =
    useWorkerDetailViewModel(route.params.workerId);

  if (!selectedWorker) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: selectedWorker.location.latitude,
          longitude: selectedWorker.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        polylines={[
          {
            coordinates: breadcrumbs,
            strokeColor: '#000',
            strokeWidth: 3,
          },
        ]}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.workerName}>{selectedWorker.name}</Text>
        <Text>Last check-in: {new Date().toLocaleTimeString()}</Text>
        <Button title="Simulate Worker SOS" onPress={triggerEmergency} />
      </View>
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
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  workerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default WorkerDetailScreen;
