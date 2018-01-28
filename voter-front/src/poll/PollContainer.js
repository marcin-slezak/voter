import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Material ui
import {GridList, GridTile} from 'material-ui/GridList';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

// Actions
import {addVote, unVote, addProposal} from '../app/actions';

// Other Components/Froms
import PollProposalForm from './PollProposalForm'

const narrowColStyle ={
  width: 72,
};


const Poll = props => (
  <div>
    <GridList
      cellHeight={220}
      style={{width: '100%', justify_content: 'center'}}
      cols={1}
    >
     <GridTile
            key={props.poll.id+Math.random()}
            title={props.poll.title}
            subtitle={<span>by <b>{props.poll.author}</b></span>}
          >
            <img src={props.poll.img} alt="Random view - nothing meaningful" />
          </GridTile>
    </GridList>
    
    <div className="pageContainer">
      
      {props.proposals.length > 0 ? (
        <div>
          <h1>{ props.poll.open? "Vote for:" : "Result for:" }  <i>"{props.poll.title}"</i> </h1>

          <Table className="listOfProposals" selectable={false} displayRowCheckbox={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn style={narrowColStyle}>NO</TableHeaderColumn>
                <TableHeaderColumn>Option</TableHeaderColumn>
                <TableHeaderColumn style={narrowColStyle}>{props.poll.open? "Vote" : "Result"}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              
              {props.proposals.sort( (prop1, prop2) => prop1.votes < prop2.votes ).map( (proposal, index) => (
                <TableRow key={proposal.name}>
                  <TableRowColumn style={narrowColStyle}>{index+1}</TableRowColumn>
                  <TableRowColumn>{proposal.name}</TableRowColumn>
                  <TableRowColumn style={narrowColStyle}>
                    {props.poll.open === 0? proposal.votes + " votes": false }
                    {props.poll.open && props.userVote === false? <RaisedButton label="Vote" onClick={ () => props.vote(props.poll.id,proposal.id) }/>: false }
                    {props.poll.open && props.userVote !== false && props.userVote === proposal.id ? <RaisedButton label="Unvote"  onClick={ () => props.unvote(proposal.id) }/>: false }
                  </TableRowColumn>
                </TableRow>
              ))}
            
            </TableBody>
          </Table>
        </div>
      ) : false}
      
      {props.poll.open && props.userVote === false && props.proposals.length > 0 ? (
        <div>
          <Divider inset={true} />
          <h1>OR</h1>
        </div>
      ) : false}

      {props.poll.open && props.proposals.length < 1 ? (
        <div>
          <h1>Well, we do not have any proposals yet ...</h1>
        </div>
      ) : false}

      {props.poll.open && props.userVote === false? (<PollProposalForm proposals={props.proposals} onSubmit={(data) => {props.addProposal(props.poll.id, data.proposalName); } } />) : false}
      

    </div>
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/poll'),
  vote: (pollId, proposalId) => addVote(pollId, proposalId),
  unvote: proposalId => unVote(proposalId),
  addProposal: (pollId, proposalName) => addProposal(pollId, proposalName)
}, dispatch)

const mapStateToProps = (state, ownProps) => { 
  let id = parseInt( ownProps.match.params.id, 10)
  let poll =  state.polls.find(poll => poll.id === id)
  return { 
    poll: poll,
    proposals: poll.proposals,
    userVote: poll.userVote
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Poll)