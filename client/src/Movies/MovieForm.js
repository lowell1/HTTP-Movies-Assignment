/*
render list of stars
delete button next to stars with index of star in stars array as name
delete function removes corresponding star on button click

new input field to add star stars
*/

import React, {useState, useEffect} from "react"
import axios from "axios";

const MovieForm = (props) => {
    const [form, setForm] = useState({title: "", director: "", metascore: "", stars: []});

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(resp => {
            // setForm({
            //     title: resp.data.title,
            //     director: resp.data.director,
            //     stars: resp.data.stars.map((star, idx) => { return {name: star, id: idx}; })
            // });
            setForm(resp.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[props.match.params.id]);

    const handleDelete = e => {
    }


    return (
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

            {/* {form.stars.map(star => JSON.stringify(star))} */}
            {/* <label>
                Stars:
                <input type="textarea" name="stars" value={form.stars}/>
            </label> */}
        </form>
    );
}



export default MovieForm;