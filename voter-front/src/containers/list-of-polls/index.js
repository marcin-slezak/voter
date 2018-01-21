import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
// Material ui
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const GridListOfPolls = (props) => (
  <div>
    
    <GridList
      cellHeight={180}
      cols={props.numberOfCollumns}
    >
    <Subheader>{props.polls.filter(tile => tile.open).filter(tile => tile.userVote === false).length > 0? "Open Polls waitng for your vote": "" }</Subheader>
      {props.polls.filter(tile => tile.open).filter(tile => tile.userVote === false).map((tile) => (
        <Link 
          to={"/poll/"+tile.id}
          key={tile.id+Math.random()}
        >
          <GridTile
            key={tile.id+Math.random()}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} alt="Some random view - probably nothing meaningful" />
          </GridTile>
        </Link>
      ))}

      <Subheader>{props.polls.filter(tile => tile.open).filter(tile => tile.userVote !== false).length > 0? "Open Polls with your votes": "" }</Subheader>
      {props.polls.filter(tile => tile.open).filter(tile => tile.userVote !== false).map((tile) => (
        <Link 
          to={"/poll/"+tile.id}
          key={tile.id+Math.random()}
        >
          <GridTile
            key={tile.id+Math.random()}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} alt="Some random view - probably nothing meaningful" />
          </GridTile>
        </Link>
      ))}
      
      <Subheader>{props.polls.filter(tile => ! tile.open).length > 0? "Closed Polls": "" }</Subheader>
      {props.polls.filter(tile => ! tile.open).map((tile) => (
        <Link 
          to={"/poll/"+tile.id}
          key={tile.id+Math.random()}
        >
          <GridTile
            key={tile.id+ +Math.random()}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} alt="Some random view - probably nothing meaningful" />
          </GridTile>
        </Link>
      ))}
      <Subheader>{props.polls.length < 1 ? "We dont have any polls yet": "" }</Subheader>
    </GridList>
    <Link id="addPollBtn" to="/add-poll">
      <FloatingActionButton secondary={true}>
        <ContentAdd />
      </FloatingActionButton>
    </Link>
  </div>
);



class ListOfPolls extends Component {
  constructor(props) {
    super(props);
    this.calculateNumberOfColumns = (windowWidth) => Math.round(windowWidth/300);
    this.state = {
      numberOfCollumns: this.calculateNumberOfColumns(window.innerWidth)
    };
  }

  resize = (resizeEvent) => {
    this.setState({numberOfCollumns: this.calculateNumberOfColumns(window.innerWidth)});
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  render(){
    return (
      <div className="pageContainer">
        <GridListOfPolls polls={this.props.polls} numberOfCollumns={this.state.numberOfCollumns} />
      </div>
    )
  }
} 

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/list-of-polls')
}, dispatch)


const mapStateToProps = (state) => { 
  return { polls: state.polls };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ListOfPolls)