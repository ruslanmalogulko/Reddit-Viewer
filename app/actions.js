import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';


function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

export function invalidatePosts() {
  return {
    type: INVALIDATE_POSTS
  };
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return fetch(`https://www.reddit.com/top/.json?count=20`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  };
}

function shouldFetchPosts(state) {
  const posts = state.posts;
  if (!posts || posts.didInvalidate) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return false;
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  };
}
