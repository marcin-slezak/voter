import React, { Component }  from 'react'
import { Link} from 'react-router-dom'

// Material ui
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


export default class PollListComponent extends Component {
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
            
            <div>
                <GridList
                cellHeight={180}
                cols={this.state.numberOfCollumns}
                >
                <Subheader>{this.props.openWaitingForYourVote.length > 0? "Open Polls waitng for your vote": "" }</Subheader>
                {this.props.openWaitingForYourVote.map((tile) => (
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

                <Subheader>{this.props.openAndWithYourVote.length > 0? "Open Polls with your votes": "" }</Subheader>
                {this.props.openAndWithYourVote.map((tile) => (
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
                
                <Subheader>{this.props.closedPolls.length > 0? "Closed Polls": "" }</Subheader>
                {this.props.closedPolls.map((tile) => (
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
                <Subheader>{this.props.noPolls ? "We dont have any polls yet": "" }</Subheader>
                </GridList>
                <Link id="addPollBtn" to="/add-poll">
                <FloatingActionButton secondary={true}>
                    <ContentAdd />
                </FloatingActionButton>
                </Link>
            </div>
        )
    }

}

