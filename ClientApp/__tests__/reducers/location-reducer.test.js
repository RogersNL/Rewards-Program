import { locationActionCreators, reducer } from './../../src/store/Locations';


describe('locationReducer', () => {
  const initialState = { locations: [], isLoading: false};
  const sampleLocation1 = {
    id: 0,
    name: 'Location 1',
    address: 'Location Address 1000 st'
  }
  const sampleLocation2 = {
    id: 1,
    name: 'Location 2',
    address: 'Location Address 2000 st'
  }
  const sampleLocation3 = {
    id: 2,
    name: 'Location 3',
    address: 'Location Address 3000 st'
  }

  it('Should return default state if no action type is recognized', () => {
    expect(reducer(initialState, { type: null })).toEqual(initialState)
  });

  it('Should set isLoading to true', () => {
    const expectedState = Object.assign(initialState, {isLoading: true})
    expect(reducer(initialState, {type:'REQUEST_LOCATIONS'})).toEqual(expectedState)
  })

  it('Should set locations list to the state and isLoading to false', () => {
    const locations = [sampleLocation1, sampleLocation2, sampleLocation3]
    const previousState = Object.assign(initialState, {isLoading:true})
    const expectedState = Object.assign(previousState, {locations: locations, isLoading: false})
    expect(reducer(initialState, {type:'RECEIVE_LOCATIONS', locations})).toEqual(expectedState)
  })

  it('Should update locations list', () => {
    const locations = [sampleLocation1, sampleLocation2, sampleLocation3]
    const sampleLocation4 = {
      id: 3,
      name: 'Location 4',
      address: 'Location Address 4000 st'
    }
    const updatedLocations = [sampleLocation1, sampleLocation2, sampleLocation3, sampleLocation4]
    const previousState = Object.assign(initialState, {locations:locations})
    const expectedState = Object.assign(previousState, {locations: updatedLocations})
    expect(reducer(previousState, {type:'UPDATE_LOCATIONS_LIST', updatedLocations})).toEqual(expectedState)
  })
});
