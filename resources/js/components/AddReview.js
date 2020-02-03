class AddReview extends Component {
 
  constructor(props) {
    super(props);
       /* Initialize the state. */
       this.state = {
          newReview: {
              title: '',
              description: '',
              price: 0,
              availability: 0
          }
        }
     
    //Boilerplate code for binding methods with `this`
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
   
  /* This method dynamically accepts inputs and stores it in the state */
  handleInput(key, e) {
     
    /*Duplicating and updating the state */
    var state = Object.assign({}, this.state.newReview); 
    state[key] = e.target.value;
    this.setState({newReview: state });
  }
 /* This method is invoked when submit button is pressed */
  handleSubmit(e) {
    //preventDefault prevents page reload   
    e.preventDefault();
    /*A call back to the onAdd props. The current
     *state is passed as a param
     */
    this.props.onAdd(this.state.newReview);
  }
 
  render() {
     
    return(
      <div> 
        <h2> Add new review </h2>
        <div> 
        <form onSubmit={this.handleSubmit}>
          <label> Title: 
           { /*On every keystroke, the handeInput method is invoked */ }
            <input type="text" onChange={(e)=>this.handleInput('title',e)} />
          </label>
           
          <label> Description: 
            <input type="text" onChange={(e)=>this.handleInput('description',e)} />
          </label>
           
 
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>)
  }
}
 
export default AddReview;