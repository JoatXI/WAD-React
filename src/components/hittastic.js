import React from "react";

function SearchArtist() {
    const [name, setArtist] = React.useState("");
    const [songs, setSongs] = React.useState([]);

    const songsHtml = songs.map( currSong => <li key={currSong.id}>Artist Name: {currSong.artist}, Song Title: {currSong.title}, Release Year: {currSong.year}</li>);

    return (
        <div>
            <h1>Search For Your Favourite Artist Song</h1>
            <h2>Enter Artist: </h2>
            <input id="artistName" />
            <input type="button" value="Search" onClick={searchStateArtist} />

            <h2>Your Search Results:</h2>
            <ul>
                {songsHtml}
            </ul>
        </div>
    );

    function searchStateArtist() {
        setArtist(document.getElementById("artistName").value);

        const foundArtist = document.getElementById("artistName").value;
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