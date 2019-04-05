import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: 'ussad', name: 'Alexis', age: 27 },
      { id: 'us21312', name: 'Kitzia', age: 28 , hobbies: 'Learning languages'},
      { id: 'ussad1', name: 'Juan', age: 26 }
    ],
    otherState: 'some other value'
  };

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 27 },
        { name: newName, age: 28 , hobbies: 'Learning languages'},
        { name: newName, age: 26 }
      ],
      showPersons: false
    });
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({
      persons: persons
    })
    // const person = Object.assing({}, this.state.persons[personIndex]);
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  render() {

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary><Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)}
              />
            </ErrorBoundary>
          })}
        </div>
      );
      
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2){
      assignedClasses.push( classes.red );
    }
    if (this.state.persons.length <= 1){
      assignedClasses.push( classes.bold );
    }

    return (
      <div className={classes.App}>
        <header className={classes.App2}>
          <h1>Hi, I'm a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button 
            className={btnClass}
            onClick={this.togglePersonHandler}
          >Toggle Persons</button>
         {persons}
        </header>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;