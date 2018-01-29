import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PollListComponent from './PollListComponent'

let ListOfPolls = (props) => ( 
   <div className="pageContainer">
      <PollListComponent
        noPolls={props.noPolls}
        closedPolls={props.closedPolls}
        openAndWithYourVote={props.openAndWithYourVote}
        openWaitingForYourVote={props.openWaitingForYourVote}
      />
    </div>
)


const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/list-of-polls')
}, dispatch)


const mapStateToProps = (state) => { 
  return {
    noPolls: state.polls.length < 1, 
    openWaitingForYourVote: state.polls.filter(tile => tile.open).filter(tile => tile.userVote === false),
    openAndWithYourVote: state.polls.filter(tile => tile.open).filter(tile => tile.userVote !== false),
    closedPolls: state.polls.filter(tile => ! tile.open)
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ListOfPolls)