import React from 'react';
import Submit from './Submit';
import Home from './Home';
import axios from "axios";

export default class Login extends React.Component {

    state = {
        canLogin: false,
        authorName: '',
        authors: ''
    }

    componentDidMount(){
        this.handleGetAuthors();
    }

    handleGetAuthors() {
        axios.get("http://localhost:4000/getAuthors").then(response => {
            this.setState({
                authors: response.data
            });
        });
    }

    handleEnter = (authorName) => {
        if (!authorName) {
            return 'Enter valid value to enter.';
        }
    };

    handleLogin = (authorName) => {
        this.setState({ canLogin: true, authorName: authorName });
    };

    addNewAuthor = (author) => {
        const newAuthor = {
            author: {
                authorName: author.authorName,
                quote: author.quote ? author.quote : "Default Quote!"
            },
            blogPosts: []
        };

        axios.post(`http://localhost:4000/addNewAuthor`, newAuthor)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    handleSetAuthors = (author) => {
        if (!this.state.authors.includes(this.state.authors.find(x => x.authorName === author.authorName))) {
            this.addNewAuthor(author);
            
            this.setState({
                authorName: author.authorName
            });          
        }        
    }

    render() {
        return (
            <div>
                {!this.state.canLogin &&
                    <div id="cover-caption">
                        <div class="container" style={{ marginTop: 200 }}>
                            <div class="row text-white ">
                                <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-left form p-4">
                                    <h1 class="display-4 py-2 text-wrap">Blog if you dare!!</h1>
                                    <h3>Enter your name and Quote:</h3>
                                    <Submit handleEnter={this.handleEnter} handleLogin={this.handleLogin} handleSetAuthors={this.handleSetAuthors} />
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {this.state.canLogin &&
                    <Home authorName={this.state.authorName} authors={this.state.authors} />
                }
            </div>

        );
    }
}