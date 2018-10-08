import * as PropTypes from 'prop-types';
import * as React from 'react';
import { store } from './Store';

import './Post.css';

interface IPostProps {
  match: any;
}

interface IPostState {
  post: any;
}

export default class Post extends React.Component<IPostProps, IPostState>{
  public static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor (props: IPostProps) {
    super(props);
    store.find('post', this.props.match.params.id);
    this.state = this.getState();
  }

  public componentDidUpdate(prevProps: IPostProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      store.find('post', this.props.match.params.id).then(() => {
        this.onChange();
      });
    }
  }
  public componentDidMount () { store.on('all', this.onChange) }
  public componentWillUnmount () { store.off('all', this.onChange) }
  public onChange = () => {
    this.setState(this.getState())
  }

  public getState() {
    return {
      post: store.get('post', this.props.match.params.id) || {}
    }
  }

  public renderComments() {
    if (!this.state.post.comments) {
      return null;
    }
    return this.state.post.comments.map((comment: any) => {
      return <div key={comment.id} className="comment">
        <div>{comment.content}</div>
        <div><a href={`/users/${comment.user.id}`} rel="author">{comment.user.name}</a></div>
      </div>;
    });
  }

  public render() {
    return (
      <div className="post">
        <h2 className="page-header">
          {this.state.post.title}
        </h2>
        <time style={{ display: 'block', marginBottom: '10px' }}><small>Published: {this.state.post.date_published}</small></time>
        <article>{this.state.post.content}</article>
        <hr />
        <h3>Comments</h3>
        <section className="comments">{this.renderComments()}</section>
      </div>
    )
  }
}
