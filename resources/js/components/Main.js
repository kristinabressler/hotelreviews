import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddProduct from './AddProduct';
 
/* An example React component */
class Main extends Component {
    constructor() {
        super();

        //Initialize the state in the constructor
        this.state = {
            reviews: [],
            currentReview: null
        };
        this.handleAddReview = this.handleAddReview.bind(this);
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
               <li onClick={
                () =>this.handleClick(review)} key={review.id} >
                { review.name } 
            </li>    
            );
        })
      }

      handleClick(review) {
        //handleClick is used to set the state
        this.setState({currentReview:review});
       
      }
    
      handleAddReview(review) {
     
        /*Fetch API for post request */
        fetch( 'api/reviews/', {
            method:'post',
            /* headers are important*/
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(review)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
           
            this.setState((prevState)=> ({
                reviews: prevState.reviews.concat(data),
                currentReview : data
            }))
        })
     //update the state of reviews and currentReview
      }  

    render() {
        return (
            <div>
                <div>
                    <h1>Add a review</h1>
                    <AddReview onAdd={this.handleAddReview} /> 
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