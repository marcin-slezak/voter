// React
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// Material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/social/poll';
import NavigationPerson from 'material-ui/svg-icons/social/person-outline';


// Containers
import ListOfPolls from '../poll/PollListContainer'
import Poll from '../poll/PollContainer'
import LogIn from '../login/LogInContainer'
import AddPoll from '../poll/AddPollContainer'
import Register from '../register/RegisterContainer'

// Css
import './App.css';

import {checkSession, logOut} from './actions'


const AppMenuContent = (
  <div>
    Vote 
    <b>r</b>
  </div>
  
);

class AppContainer extends Component {

  constructor(props){
    super(props)

    if( ! props.isAuthenticated){
      this.props.checkSessionAndRedirectIfNotLogged(props.url)
    }
    
  }

  render() {
    
    let logoutBtn = undefined
    let username = this.props.username
    let p = {tooltip: "Logout: "+ username, tooltipPosition: "bottom-left"}
    if( this.props.isAuthenticated){
      logoutBtn = <IconButton {...p} ><NavigationPerson /></IconButton>
    }

    return (
      <MuiThemeProvider>
        <div>
          
          <AppBar
            title={AppMenuContent}
            onLeftIconButtonClick={() => this.props.redirectToHome()}
            onRightIconButtonClick={() => this.props.logout()}
            iconElementRight={logoutBtn}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          />
          <header>
            
          </header>
      
          <main>
            {
              this.props.isAuthenticated 
              ? (
                <div>
                  <Route exact path="/log-in" component={LogIn} />
                  <Route exact path="/add-poll" component={AddPoll} />
                  {this.props.polls.length > 0? ( 
                    <div>
                      <Route exact path="/" component={ListOfPolls} />
                      <Route exact path="/poll/:id" component={Poll} />
                    </div>
                    ): undefined } 
                </div>
              ) : (
                <div>
                  <Route exact path="/" component={LogIn} />
                  <Route exact path="/log-in" component={LogIn} />
                  <Route exact path="/register" component={Register} />
                </div>
              )
            }
          </main>

        </div>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch =>  { 
  return {
    redirectToLogin: () => dispatch(push('/log-in')),
    redirectToHome: () => dispatch(push('/')),
    checkSessionAndRedirectIfNotLogged: (currentUrl) => dispatch(checkSession()).then(loggedIn => {
      if( loggedIn === false &&  ! ['/log-in', '/register'].includes(currentUrl) ){
            dispatch(push('/log-in'))
       }
    }) ,
    logout: () => dispatch(logOut()).then(() => dispatch(push('/log-in')))
  }
}

const mapStateToProps = (state, ownProps) => { 
  return { 
    url: state.routing.location.pathname,
    polls: state.polls,
    isAuthenticated: state.user.id !== undefined,
    username: state.user.name
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer) );