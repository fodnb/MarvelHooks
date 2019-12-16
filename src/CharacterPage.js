import React from 'react';


const CharacterPage = (props) => {
    let { img, description, name } = props.hero;
    let { clear } = props;
    return (
        <div>
            {name && img ?
                (<div className="content">
                    <h2 className="name">{name}</h2>
                    <img className="img" src={img} alt={name} />
                    <p className="description">{description} <br /> Data provided by Marvel. © 2014 Marvel</p>
                    <button className="clearButton" onClick={clear} autoFocus={true}>New Search</button>
                </div>)
                :
                <div></div>
            }
        </div>
    );

};


export default CharacterPage;