import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {RootStackParamList} from '../../../shared/types';
import MapView from '../../components/MapViewComponent';
import useHomeViewModel from './useHomeViewModel';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const workers = useHomeViewModel().getWorkerViewData();

  const handlePinPress = (workerId: string) => {
    navigation.navigate('WorkerDetail', {workerId});
  };

  return (
    <MapView
      initialRegion={{
        latitude: 43.6532,
        longitude: -79.3832,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      markers={workers.map(worker => ({
        id: worker.id,
        coordinate: worker.location,
        title: worker.name,
        onPress: handlePinPress,
      }))}
      style={styles.map}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
