import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';
// import { CommentSchema, PostSchema, UserSchema } from './Schemas';
import { store } from './Store';

interface IUserProps {
  match: any;
}

interface IUserState {
  user: any;
}

export default class User extends React.Component<IUserProps, IUserState>{
  public static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props: IUserProps) {
    super(props);
    const userId = props.match.params.id;
    store.find('user', userId, { with: ['posts', 'posts.comments'] }).then((user) => {
      this.setState(this.getState(props.match.params));
    });
    this.state = this.getState(props.match.params);
  }

  /*
   * Lifecycle
   */

  public componentDidUpdate(prevProps: IUserProps) {
    const params = prevProps.match.params;
    if (params.id !== this.props.match.params.id) {
      store.find('user', params.id, { bypassCache: true }).then(() => {
        this.onChange();
      });
    }
  }

  public componentDidMount () {
    store.on('add', this.onChange);
  }

  public componentWillUnmount () {
    store.off('add', this.onChange);
  }
  /*
   * Event Handlers
   */
  public onChange = () => {
    this.setState(this.getState(this.props.match.params));
  }
  /*
   * Methods
   */
  public getState(params: any) {
    return {
      user: store.get('user', params.id) || null
    };
  }

  public render() {
    if (!this.state.user) {
      return <div>User {this.props.match.params.id} not found!</div>;
    }

    return (
      <div className="user">
        <h1 className="page-header">
          {this.state.user.name }
        </h1>

        <div className="row">
          <div className="col-md-6">
            <h3>Posts</h3>

            {this.state.user.posts.map((post: any, index: number) => {
              return (
                <div key={index}>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  <span className="pull-right">
                    {post.created_at}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="col-md-6">
            <h3>Comments</h3>

            {this.state.user.comments.map((comment: any, index: number) => {

              return (
                <div key={index}>
                  <Link to={`/posts/${comment.post_id}`}>Go to post</Link>&nbsp;
                  <span>{comment.content}</span>
                  <span className="pull-right">
                    {comment.created_at}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
