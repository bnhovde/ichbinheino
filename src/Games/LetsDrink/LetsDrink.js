import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { playAudio } from './../../store/audio';
import { generateRoomCode } from './../../utilities/helpers';
import { Button } from './../../Primitives/Button';
import Loader from './../../Components/Loader';

class LetsDrink extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isError: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.roomCode);
  }

  fetchData(slug) {
    // Display loading overlay
    this.setState({
      contents: {},
      isLoading: true,
    });

    // Fetch data from Contentful
    // getPage(slug)
    //     .then((queryData) => {
    //         return this.setState({
    //             contents: queryData.items[0],
    //             isLoading: false,
    //             isError: false,
    //         });
    //     })
    //     .catch(() => {
    //         return this.setState({
    //             isError: true,
    //             isLoading: false,
    //         });
    //     });
  }

  render() {
    return (
      <div>
        <h1>Game</h1>
        <p>Welcome!!</p>
        {this.state.isLoading && <Loader />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startGame: roomCode => dispatch(push(`/game/${roomCode}`)),
    welcomeMessage: name => dispatch(playAudio(name)),
  };
}

export default connect(null, mapDispatchToProps)(LetsDrink);
