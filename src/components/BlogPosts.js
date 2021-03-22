import React from 'react';
import Posts from './Posts';

//Stateless Component
export default class BlogPosts extends React.Component {

    render() {
        let posts = this.props.posts.filter((posts) => posts.blogPosts.length > 0);
        let container;

        if (this.props.handleAreThereBlogPostsToShow(this.props.posts)) {
            container = <Posts blogs={posts}/>
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