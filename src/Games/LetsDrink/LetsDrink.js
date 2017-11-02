import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import Screen from './../../Primitives/Screen';
import { H1, H2 } from './../../Primitives/H';
import Block from './../../Primitives/Block';

class LetsDrink extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  componentDidMount() {
    this.props.speak("Welcome to let's drink!");
  }

  render() {
    const { players = [], code = '' } = this.props.gameData;
    return (
      <Screen>
        <H1>Let`s drink!</H1>
        <p>Game code: {code}</p>
        <Block top={1}>
          <H2>Connected players:</H2>
          {players.map(p => <p>p.name</p>)}
        </Block>
      </Screen>
    );
  }
}

export default LetsDrink;
