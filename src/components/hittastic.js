import React from "react";

function SearchArtist({name, defaultArtist}) {
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
        foundArtist = currName
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