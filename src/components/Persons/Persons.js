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

import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {

    // componentWillReceiveProps(){
    //     console.log('[Persons.js] componentWillReceiveProps...');

    // }

     static getDerivedStateFromProps(props, state){
         console.log('[Persons.js] getDerivedStateFromProps...');
         return state;
     }

    shouldComponentUpdate(nextProps, nextState){
        console.log('[Persons.js] shouldComponentUpdate...');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate...');
        return { message: 'snapshot!'}
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Persons.js] componentDidUpdate...');
        console.log(snapshot);
    }

    componentWillUnmount(){
        console.log('[Persons.js] componentWillUmount');
    }


    render() {    
        console.log('[Persons.js] render...');
        return ( this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.clicked(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    changed={(event) => this.props.changed(event, person.id)}
                />
            })
        );
    }
};

export default Persons;