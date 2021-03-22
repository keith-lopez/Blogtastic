import React from 'react';
import axios from "axios";

//Class Component
export default class NewPost extends React.Component {

    initialState = {
        id: '',
        author: this.props.authorName,
        blogTitle: '',
        blogBody: '',
        todaysDate: ''
    }

    state = this.initialState;

    handleSetAuthorId(authorName) {
        axios.get(`http://localhost:4000/getBlogs/${authorName}`).then(response => {
            console.log(response.data);

            this.setState({
                id: response.data[0]._id
            });


        });
    }

    getDate = () => {
        const today = new Date();
        const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
        return date;
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        if (!this.state.todaysDate) {
            this.setState({ todaysDate: this.getDate() });
        }

        this.setState({
            [name]: value
        })
    }

    submitBlogPost = (event) => {
        event.preventDefault();

        this.props.handleBlogPostSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        return (
            <div>
                <div class="container">
                    <div class="jumbotron">
                        <form onSubmit={this.submitBlogPost} class="text-left col-xl-auto">
                            <h3 class="text-center">Submit New Post</h3>
                            <div class="form-group ">
                                <label htmlFor="author">Author</label>
                                <input type="text" class="form-control" name="author" id="author" value={this.state.author} placeholder={this.props.authorName} readOnly />
                            </div>
                            <div class="form-group">
                                <label htmlFor="blogTitle">Title</label>
                                <input type="text" class="form-control" name="blogTitle" id="blogTitle" onChange={this.handleChange} value={this.state.blogTitle} placeholder="Blog Title" />
                            </div>
                            <div class="form-group">
                                <label htmlFor="blogBody">Body</label>
                                <textarea name="blogBody" id="blogBody" class="form-control" cols="85" rows="10" onChange={this.handleChange} value={this.state.blogBody} placeholder="Submit your text post here..."></textarea>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary col-md-1 mr-1 mb-3">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}