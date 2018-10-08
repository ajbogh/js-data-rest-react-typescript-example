import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Edit from './Edit';
import Home from './Home';
import Post from './Post';
import Posts from './Posts';
import User from './User';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route exact={true} path="/" component={Posts} />
      <Route exact={true} path="/" component={Home} />
      <Route path="/posts" component={Posts}/>
      <Route path="/posts/:id" component={Post} />
      <Route path="/posts/:id/edit" component={Edit} />
      <Route path="/users/:id" component={User} />
    </App>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
