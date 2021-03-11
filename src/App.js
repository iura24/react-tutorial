import React from "react";
import styled from "styled-components";
import "./App.css";
import Person from "./Person/Person";

const StyledButton = styled.button`
  background-color: ${(props) => (props.alt ? "red" : "green")};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color:  ${(props) => (props.alt ? "salmon" : "lightgreen")};
    color: black;
  }
`;

class App extends React.Component {
  state = {
    persons: [
      { id: 1, name: "Max", age: 23 },
      { id: 2, name: "Iura", age: 24 },
      { id: 3, name: "Mirabela", age: 23 },
    ],
    otherState: "some state",
    showPersons: false,
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((pers) => {
      return pers.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons,
    });
  };

  deletePersonsHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons,
    });
  };

  togglePersonHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };
  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                key={person.id}
                click={() => this.deletePersonsHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      // style.backgroundColor = "red";
      // style[":hover"] = {
      //   backgroundColor: "salmon",
      //   color: "black",
      // };
    }

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push("red");
    }

    if (this.state.persons.length <= 1) {
      classes.push("bold");
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React app</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <StyledButton
          alt={this.state.showPersons}
          onClick={this.togglePersonHandler}
        >
          Toggle Persons
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
