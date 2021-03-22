import React from 'react';

//Class Component
export default class ViewPost extends React.Component {

    render() {
        return (
            <div>
                <div class="container">
                    <div class="jumbotron">
                        <form class="text-left col-xl-auto">
                            <h3 class="text-center">Read {this.props.post.title}</h3>
                            <div class="form-group ">
                                <label htmlFor="author">Author</label>
                                <input type="text" class="form-control" name="author" id="author" placeholder={this.props.post.authorName} readOnly />
                            </div>
                            <div class="form-group">
                                <label htmlFor="blogBody">Body</label>
                                <textarea name="blogBody" id="blogBody" class="form-control" cols="85" rows="10" readOnly placeholder={this.props.post.body}></textarea>
                            </div>
                            <div>
                                <button onClick={this.props.handleClose} class="btn btn-primary col-md-1 mr-1 mb-3">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}