import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import '/css/style.css';
 
/* An example React component */
class App extends Component {
    constructor(props) {
        super(props);

        //Initialize the state in the constructor
        this.state = {
            name: "",
            reviews: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
      }
      // handle change
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
        console.log('onChange', this.state.name);
    }

    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        axios
            .post('/reviews', {
                name: this.state.name
            })
            .then(response => {
                console.log('from handle submit', response);
                // set state
                this.setState({
                    reviews: [response.data, ...this.state.reviews],
                    name: ""
                });
            });
    }

    convertTime(timedata) {
        let time = timedata.split(" ").slice(1).join(" ");
        time = time.split(":");

        let hours = Number(time[0]);
        let minutes = Number(time[1]);

        let timeValue;

        if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours == 0) {
        timeValue= "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; 
        timeValue += (hours >= 12) ? " pm" : " am";  

        return timeValue;
    }

    renderReviews() {
        return this.state.reviews.map(review => (
            <div key={review.id} className="media innercard">
                <div className="media-body">
                    <div className="profile_box">
                        <div className="profile_img">
                        <img src="/images/profilepic.png" alt="" />
                        </div>
                        <div className="profile_data">
                            <h3>{review.user.name}</h3>
                            <br />
                        <span className="text-muted">
                            {/* {review.updated_at
                                .split(" ")
                                .slice(1)
                                .join(" ")} */}
                                {this.convertTime(review.updated_at)}
                        </span>
                        </div>
                    </div>
                    <p>{review.name}</p>
                </div>
            </div>
        ));
    }
    //get all the reviews from backend
    getReviews(){
        axios.get('/reviews').then(response => this.setState({
            reviews: [...response.data.reviews]
        }));
    }

    //lifecycle method
    componentDidMount(){
        this.getReviews();
    }


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="review_card">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className="comment_form">
                                    <div className="form-group">
                                        <input
                                            onChange={this.handleChange}
                                            value = {this.state.name}
                                            className="form-control"
                                            placeholder="Comment"
                                            required
                                        />
                                    </div>
                                    <div className="btn_align">
                                    <button type="submit" className="btn red_btn">
                                        Submit
                                    </button>
                                    </div>
                                </form>
                                <div className="reviews_list">
                                    <h1>Reviews</h1>
                                    {this.renderReviews()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default App;
 
/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/
 
// if (document.getElementById('root')) {
//     ReactDOM.render(<App />, document.getElementById('root'));
// }