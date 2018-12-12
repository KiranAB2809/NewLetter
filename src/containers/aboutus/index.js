import React, { Component } from 'react';
import './aboutus.css';
import Card from '../common/card.react';

const NewsletterTeam = () => {
    const teamContact = [     
        {
            id: 0,
            name: "Rajesh",
            mail: "chirukandoth.rajesh@volvo.com",
            image: 'http://segotn14123:85/static/rajesh.jpg'
        },   
        {
            id: 1,
            name: "Nycil Dolly",
            mail: "dolly.fair.nycil@volvo.com",
            image: 'http://segotn14123:85/static/dolly.jpg'
        },       
        {
            id: 2,
            name: "Navyashree",
            mail: "navyashree.veeraguddaiah@volvo.com",
            image: 'http://segotn14123:85/static/navya.png'
        },
        {
            id: 3,
            name: "Shivakumar",
            mail: "shivakumar.b@volvo.com",
            image: 'http://segotn14123:85/static/shiva.jpg'
        },
        {
            id: 4,
            name: "Vinay",
            mail: "vinay.badrinath.deshpande@volvo.com",
            image: 'http://segotn14123:85/static/vinay.jpg'
        },
        {
            id: 5,
            name: "Shreedhar",
            mail: "shreedhar.bhat@volvo.com",
            image: 'http://segotn14123:85/static/shreedhar.jpeg'
        },
        {
            id: 6,
            name: "Kiran",
            mail: "kiran.bollavaram@volvo.com",
            image: 'http://segotn14123:85/static/kiranb.jpg'
        },
        {
            id: 7,
            name: "Chandrakala",
            mail: "nimmala.chandrakala@volvo.com",
            image: 'http://segotn14123:85/static/chandrakala.jpeg'
        },
        {
            id: 8,
            name: "Shyamkumar",
            mail: "shyamkumar.jha@volvo.com",
            image: 'http://segotn14123:85/static/shyam.jpg'
        },
        {
            id: 9,
            name: "Arpitha",
            mail: "arpitha.l@volvo.com",
            image: 'http://segotn14123:85/static/arpitha.png'
        },
        {
            id: 10,
            name: "Preeti",
            mail: "preeti.madiwal@volvo.com",
            image: 'http://segotn14123:85/static/preeti.jpg'
        },
        {
            id: 11,
            name: "Chaitra",
            mail: "chaitra.munikrishnappa@volvo.com",
            image: 'http://segotn14123:85/static/chaitra.jpg'
        },
        {
            id: 12,
            name: "Balamurugan",
            mail: "balamurugan.murugan@volvo.com",
            image: 'http://segotn14123:85/static/bala.jpg'
        }
    ];
    const developer = [
        {
            id: 0,
            name: "Nandan A",
            mail: "nandan.a@volvo.com",
            image: 'http://segotn14123:85/static/nandan.jpg'
        },
        {
            id: 1,
            name: "Kiran AB",
            mail: "kiran.ab@volvo.com",
            image: 'http://segotn14123:85/static/kiran.jpg'
        },
        {
            id: 2,
            name: "Sachin",
            mail: "sachin.puttarangaswamy@volvo.com",
            image: 'http://segotn14123:85/static/sachin.jpg'
        },
        {
            id: 4,
            name: "Balamurugan",
            mail: "balamurugan.murugan@volvo.com",
            image: 'http://segotn14123:85/static/bala.jpg'
        }
    ]
    return(
        <div className="aboutUsBody">
            <div style={{overflow:'hidden'}} >
                <h3>Contact us</h3>                
                <hr />             
                <div>
                    {teamContact.map(person => {
                        return <div key={person.id}>
                            <Card className="profile-card">
                                <img className="profilePic" src={person.image} alt={person.name} />
                                <div>
                                    <h2 className="name" style={{padding:'0px'}}>{person.name}</h2>
                                    <p style={{padding:'10px', background:'grey', color:'White', marginBottom: 0 }}>
                                        <a href={`mailto:${person.mail}`} className="contact-button">Contact Me</a>
                                    </p>
                                </div>                                
                            </Card>
                        </div>
                    })}
                </div>
            </div> 
            <div>
                <h3>Development Team</h3>
                <hr />
                <div>
                    {developer.map(person => {
                        return <div key={person.id}>
                            <Card className="profile-card">
                                <img className="profilePic" src={person.image} alt={person.name} />
                                <div>
                                    <h2 className="name" style={{padding:'0px'}}>{person.name}</h2>
                                    <p style={{padding:'10px', background:'grey', color:'White', marginBottom: 0 }}>
                                        <a href={`mailto:${person.mail}`} className="contact-button">Contact Me</a>
                                    </p>
                                </div>                                
                            </Card>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewsletterTeam