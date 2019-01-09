import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import store from '../reducer/store';
import { nextPage, initPage } from '../actions/action';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        let currentId = event.target.dataset.id
        store.dispatch(nextPage(+currentId));
        let pagination = [...document.querySelectorAll('.pagination__item')];
        pagination.forEach(item => {
            item.classList.remove('active');
            if(item.dataset.id === currentId) {
                item.classList.add('active');
            }
        });
    }
    componentWillMount() {
        axios('https://cors-anywhere.herokuapp.com/http://dev.frevend.com/json/users.json')
            .then(res => {
                store.dispatch(initPage(res))
            });
    }

    render() {
        const { users, currentPage, step } = this.props.state;
        const last = currentPage * step;
        const first = last - step;
        const currentUsers = users.slice(first, last);
        const renderUsers = currentUsers.map((user) => {
            return <div key={user.id} className="user">
                <div className='user__info'>
                    <div className='user__info--id'>{user.id}</div>
                    <h2 className='user__info--name'>{`${user.name} ${user.surname}`}</h2>
                    <div className='user__info--desc'>{user.desc}</div>
                </div>
            </div>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / step); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <div
                    key={number}
                    data-id={number}
                    onClick={this.handleClick}
                    className={number === 1 ? 'pagination__item active' : 'pagination__item'}
                >
                    {number}
                </div>
            );
        });
        return (

            <div className="users" >
                {renderUsers}
                <div className='pagination'>
                    {renderPageNumbers}
                </div>
            </div>
        )
    }
}
const mapStateToProps = store => {
    return {
        state: store
    }
};

export default connect(mapStateToProps)(App);