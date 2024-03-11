import React from 'react';

function FindArtist({artistSearchResult}) {

    function currentArtist() {
        const currName = document.getElementById('artistName').value;
        artistSearchResult(currName);
    }

    return (
        <div>
            <h1>Search For Your Favourite Artist Song</h1>
            <h2>Enter Artist: </h2>
            <input id="artistName" />
            <input type="button" value="Search" onClick={currentArtist} />
        </div>
    );
}

export default FindArtist;