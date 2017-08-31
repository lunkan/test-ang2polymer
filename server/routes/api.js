const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const router = express.Router();

const updateStream = require('../sockets/update-stream');
const mock = require("../mock/mock-sleep");

// Construct a schema, using GraphQL schema language
const MyGraphQLSchema = buildSchema(`
  type Sleep {
    id: String!
    preSleep: String!
    sleep: String!
    wakeUp: String!
  }

  type Subscription {
    sleepUpdated(type:Int): Sleep
  }

  type Query {
    sleepList(from:Int, to:Int): [Sleep]
  }

  type Mutation {
  	triggerChange(changed:Boolean): Sleep
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  sleepList: (args) => {
  	console.log('sleepList', args.from, args.to);
  	const mockList = mock.list();
  	return mockList;
  },
  triggerChange: (args) => {
  	console.log('triggerChange', args.changed);
  	return {
	    id: "foo",
	    preSleep: "foo",
	    sleep: "foo",
	    wakeUp: "foo"
  	};
  }
};

/* GET api listing. */
router.route('/').get((req, res) => {
  res.send('api works');
});

router.route('/graphql').post((req, res) => {
	console.log('graphql graphql graphql');

	const parsed = graphqlHTTP({
		schema: MyGraphQLSchema,
		rootValue: root,
		graphiql: true
	})(req, res).catch(err => {
		console.log('erroor graphql', err);
	});
});

router.route('/sleep').get((req, res) => {
	res.json({data: mock.list()});
});

router.route('/sleep/:id').put((req, res) => {
	const item = mock.upsertItem(req.body);

	updateStream.emit({
		action: 'update',
		type: 'sleep',
		data: item
	});

	res.json({data: item});
});


module.exports = router;