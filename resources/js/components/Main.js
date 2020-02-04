import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
/* An example React component */
class Main extends Component {
    constructor(props) {
        super(props);

        //Initialize the state in the constructor
        this.state = {
            reviews: []
        };
      }
      /*componentDidMount() is a lifecycle method
       * that gets called after the component is rendered
       */
      componentDidMount() {
        /* fetch API in action */
        fetch('/api/reviews')
            .then(response => {
                return response.json();
            })
            .then(reviews => {
                //Fetched product is stored in the state
                this.setState({ reviews });
            });
      }
     
     renderReviews() {
        return this.state.reviews.map(review => {
            return (
                /* When using list you need to specify a key
                 * attribute that is unique for each list item
                */
                <li key={review.id} >
                    { review.title } 
                </li>      
            );
        })
      }
    render() {
        return (
            <div>
                <div>
                    <h1>Add a review</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label> Name 
                        { /*On every keystroke, the handeInput method is invoked */ }
                            <input type="text" onChange={(e)=>this.handleInput('name',e)} />
                        </label>
                        
                        <label> Comment 
                            <input type="text" onChange={(e)=>this.handleInput('feedback',e)} />
                        </label>
                        
                
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div>
                <h3>All Reviews</h3>
                <ul>
                    { this.renderReviews() }
                </ul> 
              </div>
            </div>
        );
    }
}
 
export default Main;
 
/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/
 
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}