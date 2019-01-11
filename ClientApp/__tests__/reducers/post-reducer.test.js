import { postActionCreators, reducer } from './../../src/store/Posts';
import moment from 'moment';

describe('postReducer', () => {
  const initialState = { posts: [], isLoading: false};
  const samplePost1 = {
    title: 'Post 1',
    dateOpened: moment().subtract(7, 'days').toString(),
    dateClosed: moment().add(7, 'days').toString(),
    locationId: 0,
    pointValue: 100,
    description: 'Description 1',
    id: 0
  }
  const samplePost2 = {
    title: 'Post 2',
    dateOpened: moment().subtract(4, 'days').toString(),
    dateClosed: moment().add(4, 'days').toString(),
    locationId: 0,
    pointValue: 200,
    description: 'Description 2',
    id: 1
  }
  const samplePost3 = {
    title: 'Post 3',
    dateOpened: moment().subtract(5, 'days').toString(),
    dateClosed: moment().subtract(2, 'days').toString(),
    locationId: 0,
    pointValue: 300,
    description: 'Description 3',
    id: 2
  }

  it('Should return default state if no action type is recognized', () => {
    expect(reducer(initialState, { type: null })).toEqual(initialState)
  });

  it('Should set isLoading to true', () => {
    const expectedState = Object.assign(initialState, {isLoading: true})
    expect(reducer(initialState, {type:'REQUEST_POSTS'})).toEqual(expectedState)
  })

  it('Should set posts to the state and isLoading to false', () => {
    const posts = [samplePost1, samplePost2, samplePost3]
    const previousState = Object.assign(initialState, {isLoading: true})
    const expectedState = Object.assign(previousState, {posts: posts, currentPosts: [samplePost1, samplePost2], isLoading: false})
    expect(reducer(previousState, {type:'RECEIVE_POSTS', posts})).toEqual(expectedState)
  })

  it('Should set post to edit', () => {
    const posts = [samplePost1, samplePost2, samplePost3]
    const id = samplePost2.id
    const previousState = Object.assign(initialState, {posts:posts})
    const expectedState = Object.assign(previousState, {postToEdit: samplePost2})
    expect(reducer(previousState, {type:'SET_POST_TO_EDIT', id})).toEqual(expectedState)
  })
  it('Should update the posts list', () => {
    const posts = [samplePost1, samplePost2, samplePost3]
    const samplePost4 = {
      title: 'Post 4',
      dateOpened: moment().subtract(5, 'days').toString(),
      dateClosed: moment().add(8, 'days').toString(),
      locationId: 0,
      pointValue: 400,
      description: 'Description 4',
      id: 3
    }
    const updatedPosts = [samplePost1, samplePost2, samplePost3, samplePost4]
    const previousState = Object.assign(initialState, {posts: posts})
    const expectedState = Object.assign(previousState, {posts: updatedPosts})
    expect(reducer(previousState, {type:'UPDATE_POST_LIST', updatedPosts})).toEqual(expectedState)
  })
});
