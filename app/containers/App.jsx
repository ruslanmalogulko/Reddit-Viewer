require('../styles/base.scss');

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import { invalidatePosts, fetchPostsIfNeeded } from '../actions';

import Picker from '../components/Picker';
import Posts from '../components/Posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(invalidatePosts());
    dispatch(fetchPostsIfNeeded());
  }

  render() {
    const { posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <div className="header-controls">
          <Grid>
            <Row>
              <Col xs={6} md={4} mdOffset={2}>
                {lastUpdated &&
                  <span className="last-updated-field">
                    Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                    {' '}
                  </span>
                }
              </Col>
              <Col className="text-right" xs={6} md={4}>
                {isFetching &&
                  <Button bsStyle="primary disabled">
                    Fetching...
                  </Button>
                }
                {!isFetching &&
                  <Button bsStyle="primary"
                      onClick={this.handleRefreshClick}>
                    <Glyphicon glyph="refresh" /> Refresh
                  </Button>
                }
              </Col>
            </Row>
          </Grid>
        </div>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>There are no reddits available.</h2>
        }
        {posts.items.length > 0 && !this.props.children &&
          <div style={{ opacity: isFetching ? 0.3 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { posts } = state;
  const {
    isFetching,
    lastUpdated,
    items
  } = posts || {
    isFetching: true,
    items: []
  };

  return {
    posts,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App);
