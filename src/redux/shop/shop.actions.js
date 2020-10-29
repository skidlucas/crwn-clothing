import ShopActionTypes from './shop.types';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMaps => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMaps
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});