import React from "react";
import background from "../assets/images/home.jpg";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

export default function Home () {
    return (
        <div 
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
            backgroundImage: `url(${background})`, 
            height: "100vh", 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center"
        }}>
        <div 
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                padding: "50px",
            }}>
            <h1 style={{fontSize: "150px", textAlign: "center"}}>What To Do</h1>
            <p style={{fontSize: "25px", textAlign: "center"}}>An App to Manage Your Daily Tasks</p>
            <Button 
                type="button" 
                className="btn btn-primary btn-lg primary-button" 
                style={{
                    textAlign:"center",
                    transition: "ease-in .5s"
                }}
            >
                <Link to="/list" style={{color: "inherit", textDecoration: "none"}}>START</Link>
            </Button>
        </div>
        </div>
    )
};