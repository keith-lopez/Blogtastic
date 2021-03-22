import React from 'react';
import Posts from './Posts';

//Stateless Component
export default class AuthorsPosts extends React.Component {

    render() {
        let container;
        if (this.props.handleAreThereBlogPostsToShow(this.props.posts)) {
            container = <Posts blogs={this.props.posts} />
        } else {
            container = <h1>Get to bloggin!</h1>
        }

        return (
            <div>
                {container}
            </div>
        );
    }
};