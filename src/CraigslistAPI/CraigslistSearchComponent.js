import React from "react";
import {Client} from "node-craigslist"


export default class CraigslistSearchComponent extends React.Component {

    componentDidMount() {
        let searchPost = this.props.match.params.searchPost;
        console.log(searchPost)
        if(searchPost) {
            // this.props.craigslistClient.search(searchPost)
            this.craigslistClient.search(searchPost)
            .then(response => response.json())
            .then(results => console.log(results))
        }


    }

    state = {
        posts : [],
        searchPost: ''
    }

    craigslistClient = new Client({city : 'boston'})


    searchPosts = (searchQuery) => {
        this.props.history.push(`/search/${searchQuery}`)
        // this.props.craigslistClient.search(searchQuery)
        this.craigslistClient.search(searchQuery)
            .then(response => response.json())
            .then(results => console.log(results))
    }

    render() {
        return (
            <div>
            <h2>Search Posts</h2>
            <input className={`form-control`}
                    onChange={e => this.setState({searchPost: e.target.value})}
                    value={this.state.searchPost}/>
            <button className={`btn btn-success btn-block`}
                    onClick={() => this.searchPosts(this.state.searchPost)}>
                        Search For Posts
            </button>

            <ul className={`list-group`}>
                {this.state.posts.map((post, i) =>
                    <li className={`list-group-item`} key={i}>
                        {post}
                    </li>
                )

                }
            </ul>
        </div>
        )
    }
}