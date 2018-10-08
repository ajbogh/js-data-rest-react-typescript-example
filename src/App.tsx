import * as React from 'react'
import Header from './Header'
import { store } from './Store'

import './App.css';

interface IAppProps {
  [key: string]: any;
}

interface IAppState {
  loggedInUser: any;
}

export default class App extends React.Component<IAppProps, IAppState> {
  private userMapper: any;
  constructor (props: IAppProps) {
    super(props)
    // Fetch the current user, if any
    this.userMapper = store.getMapper('user');
    this.userMapper.getLoggedInUser();
    this.state = this.getState();
  }
  public componentDidMount () { store.on('all', this.onChange, this) }
  public componentWillUnmount () { store.off('all', this.onChange) }
  public onChange () { this.setState(this.getState()) }
  public getState () { return { loggedInUser: this.userMapper.loggedInUser } }
  public render () {
    return (
      <div className="App container">
        <Header loggedInUser={this.state.loggedInUser}/>
        <div className="App-container container main-container">{this.props.children}</div>
      </div>
    )
  }
}