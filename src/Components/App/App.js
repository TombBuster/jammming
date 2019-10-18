import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: 'Test',
          artist: 'Test',
          album: 'Test',
          id: 0
        },
        {
          name: 'Test2',
          artist: 'Test2',
          album: 'Test2',
          id: 1
        },
        {
          name: 'pTest',
          artist: 'pTest',
          album: 'pTest',
          id: 2
        }
      ],
      playlistName: 'foo',
      playlistTracks: [
        {
          name: 'pTest',
          artist: 'pTest',
          album: 'pTest',
          id: 2
        },
        {
          name: 'pTest2',
          artist: 'pTest2',
          album: 'pTest2',
          id: 3
        }
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(pTrack => pTrack.id === track.id)) {
      return;
    } else {
      this.setState({ playlistTracks: [...this.state.playlistTracks, track] })
    }
  }

  removeTrack(track) {
    this.setState({ playlistTracks: this.state.playlistTracks.filter(pId => pId.id != track.id) })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
