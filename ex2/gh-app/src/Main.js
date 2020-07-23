import React from 'react';
import ReactDOM from 'react-dom';
import './Main.css';
import './index.css'
import RepoCard from './components/card.js'

const API = "https://api.github.com/users";

class Search extends React.Component {

    handleSearch(event) {
        event.preventDefault()
        let username = ReactDOM.findDOMNode(this.refs.username).value
        this.props.fetchInfo(username)
        ReactDOM.findDOMNode(this.refs.username).value = ""
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.handleSearch.bind(this)}>
                    <label>
                        <input
                        type="search"
                        placeholder="Enter a username"
                        ref="username"
                        />
                    </label>
                </form>
            </div>
        )
    }
}

class ProfCard extends React.Component {

    render() {
        let data = this.props.data

        if (data.errorm === 'Not Found') {
            return (
                <div className="error">
                    <h2>Not Found</h2>
                    <p>The entered username couldn't be found.
                    <br />
                    Please try again.</p>
                </div>
            )
        }
        else {
            return (
                <section className="profile">
                    <div className="profile-data">
                        <img src={data.avatar} alt={data.username} />
                        <h2>
                            <a 
                            href={data.userUrl}
                            rel="noopener noreferrer"
                            target="_blank">
                            {data.name || data.username}
                            </a>
                        </h2>
                        <h3>
                            {data.location || "127.0.0.1"}
                        </h3>
                    </div>
                </section>
            )
        }
    }
}

class Repos extends React.Component {

    renderRepoCard(i, repo_data) {
        return (
            <RepoCard
            key={i}
            data={repo_data}
            />
        )
    }

    render() {
        let repo_list = this.props.data
        let errorm = this.props.errom
        console.log(errorm)
        if (errorm === 'Not Found' || repo_list == null) {
            return (
                <div className="right">
                    <h2 style={{color:"#d63031"}}>Error fetching repos</h2>
                    <p style={ { color:"#333333", fontSize:"1rem"}}>
                    The entered username's repos couldn't be fetched.
                    <br />
                    Please try again.</p>
                </div>
            )
        }
        else {
            return (
                <div className="right">
                    {repo_list.map(repo => {
                        return  (
                            <RepoCard
                            key={repo.id}
                            data={repo}
                            />
                        )
                    })}
                    {console.log(repo_list)}
                </div>
            )
        }
    }
}

class Main extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        username: "gaearon",
        name: "",
        avatar: "",
        location: "",
        repos: "",
        repo_list: [],
        userUrl: "",
        errorm: "",
      } 
    }

    fetchInfo(username) {
      let url = `${API}/${username}`;
      let repo_url = `${API}/${username}/repos`
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            username: data.login,
            name: data.name,
            avatar: data.avatar_url,
            location: data.location,
            repos: data.public_repos,
            userUrl: data.html_url,
            errorm: data.message,
          })
        })
        .catch((error) => console.log(`Error: ${error}`));

        fetch(repo_url)
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Not Found') {
                    this.setState({errorm: data.message, repo_list: null})
                } else {
                    this.setState({errorm: data.message, repo_list: data})
                }
            })
            .catch((error) => console.log(`Error: ${error}`));
    }

    componentDidMount() {
      this.fetchInfo(this.state.username);
    }

    render() {
      return (
        <React.Fragment>
            <div className="left">
                <section className="card">
                    <Search fetchInfo={this.fetchInfo.bind(this)} />
                    <ProfCard data={this.state} />
                </section>
            </div>
            <Repos error={this.state.errom} data={this.state.repo_list}/> 
        </React.Fragment>           
      )
    }
  }


export default Main;
