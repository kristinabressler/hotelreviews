import React, { Component } from 'react';

class AddReview extends Component {
 
  constructor(props) {
    super(props);
       /* Initialize the state. */
       this.state = {
          newReview: {
              name: '',
              feedback: ''
          }
        }
     
    //Boilerplate code for binding methods with `this`
    this.handleChange = this.handleChange.bind(this);
  }
   
  handleChange(e) {
    this.setState({
      feedback: e.target.value
    });
    console.log('onChange', this.state.feedback);
}
 
  render() {
     
    return(
      <div> 
        <h2> Add new review </h2>
        <div> 
        <form onSubmit={this.handleSubmit}>
           
          <label> Review: 
            <input type="text" onChange={this.handleChange} value={this.state.feedback} />
          </label>
           
 
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>)
  }
}
 
export default AddReview;