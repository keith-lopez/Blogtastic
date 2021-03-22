import React from 'react';

//Stateless Component
export default class Authors extends React.Component {
    setTab = (e) => {
        e.preventDefault();

        this.props.setTab(e);
        this.props.handleSetAuthor(e);
    };

    render() {
        return (
            <div>
                {this.props.authors.map((author, index) => {
                    return (
                        <div key={index} class="container mt-3">
                            <div class="card">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item mb-2">
                                        <div class="card-header">{author.authorName}</div>
                                        <div class="card-body">
                                            <h5 class="card-title" >{author.quote}</h5>
                                            <button value="viewPosts" class="btn btn-primary  mt-5" name={author.authorName} onClick={this.setTab}>View Posts</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
};