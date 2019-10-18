import React, { Component } from 'react'

export class Track extends Component {
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.artist}</p>
                </div>
                {/* <button class="Track-action"><!-- + or - will go here --></button> */}
            </div>
        )
    }
}

export default Track
