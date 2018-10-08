// DataStore is mostly recommended for use in the browser
import {
  DataStore,
  utils
} from 'js-data'
import { HttpAdapter } from 'js-data-http';
import * as relations from './Relations';
import * as schemas from './Schemas';


function convertToDate(record: any): Date {
  if (typeof record.created_at === 'string') {
    record.created_at = new Date(record.created_at)
  }
  if (typeof record.updated_at === 'string') {
    record.updated_at = new Date(record.updated_at)
  }
  return new Date();
}

export const adapter = new HttpAdapter({
  // Our API sits behind the /api path
  basePath: '/api'
})
export const store = new DataStore({
  mapperDefaults: {
    // Override the original to make sure the date properties are actually Date
    // objects
    createRecord(props: any, opts: any): any {
      const result = this.constructor.prototype.createRecord.call(this, props, opts)
      if (Array.isArray(result)) {
        result.forEach(convertToDate)
      } else if ((this as any).is(result)) {
        convertToDate(result)
      }
      return result
    }
  }
});

store.registerAdapter('http', adapter, { default: true });

// The User Resource
export const User = store.defineMapper('user', {
  // Our API endpoints use plural form in the path
  endpoint: 'users',
  relations: relations.user,
  schema: schemas.UserSchema,
  getLoggedInUser() {
    if (this.loggedInUser) {
      return utils.resolve(this.loggedInUser)
    }
    return store.getAdapter('http').GET('/api/users/loggedInUser')
      .then((response: any) => {
        const user = this.loggedInUser = response.data
        if (user) {
          this.loggedInUser = store.add('user', user)
        }
        return this.loggedInUser
      })
  },
  wrap(data: any, opts: any) {
    if (opts.op === 'afterFindAll') {
      data.forEach((user: any) => {
        store.findAll('post', { where: { user_id: { '==': user.id }}})
      });

      return this.createRecord(data);
    } else {
      store.findAll('post', { where: { user_id: { '==': data.id }}})
      return this.createRecord(data)
    }
  }
});

// The Post Resource
export const Post = store.defineMapper('post', {
  // Our API endpoints use plural form in the path
  endpoint: 'posts',
  relations: relations.post,
  schema: schemas.PostSchema,
  // If "GET /posts" doesn't return data as JSData expects, so we could override the
  // default "wrap" method and add some extra logic to make sure that the
  // correct data gets turned into Record instances
  wrap(data: any, opts: any) {
    // In case we need to deserialize the data we could uncomment this and
    // perform some action.
    if (opts.op === 'afterFindAll') {
      data.forEach((post: any) => {
        store.findAll('comment', { where: { post_id: { '==': post.id }}})
      });

      return this.createRecord(data);
    } else {
      store.findAll('comment', { where: { post_id: { '==': data.id }}})
      return this.createRecord(data)
    }
  }
});

// The Comment Resource
export const Comment = store.defineMapper('comment', {
  // Our API endpoints use plural form in the path
  endpoint: 'comments',
  relations: relations.comment,
  schema: schemas.CommentSchema
});
