import React from 'react';
import Header from './Header';
import NewPost from './NewPost';
import BlogPosts from './BlogPosts';
import Authors from './Authors';
import axios from "axios";
import AuthorsPosts from './AuthorsPosts';

export default class Home extends React.Component {

    state = {
        authorName: this.props.authorName,
        currentTab: '',
        previousTab: '',
        posts: [],
        authors: []
    }


    handleBlogPostSubmit = (post) => {
        const newBlogPost = {
            blogPosts: [{ title: post.blogTitle, body: post.blogBody, date: post.todaysDate }]
        };

        axios.put(`http://localhost:4000/addBlogPost/${post.author}`, newBlogPost).then(response => {

            console.log(response.status);
        });
    }

    handleGetAllBlogPosts() {
        axios.get("http://localhost:4000/getBlogs").then(response => {
            this.setState({
                posts: response.data, 
                currentTab: 'blogPosts'
            });
        });
    }

    handleGetAuthors() {
        axios.get("http://localhost:4000/getAuthors").then(response => {
            this.setState({
                authors: response.data,
                currentTab: 'authors'
            });
        });
    }

    handleGetBlogPostsByAuthor(authorName) {
        axios.get(`http://localhost:4000/getBlogs/${authorName}`).then(response => {
            
            this.setState({
                authorName: authorName,
                posts: response.data,
                currentTab: 'viewPosts'
            });
        });
    }

    setTab = (e) => {
        e.preventDefault();

        const tab = e.target.value.trim();
        const authorName = e.target.name.trim();

        this.setState({ previousTab: this.state.currentTab });

        if (tab === 'blogPosts') {
            this.handleGetAllBlogPosts();
        } else if (tab === 'authors') {
            this.handleGetAuthors();
        } else if (tab === 'newPost') {
            this.setState({ currentTab: 'newPost' });
        } else if (tab === 'viewPosts') {
            this.handleGetBlogPostsByAuthor(authorName);
        }

    };

    handleSetAuthor = (e) => {
        this.setState({
            authorName: e.target.name.trim()
        });
    };

    handleAreThereBlogPostsToShow(blogPosts) {
        return blogPosts.includes(blogPosts.find(x => x.blogPosts.length > 0)) ? true : false;
    }

    render() {
        return (
            <div>
                <Header
                    authorName={this.state.authorName}
                />

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <button class="nav-link btn btn-outline-secondary" value="blogPosts" onClick={this.setTab}>Blog Posts</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link btn btn-outline-secondary ml-3" value="authors" onClick={this.setTab}>Authors</button>
                            </li>
                            {this.state.currentTab === 'viewPosts' &&
                                <li class="nav-item">
                                    <button class="nav-link btn btn-outline-secondary ml-3 active" >{this.state.authorName}'s Posts</button>
                                </li>
                            }
                            <li class="nav-item">
                                <button class="nav-link btn btn-outline-primary ml-3" value="newPost" onClick={this.setTab}>Add Post</button>
                            </li>
                        </ul>
                    </div>
                </nav>

                {this.state.currentTab === 'blogPosts' &&
                    <BlogPosts posts={this.state.posts} handleAreThereBlogPostsToShow={this.handleAreThereBlogPostsToShow}/>
                }

                {this.state.currentTab === 'authors' &&
                    <Authors authors={this.state.authors} setTab={this.setTab} handleSetAuthor={this.handleSetAuthor} />
                }

                {this.state.currentTab === 'newPost' &&
                    <NewPost authorName={this.state.authorName} handleBlogPostSubmit={this.handleBlogPostSubmit}/>
                }

                {this.state.currentTab === 'viewPosts' &&
                    <AuthorsPosts posts={this.state.posts} handleAreThereBlogPostsToShow={this.handleAreThereBlogPostsToShow} handleBlogPostSubmit={this.handleBlogPostSubmit} />
                }

                {this.state.currentTab === '' &&
                    <h1>Happy Blogging!</h1>
                }

            </div>
        );
    }
}