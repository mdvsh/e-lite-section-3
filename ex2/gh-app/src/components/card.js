import React from 'react'
import './card.css'

class RepoCard extends React.Component {
    render() {
        return (
            <div className="repo-card">
                <div className="repo-card-content">
                    <h3>{this.props.data.name}</h3>
                    <p><a href={this.props.data.html_url}>{this.props.data.description}</a></p>
                </div>
                <footer className="repo-card-footer">
                    <a className="repo-link" href={this.props.data.html_url}>
                        See Code
                    </a>
                </footer>
            </div>
        )
    }
}

export default RepoCard
