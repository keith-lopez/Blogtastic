import React from 'react';
import axios from "axios";

//Class Component
export default class Submit extends React.Component {
    state = {
        error: undefined
    }

    handleEnter = (e) => {
        e.preventDefault();

        const author = {
            authorName: e.target.elements.authorname.value.trim(),
            quote: e.target.elements.quote.value.trim()
        }
        const error = this.props.handleEnter(author.authorName);

        this.setState(() => ({ error: error}));

        if (!error) {
            this.props.handleSetAuthors(author);
            this.props.handleLogin(author.authorName);
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleEnter} class="justify-content-center align-middle">
                    <div class="form-group">
                        <input class="form-control form-control-lg pr-5" type="text" name="authorname" placeholder="Name" />                        
                    </div>
                    <div class="form-group ">
                    <input class="form-control form-control-lg pr-5" type="text" name="quote" placeholder="Enter Quote On First Login" />
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg ">Enter</button>
                </form>
            </div>
        );
    }
}