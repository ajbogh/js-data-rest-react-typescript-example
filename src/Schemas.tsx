import { Schema  } from 'js-data';

export const UserSchema = new Schema({
  $schema: 'http://json-schema.org/draft-04/schema#', // optional
  description: 'Schema for User records', // optional
  properties: {
    id: { type: 'number' },
    name: { type: 'string' }
  },
  title: 'User', // optional
  type: 'object'
});

export const PostSchema = new Schema({
  properties: {
    content: { type: 'string' },
    date_published: { type: ['string', 'null'] },
    id: { type: 'number' },
    title: { type: 'string' },
    // Only the DataStore and SimpleStore components care about the "indexed" attribute
    user_id: { type: 'number', indexed: true }
  },
  type: 'object'
});

export const CommentSchema = new Schema({
  properties: {
    content: { type: 'string' },
    id: { type: 'number' },
    // Only the DataStore and SimpleStore components care about the "indexed" attribute
    post_id: { type: 'number', indexed: true },
    // Only the DataStore and SimpleStore components care about the "indexed" attribute
    user_id: { type: 'number', indexed: true },

  },
  type: 'object'
});