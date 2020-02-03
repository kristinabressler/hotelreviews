import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
/* An example React component */
class Main extends Component {
    constructor() {
   
        super();
        //Initialize the state in the constructor
        this.state = {
            reviews: [],
        }
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
                <h3>All Reviews</h3>
                <ul>
                { this.renderReviews() }
              </ul> 
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