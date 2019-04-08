import React, { Component } from 'react';

import classes from './App.css';
//import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
//import WithClass from '../hoc/WithClass'; //IF IT IS A COMPONENT IT WILL BEGIN WITH A CAPITAL LETTER
import withClass from '../hoc/withClass'; // IF IT IS A FUNCTION IT WILL BE IMPORTED AS BE NAMED
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'ussad', name: 'Alexis', age: 27 },
      { id: 'us21312', name: 'Kitzia', age: 28 , hobbies: 'Learning languages'},
      { id: 'ussad1', name: 'Juan', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state){
    // será invocado después que el componente sea instanciado y también cada vez que el componente reciba nuevas props.
    // Utilizan sus parámetros con las nuevas props y el state anterior, 
    //debe devolver un objeto con el state actualizado o null para indicar que no requiere ninguna actualización su state. 
    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }

  // componentWillMount(){
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount(){
    //Este método solo se ejecuta justo después de que el componente haya sido montado en el DOM. 
    //Es el método perfecto para integrar librerias de terceros (plugins jquery), realizar alguna petición ajax ó 
    //establecer algún timer de tipo setTimeout ó setInterval.
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    //Con este método podremos mejorar nuestra performance. Por defecto, siempre retorna true.
    //Si hacemos que retorne false, cancelariamos el render hasta un nuevo cambio de propiedades o de estado
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    //Es invocado inmediatamente después de que el componente se haya actualizado.
    //Aquí es donde podemos manejar el componente ya renderizado y actualizado en el DOM.
    console.log('[App.js] componentDidUpdate');
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 27 },
        { name: newName, age: 28 , hobbies: 'Learning languages'},
        { name: newName, age: 26 }
      ],
      showPersons: false,
      showCockpit: true,
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
    //this.setState((pervState, props) => {
    //  return {
    //    persons: persons,
    //    changeCounter: pervState.changeCounter + 1
    //  }
    //}); IT WOULD UPDATE ITS STATES BUT ISNT RECOMMENDED IF YOUR STATES DEPENDS OF THE LASTEST STATE

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    }); // THIS IS THE RECOMMENDED WAY TO UPDATE ITS STATES IF IT DEPENDS OF YOUR LAST STATE
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
    this.setState({persons: persons});
  }

  loginHandler = () => {
    this.setState({
      authenticated: true,
    })
  };

  render() {
    console.log('[App.js] render')
    let persons = [];

    if (this.state.showPersons){
      persons = <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler}
            isAuthenticated={this.state.authenticated}
          />;
    }

    return (
      // <WithClass classes ={classes.App}>
      //   <header className={classes.App2}>
      //   <button onClick={()=>{this.setState({showCockpit: !this.state.showCockpit})}}>Remove Cockpit</button>
      //   {this.state.showCockpit ? <Cockpit
      //     title={this.props.appTitle}
      //     showPersons={this.state.showPersons}
      //     personsLength={this.state.persons.length}
      //     clicked={this.togglePersonHandler}
      //   />: null }
      //    {persons}
      //   </header>
      // </WithClass>
      <Aux>
        <header className={classes.App2}>
        <button onClick={()=>{this.setState({showCockpit: !this.state.showCockpit})}}>Remove Cockpit</button>
        <AuthContext.Provider 
        value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }} >
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonHandler}
            />): null }
          {persons}
         </AuthContext.Provider>
        </header>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
