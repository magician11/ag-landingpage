/** @jsx React.DOM */

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

var AGsInstagram = React.createClass({
    getInitialState: function() {
        return {
            AGsMedia: []
        };
    },
    getLocalTime: function() {

    },
    componentDidMount: function() {
        var endPoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=540289959.29f38f4.3734ac00bcc349919709143960579038&callback=JSON_CALLBACK&count=3';

        $.ajax({
            url: endPoint,
            dataType: 'jsonp',
            cache: false,
            success: function(data) {
                console.log(data.data);
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
            var imgCell = '<li><a href="' + instagramImg.link + '">' + 
                '<img src="' + instagramImg.images.low_resolution.url + '" class="img-thumbnail">' +
                '</a></li>';
            mediaCells.push(imgCell);
        });

        return (
            <section className="row">

            <h3 className="ag-section-heading"><i className="fa fa-camera"></i> Recent images</h3>

            <ul class="medium-block-grid-3">
            {mediaCells}
            </ul>

            </section>
        );
    }
});

/*
<li ng-repeat="agsInstagram in ag.instagramMedia">
            <a ng-href="{{agsInstagram.link}}">
            <img ng-src="{{agsInstagram.images.standard_resolution.url}}" class="img-thumbnail">
            </a>
            <p class="text-center">{{agsInstagram.caption.text}}</p>
            </li>
            */

var AGsGoForSelfFeed = React.createClass({
    render: function() {
        return (
            <section className="row">

            <h3 className="ag-section-heading"><i className="fa fa-pencil"></i> Recent articles</h3>

            </section>
        );
    }
});

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



React.render(<AGsDynamicContent country="England" />, document.getElementById('ag-dynamic-content'));