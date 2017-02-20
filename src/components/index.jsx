import React, { Component } from 'react';
import { Grid, Image, Row, Col, Panel } from 'react-bootstrap';
import fetchJsonp from 'fetch-jsonp';
import Loader from './loader';

import 'bootstrap/dist/css/bootstrap.css';
import '../styling/index.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      instagramMedia: [],
    }
  }

  componentDidMount () {
    // fetch Instagram images
    fetchJsonp('https://api.instagram.com/v1/users/self/media/recent/?access_token=540289959.29f38f4.3734ac00bcc349919709143960579038&callback=JSON_CALLBACK&count=3')
    .then((function(data) {
      return data.json();
    }))
    .then(function(instagramData) {
      this.setState({instagramMedia: instagramData.data, loading: false});
    }.bind(this))
    .catch(function(oops) {
      console.log(oops);
    });

  }

  render() {
    console.log(this.state);

    let content;
    if(this.state.loading === true) {
      content = content = <Loader loaderStatus='Loading...' />;
    } else {
      const instagramContent = this.state.instagramMedia.map((instagramData) => {
        return (
          <Col xs={12} sm={4} key={instagramData.id} className="instagram-media">
            <Image src={instagramData.images.low_resolution.url} responsive rounded className="center-block" />
          </Col>
        );
      });

const hireUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdNiATjYoGgQJcR-DBYoOZcxsaGkNyz0C2pb2UTCNg8AulIuA/viewform';

      content = (
        <div>
          <div className="text-center">
            <Image src="http://res.cloudinary.com/go-for-self/image/upload/c_scale,w_800/andrewgolightly.com/Andrew_in_Yangon.jpg" thumbnail title="Andrew Golightly" />
            <h1>Andrew Golightly</h1>
            <h3>web developer & counsellor</h3>

            <br/ >
              <a className="btn btn-default btn-lg" href={hireUrl} role="button">Apply To Work With Andrew</a>
            </div>
            <hr />
            <Row className="lead-copy">
              <Col xs={12}>
                <p className="lead text-center">As both a trained counsellor and web developer I am in a unique position in being able to understand your needs and vision in your work, while also being able to technically implement those ideas.</p>
              </Col>
            </Row>
            <Row>
              <Col xs={12}><h2>Key skillsets</h2></Col>
              <Col xs={12} sm={6}>
                <Panel>
                  <h2>web developer</h2>
                  <ul className="fa-ul">
                    <li><i className="fa-li fa fa-laptop"></i> fullstack JavaScript web developer</li>
                    <li><i className="fa-li fa fa-laptop"></i> specialist in React.js and Node.js</li>
                    <li><i className="fa-li fa fa-laptop"></i> expert in connecting 3rd party services</li>
                  </ul>
                </Panel>
              </Col>
              <Col xs={12} sm={6}>
                <Panel>
                  <h2>counsellor</h2>
                  <ul className="fa-ul">
                    <li><i className="fa-li fa fa-comment-o"></i> qualified counsellor with 7 years experience</li>
                    <li><i className="fa-li fa fa-comment-o"></i> skilled in supporting others to process their inner emotional struggles</li>
                    <li><i className="fa-li fa fa-comment-o"></i> providing a safe, caring, and confidential space</li>
                  </ul>
                </Panel>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12}><h2><i className="fa fa-instagram"></i> Instagram <small><a href="https://www.instagram.com/magician11"><i className="fa fa-external-link"></i> follow me</a></small></h2></Col>
              { instagramContent }
            </Row>
            <Row className="footer text-center">
              <Col xs={12} sm={6}>
                <i className="fa fa-copyright" aria-hidden="true"></i> { new Date().getFullYear() } Created by Andrew Golightly
              </Col>
              <Col xs={12} sm={6}>
                <ul className="list-inline">
                  <li><a href="https://twitter.com/AndrewGolightly" title="Andrew Golightly on Twitter"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a></li>
                  <li><a href="https://www.facebook.com/andrewgolightly11" title="Andrew Golightly on Facebook"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                  <li><a href="https://github.com/magician11/" title="Andrew Golightly (magician11) on GitHub"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a></li>
                  <li><a href="https://www.linkedin.com/in/andrewgolightly11" title="Andrew Golightly on LinkedIn"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a></li>
                </ul>
              </Col>
            </Row>
          </div>
          );
          }

          return (
          <Grid className="ag-homepage">
            { content }
          </Grid>
          );
          }
          }
