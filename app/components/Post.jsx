import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from '../actions';

class Post extends Component {
  componentDidMount() {const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  hideTarget(e) {
    e.target.style.display = 'none';
  }

  render() {
    const {items, params: {index}} = this.props;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} mdOffset={2} md={8}>
              <Link to='/'><Glyphicon glyph="chevron-left" /> Go back</Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12} mdOffset={2} md={8}>
              <h1 className="h1">{items[index] && items[index].title}</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} mdOffset={2} md={8}>
              <img className="responsive-image" onError={this.hideTarget} src={items[index] && items[index].preview && items[index].preview.images && items[index].preview.images[0].source.url} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

function mapProp(state) {
  const {posts} = state;
  const items = posts.items;

  return {items};
}

export default connect(mapProp)(Post);
