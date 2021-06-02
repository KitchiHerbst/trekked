// import React from 'react'


const PostTrip = props => {
    console.log(props)
    fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
            'Accept':'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(props)
    })
    .then(res => res.json())
    .then(newTrip => console.log(newTrip))
    
}

export default PostTrip