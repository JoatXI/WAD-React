import React from "react";
import FindArtist from "./FindArtist.js";
import DisplaySongs from "./DisplaySongs.js";
import Logout from "./Logout";
import Login from "./Login";

function SearchArtist() {
    const [name, setArtist] = React.useState("");
    const [songs, setSongs] = React.useState([]);
    const [login, setLogin] = React.useState(null);
    
    React.useEffect(() => {
        checkLogin();
    },[]);

    const songsHtml = songs.map( currSong => <li key={currSong.id}>Artist Name: {currSong.artist}, Song Title: {currSong.title}, Release Year: {currSong.year}</li>);
    
    /*if you're logged in 
        html = components to be displayed when you're logged in
    else
        html = components to be displayed when you're logged out*/

    if (login != null) {
        return (
            <div>
                <Logout logoutResult={logoutSession} />
                <FindArtist artistSearchResult={updateArtist} name={name} />
                <DisplaySongs songs={songsHtml} />
            </div>
        );
    } else {
        return (
            <Login loginResult={loginSession} />
        )
    }
    
    function updateArtist(currName) {
        const foundArtist = currName
        setArtist(foundArtist);

        ajaxSearch(foundArtist);
    }
    
    function logoutSession() {
        ajaxLogout();
    }

    function loginSession(loginDetails) {

        ajaxLogin(loginDetails);
    }

    async function checkLogin() {
        // ask the server whether the user is logged in (GET /login)
        // query the object returned by the server to see if the username is null or not null
        // if null, display login form
        // if not null, display search artist form
        try {
            const res = await fetch('/users/login');
    
            const userSessions = await res.json();

            setLogin(userSessions.username);

    
        } catch (e) {
            alert(`Error occured: ${e}`);
        }
    }
    
    async function ajaxLogin(details) {
        try {
            const res = await fetch(`/users/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(details)
            });
    
            if (res.status == 401) {
                alert('Invalid login details');
            } else if (res.status == 200) {
                alert(`Logged in as ${details.username}`);
                
                setLogin(details.username);
            }
    
        } catch (e) {
            alert(`An error occurred while logging in ${e}`);
        }
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
    
    async function ajaxLogout() {
        try {
            const res = await fetch(`/users/logout`, {
                method: 'POST'
            });
    
            if(res.status == 200) {
                alert("You have been logged out");
                
                setLogin(null);
            }
    
        } catch (e) {
            alert(`Error occured: ${e}`);
        }
    }
}


export default SearchArtist;