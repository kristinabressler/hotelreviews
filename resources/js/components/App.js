import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '/css/style.css';
 
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

    renderReviews() {
        return this.state.reviews.map(review => (
            <div key={review.id} className="media innercard">
                <div className="media-body">
                    <p>{review.name}</p>
                    <span className="text-muted">
                            <br />
                            by {review.user.name} |{" "}
                            {review.updated_at
                                .split(" ")
                                .slice(1)
                                .join(" ")}
                        </span>
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
                                <form onSubmit={this.handleSubmit}>
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