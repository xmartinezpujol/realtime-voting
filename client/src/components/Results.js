import React from 'react';
import { Button } from 'semantic-ui-react';

import { susbscribeToVotes, like, dislike } from "../../api/api";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 'Loading...',
      dislikes: 'Loading...',
    };
    this.handleVote = this.handleVote.bind(this);
  }

  componentWillMount() {
    susbscribeToVotes((votes) => {
      if(votes !== null) {
        this.setState(() => ({
          likes: votes.likes,
          dislikes: votes.dislikes,
        }));
      }
    });
  }

  handleVote(option) {
    if (option === '+') {
      like();
    } else {
      dislike();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2>{this.state.votes}</h2>
        <Button
          content='Like'
          color='green'
          icon='thumbs outline up'
          label={{ as: 'a', basic: true, content: this.state.likes }}
          labelPosition='right'
          onClick={() => this.handleVote('+')}
        />
        <Button
          content='Dislike'
          color='red'
          icon='thumbs outline down'
          label={{ as: 'a', basic: true, content: this.state.dislikes }}
          labelPosition='right'
          onClick={() => this.handleVote('-')}
        />
      </React.Fragment>
    );
  }

}

export default Results;
