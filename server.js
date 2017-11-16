/**
 * @author Alexander Pyreev
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLInt = graphql.GraphQLInt;

const goldbergs = {
    1: {
        character: "Beverly Goldberg",
        actor: "Wendi McLendon-Covey",
        role: "matriarch",
        traits: "embarrassing, overprotective",
        id: 1
    },
    2: {
        character: "Murray Goldberg",
        actor: "Jeff Garlin",
        role: "patriarch",
        traits: "gruff, lazy",
        id: 2
    },
    3: {
        character: "Erica Goldberg",
        actor: "Hayley Orrantia",
        role: "oldest child",
        traits: "rebellious, nonchalant",
        id: 3
    },
    4: {
        character: "Barry Goldberg",
        actor: "Troy Gentile",
        role: "middle child",
        traits: "dim-witted, untalented",
        id: 4
    },
    5: {
        character: "Adam Goldberg",
        actor: "Sean Giambrone",
        role: "youngest child",
        traits: "geeky, pop-culture obsessed",
        id: 5
    },
    6: {
        character: "Albert 'Pops' Solomon",
        actor: "George Segal",
        role: "grandfather",
        traits: "goofy, laid back",
        id: 6
    }
};

const goldbergType = new GraphQLObjectType({
    name: "Goldberg",
    description: "Member of The Goldbergs",
    fields: {
        character: {
            type: GraphQLString,
            description: "Name of the character"
        },
        actor: {
            type: GraphQLString,
            description: "Actor playing the character"
        },
        role: {
            type: GraphQLString,
            description: "Family role"
        },
        traits: {
            type: GraphQLString,
            description: "Traits this Goldberg is known for"
        },
        id: {
            type: GraphQLInt,
            description: "ID of this Goldberg"
        }
    }
});

const queryType = new GraphQLObjectType({
    name: "query",
    description: "Goldberg query",
    fields: {
        goldberg: {
            type: goldbergType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: function (_, args) {
                return getGoldberg(args.id)
            }
        }
    }
});

function getGoldberg(id) {
    return goldbergs[id]
}

const schema = new GraphQLSchema({
    query: queryType
});

const graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(8088);
console.log("The GraphQL Server is running on port 8088.");

const compiler = webpack({
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/static/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
});

const app = new WebpackDevServer(compiler, {
    contentBase: "/public/",
    proxy: {"/graphql": `http://localhost:${8088}`},
    publicPath: "/static/",
    stats: {colors: true}
});
app.use("/", express.static("static"));
app.listen(3000);
console.log("The App Server is running on port 3000.");
