import React from 'react';

//Stateless Component
const Header = (props) => {
    return (
        <div class="container">
            <div class="jumbotron text-center" >
                <h1>{props.title}{props.authorName}</h1>
            </div>
        </div>
    );
};

Header.defaultProps = {
    title: 'Welcome to Blogtastic, '
};

export default Header;