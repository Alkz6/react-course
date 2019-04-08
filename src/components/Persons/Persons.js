// import React from 'react';

// import Person from './Person/Person';

// const persons = (props) => {
//     console.log('[Persons.js] rendering...');
//     props.persons.map((person, index) => {
    
//     return <Person
//         click={() => props.clicked(index)}
//             name={person.name}
//             age={person.age}
//             key={person.id}
//             changed={(event) => props.changed(event, person.id)}
//         />
//     });
// };

// export default persons;

import React, { Component, PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {

    // componentWillReceiveProps(){
    //     console.log('[Persons.js] componentWillReceiveProps...');

    // }

     static getDerivedStateFromProps(props, state){
         console.log('[Persons.js] getDerivedStateFromProps...');
         return state;
     }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[Persons.js] shouldComponentUpdate...');
    //     if (nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked){
    //         return true;
    //     }
    //     return false;
    // }

    getSnapshotBeforeUpdate(prevProps, prevState){
        //se invoca justo antes de que la salida renderizada más reciente se entregue, por ejemplo, al DOM. 
        //Permite al componente capturar cierta información del DOM (por ejemplo, la posición del scroll) antes 
        //de que se cambie potencialmente. Cualquier valor que se devuelva en este ciclo de vida se pasará como 
        //parametro al método componentDidUpdate(). Este caso de uso no es común, pero puede ourrir en IUs como 
        //un hilo de chat que necesita manejar la posición del scroll de manera especial. Debe devolverse un valor instantáneo(o null).
        console.log('[Persons.js] getSnapshotBeforeUpdate...');
        return { message: 'snapshot!'}
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Persons.js] componentDidUpdate...');
        console.log(snapshot);
    }

    componentWillUnmount(){
        //Este metodo se ejecuta justo antes de que el componente sea destruido o eliminado del DOM. 
        //Es perfecto para cualquier tipo de reset y no recibe ningún tipo de parámetro.
        console.log('[Persons.js] componentWillUmount');
    }


    render() {    
        console.log('[Persons.js] render...');
        return this.props.persons.map((person, index) => {
            return (<Person
                click={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)}
            />);
        });
    }
};

export default Persons;
