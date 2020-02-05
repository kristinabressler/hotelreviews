import React, { Component } from 'react';
 
/* Stateless component or pure component
 * { product } syntax is the object destructing
 */
const Review = ({review}) => {
    
 
  //if the props product is null, return Product doesn't exist
  if(!review) {
    return(<div>  Review Doesnt exist </div>);
  }
     
  //Else, display the product data
  return(  
    <div> 
      <h2> {review.name} </h2>
      <p> {review.feedback} </p>
      
    </div>
  )
}
 
export default Review;