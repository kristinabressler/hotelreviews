import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
/* An example React component */
class App extends Component {
    constructor() {
        super();

        //Initialize the state in the constructor
        this.state = {
            name: "",
            reviews: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
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
                    reviews: [response.data, ...this.state.reviews]
                });
                // then clear the value of textarea
                this.setState({
                    name: ''
                });
            });
    }

    renderReviews() {
        return this.state.reviews.map(review => (
            <div key={review.id} className="media">
                <div className="media-body">
                    <p>{review.name}</p>
                </div>
            </div>
        ));
    }


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Add Review Main</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            placeholder="Comment"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Review
                                    </button>
                                </form>
                                <hr />
                                <h1>Reviews List</h1>
                                {this.renderReviews()}
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
//     ReactDOM.render(<Main />, document.getElementById('root'));
// }