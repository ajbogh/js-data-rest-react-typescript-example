import * as React from 'react'
import {Link} from 'react-router-dom'
import {store} from './Store'

const PAGE_SIZE = 5

/**
 * @param {number} pageNum The page to retrieve.
 * @return {Promise} A Promise that resolves to a Page object.
 */
function fetchPage (pageNum: number) : Promise<any> {
  return store.findAll('post', {
    limit: PAGE_SIZE,
    offset: (pageNum - 1) * PAGE_SIZE,
    orderBy: [['created_at', 'desc']]
  }).then((page) => {
    page = store.add('post', page);
    return page;
  })
}

interface IPostsState {
  currentPage: number;
  posts: any[];
  total: number;
}

export default class Posts extends React.Component<{}, IPostsState> {
  constructor(props: {}) {
    super(props)
    fetchPage(1).then((page) => {
      this.setState(this.getState(1, page))
    })
    this.state = {
      currentPage: 1,
      posts: [],
      total: 0
    }
  }

  public getState (currentPage: number, page: any) {
    return {
      currentPage: page.page,
      posts: store.filter('post', {
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
        orderBy: [['created_at', 'DESC']]
      }),
      total: page.total
    };
  }

  public fetchPage (pageNum: number) {
    fetchPage(pageNum).then((page) => {
      this.setState(this.getState(pageNum, page))
    });
  }

  public prev (e: React.MouseEvent, pageDecrease: number) {
    e.preventDefault();
    if (this.state.currentPage > 1) {
      this.fetchPage(this.state.currentPage - pageDecrease)
    }
  }

  public next (e: React.MouseEvent, pageIncrease: number) {
    e.preventDefault()
    if ((this.state.currentPage * PAGE_SIZE) < this.state.total) {
      this.fetchPage(this.state.currentPage + pageIncrease)
    }
  }

  public previousPage = (e: React.MouseEvent) => {
    const { currentPage } = this.state;
    if (currentPage > 2) {
      this.prev(e, 2);
      return;
    }
    this.prev(e, 1);
  };

  public nextPage = (e: React.MouseEvent) => {
    const { currentPage, total } = this.state;
    if (((currentPage + 1) * PAGE_SIZE) < total) {
      this.next(e, 2);
      return;
    }
    this.next(e, 1);
  };

  public render () {
    const currentPage = this.state.currentPage
    const total = this.state.total
    let posts: JSX.Element[] = this.state.posts.map((post) => {
      return (
        <div key={post.id}>
          <h3 className="title">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <small className="pull-right">{post.created_at}</small>
          </h3>
          <div>{post.get('content').substring(0, 200)}...</div>
        </div>
      )
    });
    const links = [
      <li key="1">
        <a href="" aria-label="Previous" onClick={this.previousPage}>
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    ]
    if (currentPage > 2) {
      links.push(<li key="link2" onClick={this.previousPage}>
        <a href="">{currentPage - 2}</a>
      </li>)
    }
    if (currentPage > 1) {
      links.push(<li key="link3" onClick={this.previousPage}>
        <a href="">{currentPage - 1}</a>
      </li>)
    }
    links.push(<li key="link4" className="active"><a href="">{currentPage}</a></li>)
    if ((currentPage * PAGE_SIZE) < total) {
      links.push(<li key="link5" onClick={this.nextPage}>
        <a href="">{currentPage + 1}</a>
      </li>)
    }
    if (((currentPage + 1) * PAGE_SIZE) < total) {
      links.push(<li key="link6" onClick={this.nextPage}>
        <a href="">{currentPage + 2}</a>
      </li>)
    }
    links.push(<li key="link7">
      <a href="" aria-label="Next" onClick={this.nextPage}>
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>)
    let nav: JSX.Element | null = <nav><ul className="pagination">{links}</ul></nav>
    if (total <= PAGE_SIZE) {
      nav = null;
    }
    if (!posts.length) {
      posts = [(<span key="1">No posts yet...</span>)];
    }
    return (<div>
      <aside className="Posts-aside">
        {posts}
        {nav}
      </aside>

    </div>);
  }
}