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
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';

import AuthContext from '../../../context/auth-context';

class Person extends Component {

  constructor(props){
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    //this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);

  }

  render() {
    console.log('[Person.js] render')
    // return (
    //   <div className={classes.Person}>
    //     <p onClick={this.props.click}>
    //       I'm a { this.props.name } and I am { this.props.age } years old!
    //     </p>
    //     <p><small>{this.props.children}</small></p>
    //     <input 
    //       type="text" 
    //       onChange={this.props.changed} 
    //       value={this.props.name}
    //     />
    //   </div>
    // )
    return (
      <Aux>
        { this.context.authenticated ? 
          (<p>Authenticated!!</p>
            ) : (
            <p>Please log in</p>) }
        <p onClick={this.props.click}>
          I'm a { this.props.name } and I am { this.props.age } years old!
        </p>
        <p><small>{this.props.children}</small></p>
        <input 
          type="text" 
          // ref={(inputEl)=>{this.inputElement = inputEl}}
          ref={this.inputElementRef}
          onChange={this.props.changed} 
          value={this.props.name}
        />
      </Aux>
    );
  }
};

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
  isAuth: PropTypes.bool
};

export default withClass(Person, classes.Person);