---
title: Usage with JavaScript
sidebar_label: Usage with Vanilla JS
---

Since MikroORM 3.2, we can use `EntitySchema` helper to define own entities without decorators, which works also for Vanilla JavaScript.

> Read more about `EntitySchema` in [this section](entity-schema.md).

Here is an example of such entity:

```js title="./entities/Author.js"
const { Collection, EntitySchema } = require('@mikro-orm/core');
const { Book } = require('./Book');
const { BaseEntity } = require('./BaseEntity');

/**
 * @property {number} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} name
 * @property {string} email
 * @property {number} age
 * @property {boolean} termsAccepted
 * @property {string[]} identities
 * @property {Date} born
 * @property {Collection<Book>} books
 * @property {Book} favouriteBook
 * @property {number} version
 * @property {string} versionAsString
 */
class Author extends BaseEntity {

  /**
   * @param {string} name
   * @param {string} email
   */
  constructor(name, email) {
    super();
    this.name = name;
    this.email = email;
    this.books = new Collection(this);
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.termsAccepted = false;
  }

}

export const schema = new EntitySchema({
  class: Author,
  properties: {
    name: { type: 'string' },
    email: { type: 'string', unique: true },
    age: { type: 'number', nullable: true },
    termsAccepted: { type: 'boolean', default: 0, onCreate: () => false },
    identities: { type: 'string[]', nullable: true },
    born: { type: DateType, nullable: true, length: 3 },
    books: { kind: '1:m', entity: () => 'Book', mappedBy: book => book.author },
    favouriteBook: { kind: 'm:1', type: 'Book' },
    version: { type: 'number', persist: false },
  },
});

module.exports.Author = Author;
module.exports.entity = Author;
module.exports.schema = schema;
```

> Do not forget to provide `name` and `path` schema parameters as well as `entity` and `schema` exports.

Reference `kind` parameter can be one of (where `SCALAR` is the default one):

```ts
export enum ReferenceKind {
  SCALAR = 'scalar',
  ONE_TO_ONE = '1:1',
  MANY_TO_ONE = 'm:1',
  ONE_TO_MANY = '1:m',
  MANY_TO_MANY = 'm:n',
  EMBEDDED = 'embedded',
}
```

We can register our entities as usual:

```js
const orm = await MikroORM.init({
  entities: [Author, Book, BookTag, BaseEntity],
  dbName: 'my-db-name',
});
```

> We can also pass the `EntitySchema` instance to the `entities` array.

For more examples of plain JavaScript entity definitions take a look [Express JavaScript example](https://github.com/mikro-orm/express-js-example-app).
