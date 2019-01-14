import React from 'react';

class TvDetails extends React.Component {
    state = {
        details: null
    }

    componentDidMount(){
        if(this.props.isActive && !this.state.details){
            // todo: fetch details.
        }
    }

    render(){
        return <div>details {this.props.model}</div>
    }
}

export default TvDetails;