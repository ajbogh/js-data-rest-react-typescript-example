
import * as React from 'react'
import { store } from './Store'

interface IEditProps {
  match: any;
}

interface IEditState {
  content: string;
  title: string;
}

export default class Edit extends React.Component<IEditProps, IEditState> {
  constructor (props: IEditProps) {
    super(props)
    const id = this.props.match.params.id
    if (id && id !== 'new') {
      store.find('post', id).then((post) => {
        this.setState({
          content: post.content,
          title: post.title
        })
      })
    }
    this.state = { title: '', content: '' }
  }
  public onTitleChange = (e: any) => {
    e.preventDefault()
    this.setState({ title: e.target.value })
  }
  public onContentChange = (e: any) => {
    e.preventDefault()
    this.setState({ content: e.target.value })
  }
  public onSubmit = (e: any) => {
    const id = this.props.match.params.id
    e.preventDefault()
    const props = {
      content: this.state.content,
      title: this.state.title
    }
    let promise
    if (id === 'new') {
      promise = store.create('post', props)
    } else {
      promise = store.update('post', id, props)
    }
    promise.then((post) => {
      this.context.router.push(`/posts/${post.id}`)
    })
  }
  public render () {
    return (
      <div>
        <form id="new-post-form" name="new-post-form">
          <div className="form-group">
            <label className="control-label" htmlFor="title">Title</label>
            <input type="text" required={true} id="title" name="title" onChange={this.onTitleChange}
                   className="form-control" value={this.state.title}/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="content">Content</label>
            <textarea required={true} id="content" name="content" value={this.state.content} onChange={this.onContentChange}
                      className="form-control" />
          </div>
          <div className="form-group">
            <button onClick={this.onSubmit} className="btn btn-success">Save</button>
          </div>
        </form>
      </div>
    )
  }
}
