import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem, Grid, Row, Col, Image, Glyphicon } from 'react-bootstrap';
import Post from './Post';

export default class Posts extends Component {
  hideTarget(e) {
    e.target.style.display = 'none';
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col mdOffset={2} xs={12} md={8}>
            <ListGroup>
              {this.props.posts.items.map((post, i) =>
                <ListGroupItem key={i}>
                  <div className="text-right view-link">
                    See more <Glyphicon glyph="chevron-right" />
                  </div>
                  <Link to={'/post/' + i} params={{post: post}}>
                    <Row>
                      <Col xs={2}>
                        <div className="thumb-wrapper">
                          {post.preview && post.preview.images && post.preview.images[0].source &&
                            <img onError={this.hideTarget} src={post.preview && post.preview.images[0].source.url} />
                          }
                        </div>
                      </Col>
                      <Col xs={10}>
                        <p className="post-title-list">{post.title}</p>
                      </Col>
                    </Row>
                  </Link>
                </ListGroupItem>)}
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
