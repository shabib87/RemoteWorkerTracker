import {useEffect} from 'react';
import {Alert} from 'react-native';
import NativeEmergencySOS from '../../../../specs/NativeEmergencySOS';
import useWorkerStore from '../../../shared/stores/useWorkerStore';
import {BreadcrumbViewData} from './BreadcrumbViewData';

const mockedBreadcrumbs: BreadcrumbViewData[] = [
  {
    latitude: 43.6532, // Yonge-Dundas Square
    longitude: -79.3832,
  },
  {
    latitude: 43.651, // Trinity Bellwoods Park
    longitude: -79.4145,
  },
  {
    latitude: 43.6426, // CN Tower area
    longitude: -79.3871,
  },
  {
    latitude: 43.7767, // North York Centre
    longitude: -79.4144,
  },
  {
    latitude: 43.6205, // Humber Bay Park
    longitude: -79.4781,
  },
];

function useWorkerDetailViewModel(workerId: string) {
  const selectedWorker = useWorkerStore(state => state.selectedWorker);
  const selectWorker = useWorkerStore(state => state.selectWorker);
  const clearSelectedWorker = useWorkerStore(
    state => state.clearSelectedWorker,
  );

  async function triggerEmergency() {
    const result = await NativeEmergencySOS.triggerSOS();
    Alert.alert('Emergency Triggered', result);
  }

  useEffect(() => {
    selectWorker(workerId);
    return () => {
      clearSelectedWorker();
    };
  }, [workerId, selectWorker, clearSelectedWorker]);

  return {
    selectedWorker,
    breadcrumbs: mockedBreadcrumbs,
    triggerEmergency,
  };
}

export default useWorkerDetailViewModel;
