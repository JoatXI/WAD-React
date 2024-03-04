import React from "react";

function Greeter({firstname, lastname, age}) {
    return (
        <div style={{ backgroundColor: "lightskyblue" }}>
            <p>Hello {firstname} {lastname}, your age is {age}! {age >= "18" ? "You are an adult!" : "You are underage"}</p>
        </div>
    );
}

export default Greeter;