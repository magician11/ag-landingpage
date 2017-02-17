/** @jsx React.DOM */

/* main structure */
/* -------------------------------------- */
var AGsDynamicContent = React.createClass({

  render: function() {
    return (
      <div>
        <AGsInstagram />
        <AGsGoForSelfFeed />
        <AGsSoundCloud />
        <Footer />
      </div>
    );
  }
});

/* -------------------------------------- */

/* my instagram feed */
/* -------------------------------------- */
var AGsInstagramImg = React.createClass({

  render: function() {
    return (
      <li>
        <a href={this.props.instagramImgLink}>
          <img src={this.props.instagramImgSrc} className="img-thumbnail" />
        </a>
      </li>
    );
  }
});

var AGsInstagram = React.createClass({
  getInitialState: function() {
    return {
      AGsMedia: []
    };
  },
  componentDidMount: function() {
    var endPoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=540289959.29f38f4.3734ac00bcc349919709143960579038&callback=JSON_CALLBACK&count=3';

    $.ajax({
      url: endPoint,
      dataType: 'jsonp',
      cache: false,
      success: function(data) {
        this.setState({AGsMedia: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Error");
      }.bind(this)
    });
  },
  render: function() {

    var mediaCells = [];
    this.state.AGsMedia.forEach(function(instagramImg) {
      mediaCells.push(<AGsInstagramImg instagramImgLink={instagramImg.link} instagramImgSrc={instagramImg.images.low_resolution.url} />);
    });

    return (
      <section className="row">

        <h3 className="ag-section-heading"><i className="fa fa-camera"></i> Recent images</h3>

        <ul className="medium-block-grid-3">
          {mediaCells}
        </ul>

      </section>
    );
  }
});

/* -------------------------------------- */

/* my Go For Self blog feed */
/* -------------------------------------- */
var AGsGoForSelfPost = React.createClass({
  render: function() {
    return (
      <div className="medium-4 column">
        <h4>{this.props.articleTitle}</h4>
        <p>{this.props.articleSnippet} <a href={this.props.articleUrl}>read more</a></p>
      </div>
    );
  }
});

var AGsGoForSelfFeed = React.createClass({
  getInitialState: function() {
    return {
      AGsGFSposts: []
    };
  },
  componentDidMount: function() {
    var feedUrl = 'http://www.goforself.me/feed/';
    var numPosts = 3;

    $.ajax({
      url: 'http://ajax.googleapis.com/ajax/services/feed/load',
      dataType: 'jsonp',
      data: { v: '1.0', q: feedUrl, callback: 'JSON_CALLBACK', num: numPosts },
      cache: false,
      success: function(data) {
        this.setState({AGsGFSposts: data.responseData.feed.entries});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Error");
      }.bind(this)
    });
  },
  render: function() {
    var goForSelfPosts = [];
    this.state.AGsGFSposts.forEach(function(post) {
      goForSelfPosts.push(<AGsGoForSelfPost articleTitle={post.title} articleSnippet={post.contentSnippet} articleUrl={post.link} />);
    });
    return (
      <section className="row">

        <h3 className="ag-section-heading"><i className="fa fa-pencil"></i> Recent articles</h3>
        {goForSelfPosts}
      </section>
    );
  }
});

/* -------------------------------------- */

/* one of my SoundCloud songs */
/* -------------------------------------- */

var AGsSoundCloud = React.createClass({
  render: function() {
    return (
      <section className="row">

        <h3 className="ag-section-heading"><i className="fa fa-music"></i> My musical creations</h3>
        <iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/205952023&amp;color=3498DB&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>

      </section>
    );
  }
});

/* -------------------------------------- */

/* -------------------------------------- */

/* my Go For Self blog feed */
/* -------------------------------------- */
var SocialNetwork = React.createClass({
  render: function() {

    var socialIconClasses = "fa fa-stack-1x fa-" + this.props.icon;

    return (
      <a href={this.props.link} title={this.props.name}>
        <span className="fa-stack fa-lg">
          <i className="fa fa-square-o fa-stack-2x"></i>
          <i className={socialIconClasses}></i>
        </span>
      </a>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    AGsSocialNetworks = [
      {icon: 'facebook', link: 'http://facebook.com/andrewgolightly11', name: 'Facebook'},
      {icon: 'twitter', link: 'http://twitter.com/AndrewGolightly', name: 'Twitter'},
      {icon: 'google-plus', link: 'https://plus.google.com/+AndrewGolightly/posts', name: 'Google+'},
      {icon: 'github', link: 'https://github.com/magician11/', name: 'GitHub'},
      {icon: 'instagram', link: 'https://instagram.com/magician11/', name: 'Instagram'},
      {icon: 'linkedin', link: 'https://www.linkedin.com/in/andrewgolightly11', name: 'LinkedIn'},
      {icon: 'soundcloud', link: 'https://soundcloud.com/magician11', name: 'SoundCloud'}
    ];

    var processedSocialNetworks = [];

    AGsSocialNetworks.forEach(function(socialNetwork) {
      processedSocialNetworks.push(<SocialNetwork link={socialNetwork.link} name={socialNetwork.name} icon={socialNetwork.icon} />);
    });

    return (
      <footer className="text-center row">
        <hr />
        <p>
          <a href="mailto:support@andrewgolightly.com" title="Email Andrew Golightly">
            support@andrewgolightly.com
          </a>
        </p>
        <div>
          {processedSocialNetworks}
        </div>
        <p className="text-center">echo 22519 (E22519)</p>
      </footer>
    );
  }
});

/* -------------------------------------- */

/* rendering the main structure */
/* -------------------------------------- */
React.render(<AGsDynamicContent />, document.getElementById('ag-dynamic-content'));
