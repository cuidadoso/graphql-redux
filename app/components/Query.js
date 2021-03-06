/**
 * @author Alexander Pyreev
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions';

@connect(state => ({ store: state, }))
export default class Query extends Component {

    componentDidMount() {
        this.props.dispatch(
            getGraph("{goldberg(id: 2) {id, character, actor}}")
        );
    }

    render() {
        let dispatch = this.props.dispatch;
        let fetchInProgress = String(this.props.store.get('fetching'));
        let queryText;
        let goldberg = this.props.store.get('data').toObject();

        return (
            <div>
                <p>Fetch in progress: {fetchInProgress}</p>
                <h3>{ goldberg.character }</h3>
                <p>{ goldberg.actor }</p>
                <p>{ goldberg.role }</p>
                <p>{ goldberg.traits }</p>
                <input ref={node => {queryText = node}}></input>
                <button onClick={() => {
                    dispatch(getGraph(queryText.value))}
                }>
                    query
                </button>
            </div>
        )
    }
}
