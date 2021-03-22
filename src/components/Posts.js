import React from 'react';
import ViewPost from './ViewPost';

//Stateless Component
export default class Posts extends React.Component {
    state = {
        isViewPost: false,
        post: {
            title: '',
            body: '',
            AuthorName: ''
        }
        
    }

    handleOnClick = (e, title, body, authorName) => {
        e.preventDefault();

        this.setState({
            isViewPost: true,
            post: {
                title: title,
                body: body,
                authorName: authorName
            }

        });
    }

    handleClose = (e) => {
        e.preventDefault();

        this.setState({
            isViewPost: false
        });
    }

    render() {
        let component;

        if (this.state.isViewPost) {
            component = <ViewPost handleClose={this.handleClose} post={this.state.post} />
        } else {
            component = this.props.blogs.map((author) => {
                {
                    return (
                        author.blogPosts.map((post, index) => {
                            return (
                                <div key={index} onClick={e => this.handleOnClick(e, post.title, post.body, author.author.authorName)} class="container">
                                    <div class="list-group mt-3 text-left">
                                        <div class="list-group-item list-group-item-action flex-column align-items-start mb-1">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">{post.title}</h5>
                                                <small>{post.date}</small>
                                            </div>
                                            <p class="mb-1">{post.body}</p>
                                            <small>{author.author.authorName}</small>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            })
        }

        return (
            <div>
                {component}
            </div>
        )
    }
}