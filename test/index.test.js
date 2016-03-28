var should = require('should');

var Sequel = require('../sequel/index');

var userSchema = {
  users: {
    identity: 'users',
    tableName: 'users',
    attributes: {
      id: {
        primaryKey: true,
        type: 'text',
      },
      email: {
        type: 'text',
      },
      balance: {
        type: 'integer',
      },
    },
  }
};

var multiPkSchema = {
  users: {
    identity: 'users',
    tableName: 'users',
    attributes: {
      id: {
        primaryKey: true,
        type: 'text',
      },
      email: {
        type: 'text',
        primaryKey: true,
      },
      balance: {
        type: 'integer',
      },
    },
  }
};

describe('update', function() {
  it('throws an error if attempting to update a primary key', function() {
    var sequel = new Sequel(userSchema, {});
    sequel.update.bind(sequel, 'users', {}, {id: 'foo'}).should.throw(Error, {
      message: 'Cannot mutate primary key id on users',
      data: {id: 'foo'},
    });
  });

  it('throws an error if attempting to update a schema with multiple primary keys', function() {
    var sequel = new Sequel(multiPkSchema, {});
    sequel.update.bind(sequel, 'users', {}, {email: 'foo'}).should.throw(Error, {
      message: 'Cannot mutate primary key email on users',
      data: {email: 'foo'},
    });
  });

  it('does not throw an error if attempting to update other fields', function() {
    var sequel = new Sequel(userSchema, {});
    var val = sequel.update('users', {}, {balance: 3});
    val.query.trim().should.equal('UPDATE "users" AS "users" SET balance = $1');
    val.values.should.eql([3]);
  });

  it('throws an error if the operator is unknown', function() {
    var sequel = new Sequel(userSchema, {});
    sequel.find.bind(sequel, 'users', { balance: { 'in': [ 1, 2 ] } }).should.throw(Error, {
      message: "Unknown filtering operator: \"in\". Should be 'startsWith', '>', 'contains' or similar",
      operator: 'in',
    });
  });
});
