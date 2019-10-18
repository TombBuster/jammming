import React, { Component } from 'react'
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map((track) => {
                    return <Track key={track.id} track={track} />
                })
                }
            </div>
        )
    }
}

export default TrackList
