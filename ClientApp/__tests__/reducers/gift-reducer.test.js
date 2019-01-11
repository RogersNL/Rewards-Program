import { giftActionCreators, reducer } from './../../src/store/Gifts';


describe('giftReducer', () => {
  const initialState = { gifts: [], isLoading: false};
  const sampleGift1 = {
    id: 0,
    cost: 100,
    name: 'Some Gift 1',
    description: 'Some Description 1'
  }
  const sampleGift2 = {
    id: 1,
    cost: 200,
    name: 'Some Gift 2',
    description: 'Some Description 2'
  }
  const sampleGift3 = {
    id: 2,
    cost: 300,
    name: 'Some Gift 3',
    description: 'Some Description 3'
  }


  it('Should return default state if no action type is recognized', () => {
    expect(reducer(initialState, { type: null })).toEqual(initialState)
  });

  it('Should set loading to true', () => {
    const expectedState = Object.assign(initialState, {isLoading: true})
    expect(reducer(initialState, {type: 'REQUEST_GIFTS'})).toEqual(expectedState)
  })

  it('Should set list of gifts to state and turn isLoading to false', () => {
    const gifts = [sampleGift1, sampleGift2, sampleGift3]
    const previousState = Object.assign(initialState, { isLoading: true })
    const expectedState = Object.assign(previousState, { isLoading: false, gifts: gifts })
    expect(reducer(previousState, {type: 'RECEIVE_GIFTS', gifts})).toEqual(expectedState)
  })

  it('Should set the gift to edit', () => {
    const gifts = [sampleGift1, sampleGift2, sampleGift3]
    const id = sampleGift1.id
    const previousState = Object.assign(initialState, {gifts: gifts})
    const expectedState = Object.assign(previousState, {giftToEdit: sampleGift1})
    expect(reducer(previousState, {type: 'SET_GIFT_TO_EDIT', id})).toEqual(expectedState)
  })

  it('Should update gifts list', () => {
    const gifts = [sampleGift1, sampleGift2, sampleGift3]
    const sampleGift4 = {
      id: 3,
      cost: 400,
      name: 'Some Gift 4',
      description: 'Some Description 4'
    }
    const updatedGifts = [sampleGift1, sampleGift2, sampleGift3, sampleGift4]
    const previousState = Object.assign(initialState, {gifts:gifts})
    const expectedState = Object.assign(previousState, {gifts: updatedGifts})
    expect(reducer(previousState, {type:'UPDATE_GIFT_LIST', updatedGifts})).toEqual(expectedState)

  })
});
