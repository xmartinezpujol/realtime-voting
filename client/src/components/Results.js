import React from 'react';
import glamorous from 'glamorous';

import { tween } from 'popmotion';
import { MotionValue } from 'popmotion-react';

import { Button } from 'semantic-ui-react';

import { susbscribeToVotes, like, dislike } from "../../api/api";

const Page = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 500,
  margin: '50px auto',
  justifyContent: 'center',
  alignItems: 'center',
});

const ButtonContainer = glamorous.div({
  display: 'flex',
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  justifyContent: 'center',
  alignItems: 'center',
});

const Title = glamorous.h1({
  marginBottom: 50,
});

const stateChangeHandlers = {
  on: ({ value }) => tween({
    from: value.get(),
    duration: 100,
    to: 280
  }).start(value),
  off: ({ value }) => tween({
    from: value.get(),
    duration: 100,
    to: 0
  }).start(value)
};

const AnimatedBox = glamorous.div({
  position: 'relative',
  left: '-142px',
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 'Loading...',
      dislikes: 'Loading...',
      lastAction: 'none',
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

  componentDidUpdate(prevProps, prevState) {
    if(prevState.likes !== this.state.likes) {
      this.setState(() => ({
        lastAction: 'liked',
      }));
    }

    if(prevState.dislikes !== this.state.dislikes) {
      this.setState(() => ({
        lastAction: 'disliked',
      }));
    }
  }

  render() {
    return (
      <Page>
        <Title>Here goes the super duper App</Title>
        <AnimatedBox>
          <MotionValue
            onStateChange={stateChangeHandlers}
            state={this.state.lastAction === 'liked' ? 'off' : 'on'}
          >
            {({ v, state, setStateTo }) => (
              <div
                style={{
                  background: 'red',
                  width: '100px',
                  height: '100px',
                  transform: 'translateX(' + v + 'px)'
                }}
              />
            )}
          </MotionValue>
        </AnimatedBox>
        <ButtonContainer>
          <Button
            content='Like'
            color='green'
            icon='thumbs outline up'
            label={{ as: 'a', basic: true, content: this.state.likes }}
            labelPosition='right'
            onClick={() => this.handleVote('+')}
            style={{ marginRight: 150 }}
          />
          <Button
            content='Dislike'
            color='red'
            icon='thumbs outline down'
            label={{ as: 'a', basic: true, content: this.state.dislikes }}
            labelPosition='right'
            onClick={() => this.handleVote('-')}
          />
        </ButtonContainer>
      </Page>
    );
  }

}

export default Results;
