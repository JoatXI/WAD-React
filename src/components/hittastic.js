import React from "react";
import FindArtist from "./FindArtist.js";
import DisplaySongs from "./DisplaySongs.js";
import Logout from "./Logout";
import Login from "./Login";

function SearchArtist() {
    const [name, setArtist] = React.useState("");
    const [songs, setSongs] = React.useState([]);
    const [login, setLogin] = React.useState("");
    checkLogin();

    const songsHtml = songs.map( currSong => <li key={currSong.id}>Artist Name: {currSong.artist}, Song Title: {currSong.title}, Release Year: {currSong.year}</li>);
    
    return (
        <div>
            <Logout logoutResult={logoutSession} />
            <Login loginResult={loginSession} />
            <FindArtist artistSearchResult={updateArtist} name={name} />
            <DisplaySongs songs={songsHtml} />
        </div>
    );
    
    function updateArtist(currName) {
        const foundArtist = currName
        setArtist(foundArtist);

        ajaxSearch(foundArtist);
    }
    
    function logoutSession() {
        ajaxLogout();
    }

    function loginSession(loginDetails) {
        setLogin(loginDetails);

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

            if (userSessions.username == null) {
                document.getElementById('login-form').style.display = 'flex';
                document.getElementById('artist-search').style.display = 'none';
                document.getElementById('logout').style.display = 'none';
            } else if (userSessions.username != null) {
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('artist-search').style.display = 'flex';
                document.getElementById('logout').style.display = 'flex';
            }
    
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
                document.getElementById('login-form').style.display = 'none';
                document.getElementById("logout").style.display = "flex";
                document.getElementById('artist-search').style.display = 'flex';

                const node = document.createElement("p");
                const loginText = document.createTextNode(`Logged in as ${details.username}`);

                node.appendChild(loginText);
                document.getElementById("session-result").appendChild(node);
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
                document.getElementById("login-form").style.display = "block";
                document.getElementById("logout").style.display = "none";
                document.getElementById("artist-search").style.display = "none";
                document.getElementById("results").style.display = "none";
            }
    
        } catch (e) {
            alert(`Error occured: ${e}`);
        }
    }
}


export default SearchArtist;