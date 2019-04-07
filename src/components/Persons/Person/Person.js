// import React from 'react';
// import classes from './Person.css';

// const person = (props) => {
//   console.log('[Person.js] rendering...');
//   return (
//     <div className={classes.Person}>
//       <p onClick={props.click}>I'm a { props.name } and I am { props.age } years old!</p>
//       <p><small>{props.children}</small></p>
//       <input type="text" onChange={props.changed} value={props.name}/>
//     </div>
//   )
// };

// export default person;
import React, { Component } from 'react';
import classes from './Person.css';

class Person extends Component {

  render() {
    console.log('[Person.js] render')
    return (
      <div className={classes.Person}>
        <p onClick={this.props.click}>I'm a { this.props.name } and I am { this.props.age } years old!</p>
        <p><small>{this.props.children}</small></p>
        <input type="text" onChange={this.props.changed} value={this.props.name}/>
      </div>
    )
  }
};

export default Person;