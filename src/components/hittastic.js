import React from "react";
import FindArtist from "./FindArtist.js";
import DisplaySongs from "./DisplaySongs.js";

function SearchArtist({defaultArtist}) {
    const [name, setArtist] = React.useState("");
    const [songs, setSongs] = React.useState([]);

    const songsHtml = songs.map( currSong => <li key={currSong.id}>Artist Name: {currSong.artist}, Song Title: {currSong.title}, Release Year: {currSong.year}</li>);
    
    return (
        <div>
            <FindArtist artistSearchResult={updateArtist} name={name} />
            <DisplaySongs songs={songsHtml} />
        </div>
    );
    
    function updateArtist(currName) {
        const foundArtist = currName
        setArtist(foundArtist);

        ajaxSearch(foundArtist);
    }
    
    async function ajaxSearch(artistName) {
        try {
            const response = await fetch(`/billboard/artist/${artistName}`);
    
            const songList = await response.json();
    
            setSongs(songList);
    
        } catch (e) {
            alert(`Error occured: ${e.message}`);
        }
    }
}


export default SearchArtist;