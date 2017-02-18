import React, { Component } from 'react';
import { Grid, Image, Row, Col   } from 'react-bootstrap';
import Loader from './loader';

import 'bootstrap/dist/css/bootstrap.css';
import '../styling/index.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentDidMount () {
    //ajax stuff
  }

  render() {
    let content;
    if(this.state.loading === true) {
      content = content = <Loader loaderStatus='Initialising awesomeness' />;
    } else {
      content = (
        <div className="text-center">
          <Image src="http://res.cloudinary.com/go-for-self/image/upload/c_scale,w_800/andrewgolightly.com/Andrew_in_Yangon.jpg" thumbnail title="Andrew Golightly" />
          <h1>Andrew Golightly</h1>
          <h3>web developer & counsellor</h3>
          <br/ >
            <a className="btn btn-default btn-success btn-lg" href="https://docs.google.com/forms/d/e/1FAIpQLSdNiATjYoGgQJcR-DBYoOZcxsaGkNyz0C2pb2UTCNg8AulIuA/viewform" role="button">Click Here To Hire Me</a>
            <hr />
            <Row className="footer">
              <Col xs={12} sm={6}>
                <i className="fa fa-copyright" aria-hidden="true"></i> { new Date().getFullYear() } Created by Andrew Golightly
              </Col>
              <Col xs={12} sm={6}>
                <ul className="list-inline">
                  <li><a href="https://twitter.com/AndrewGolightly" title="Andrew Golightly on Twitter"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a></li>
                  <li><a href="https://www.facebook.com/andrewgolightly11" title="Andrew Golightly on Facebook"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                  <li><a href="https://github.com/magician11/" title="Andrew Golightly (magician11) on GitHub"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a></li>
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
