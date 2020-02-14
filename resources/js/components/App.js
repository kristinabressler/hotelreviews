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
            reviews: [],
            otherReviews: [],
            open: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
        this.toggleReviews = this.toggleReviews.bind(this);
        // this.addReviews = this.addReviews.bind(this);
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
                    reviews: [response.data, ...this.state.reviews].slice(0,3),
                    name: "",
                    otherReviews: [...this.state.reviews].slice(2).concat([...this.state.otherReviews])
                });
            });
    }

    convertTime(timedata) {

        let date = new Date(timedata + ' UTC');
        let time =  date.toTimeString();

        let newtime = time.split(" ").slice(0, 1).join(" ");
        newtime = newtime.split(":");

        let hours = Number(newtime[0]);
        let minutes = Number(newtime[1]);

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
                        <span className="text-muted">
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
            reviews: [...response.data.reviews].slice(0,3),
            otherReviews: [...response.data.reviews].slice(3)
        }));
    }
    

    toggleReviews() {
        this.setState({open: !this.state.open});
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
                                        <i className="fas fa-comment-dots"></i>
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
                                    <div className="review_header">
                                    <h1>Reviews</h1>
                                    <button className="toggle_btn" onClick={this.toggleReviews}>{this.state.open ? 'Hide reviews' : 'See all'}</button>
                                    </div>
                                    {this.renderReviews()}
                                    {this.state.open && this.state.otherReviews.map(review =>(
                                        <div key={review.id} className="media innercard">
                                            <div className="media-body">
                                                <div className="profile_box">
                                                    <div className="profile_img">
                                                    <img src="/images/profilepic.png" alt="" />
                                                    </div>
                                                    <div className="profile_data">
                                                        <h3>{review.user.name}</h3>
                                                    <span className="text-muted">
                                                            {this.convertTime(review.updated_at)}
                                                    </span>
                                                    </div>
                                                </div>
                                                <p>{review.name}</p>
                                            </div>
                                        </div>
                                        ))}
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