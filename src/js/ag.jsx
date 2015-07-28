/** @jsx React.DOM */

/* main structure */
/* -------------------------------------- */
var AGsDynamicContent = React.createClass({

    render: function() {
        return (
            <div>
            <AGsLocation country={this.props.country}/>
            <AGsInstagram />
            <AGsGoForSelfFeed />
            <AGsCloudinary />
            </div>
        );
    }
});

/* -------------------------------------- */

/* where am I section */
/* -------------------------------------- */
var AGsLocation = React.createClass({
    getInitialState: function() {
        return {
            AGslocalTime: ''
        };
    },
    getLocalTime: function() {
        var localTimeAPIUrl = "http://api.worldweatheronline.com/free/v2/tz.ashx?format=json&key=2f273020a2a0588a5b0cee95b461d&q=" +
            this.props.country;

        $.ajax({
            url: localTimeAPIUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({AGslocalTime: data.data.time_zone[0].localtime});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("Error");
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.getLocalTime();
        setInterval(this.getLocalTime, 60000);
    },
    getMapUrl: function() {
        return "http://www.google.com/maps/place/" + this.props.country;
    },
    render: function() {
        return (
            <section className="row">

            <h3 className="ag-section-heading"><i className="fa fa-home"></i> Where I am in the world</h3>

            <div className="small-6 column">
            <div>
            <p>I'm currently in <a href={this.getMapUrl()}>{this.props.country}</a>.</p>
            <p>My local time is approximately <strong>{this.state.AGslocalTime}</strong></p>
            </div>
            </div>

            <div className="small-6 column">
            <p>To book a time to talk, <a href="https://goforself.youcanbook.me/">click here</a>.</p>
            </div>

            </section>
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
            </a></li>
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
                    console.log(post);
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

        /* one of my cloudinary songs */
        /* -------------------------------------- */

        var AGsCloudinary = React.createClass({
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

        /* rendering the main structure */
        /* -------------------------------------- */
        React.render(<AGsDynamicContent country="England" />, document.getElementById('ag-dynamic-content'));