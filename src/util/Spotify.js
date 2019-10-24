const clientId = '16943a82cf654665aec0027f19061065';
const redirectUri = 'http://localhost:3000/';

let accessToken;

const Spotify = {

    // Gets access token from Spotify
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (hasAccessToken && hasExpiresIn) {
            accessToken = hasAccessToken[1];
            const expiresIn = Number(hasExpiresIn[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    // Uses access token to return a response from the Spoitify API using user serach term from SearchBar
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        let jsonResponse;
        if (response.ok) {
            jsonResponse = await response.json();
        } else {
            console.log('API request failed');
        }


        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            cover: track.album.images[2].url,
            preview: track.preview_url
        }));

    },

    // Gets a user's ID from Spotify, creates a new playlist on user's account, and adds tracks to that playlist
    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userId;

        // Return user's ID from Spotify API
        let response = await fetch('https://api.spotify.com/v1/me', {
            headers: headers
        })
        let jsonResponse;
        if (response.ok) {
            jsonResponse = await response.json();
        }

        userId = jsonResponse.id;

        // Adds playlist to user's account
        let pResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: playlistName })
        })
        let pJsonResponse;
        if (pResponse.ok) {
            pJsonResponse = await pResponse.json();
        } else {
            console.log('API request failed');
        }
        const playlistId = pJsonResponse.id;

        // Adds tracks to new playlist 
        return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackURIs })
        });
    }
}

export default Spotify;