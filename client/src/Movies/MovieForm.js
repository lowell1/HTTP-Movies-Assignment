/*
render list of stars
delete button next to stars with index of star in stars array as name
delete function removes corresponding star on button click

new input field to add star stars
*/

import React, {useState, useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom";

const MovieForm = (props) => {
    const [form, setForm] = useState({title: "", director: "", metascore: "", newStar: ""});
    const [stars, setStars] = useState([]);

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(resp => {
            console.log(resp)
            setForm({
                newStar: "",
                title: resp.data.title,
                director: resp.data.director,
                metascore: resp.data.metascore
            });

            setStars(resp.data.stars);
        })
        .catch(error => {
            console.log(error);
        })
    },[props.match.params.id]);

    const deleteStar = e => {
        const starsCopy = [...stars];
        starsCopy.splice(e.target.name,1);
        setStars(starsCopy);
    }

    const addStar = () => {
        setStars([...stars, form.newStar]);
        setForm({...form, newStar: ""});
    }

    const updateMovie = e => {
        e.preventDefault();
    }


    return (
        <div>
            <form>
                <label>
                    Title:
                    <input type="text" onChange={e => handleChange(e)} name="title" value={form.title}/>
                </label>
                <br/>
                <label>
                    Director:
                    <input type="text" onChange={e => handleChange(e)} name="director" value={form.director}/>
                </label>
                <br/>
                <label>
                    Metascore:
                    <input type="number" name="metascore" onChange={e => handleChange(e)} value={form.metascore}/>
                </label>
    
                <p>Stars:</p>
                {
                    stars.map((star, idx) => 
                        <p key={idx}>
                            <button type="button" name={idx} onClick={e => deleteStar(e)}>Delete </button>
                            {star}
                        </p>
                    )
                }
                <br/>
                <button type="button" onClick={() => addStar()}>Add star</button>
                <input type="text" name="newStar" value={form.newStar} onChange={e => handleChange(e)}/>
                <br/><br/>
                <button type="submit" onClick={e => updateMovie(e)}>Update movie</button>
            </form>
            <br/>
            <Link to={`/movies/${props.match.params.id}`}>Go to movie</Link>
        </div>
    );
}



export default MovieForm;