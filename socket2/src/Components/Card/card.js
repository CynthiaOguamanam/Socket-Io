import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {AiFillLike} from 'react-icons/ai';
import {v4 as uuidv4} from "uuid";
import axios from 'axios';
import {io} from 'socket.io-client';

// import crypto from 'crypto'

const socket = io("http://localhost:1234")


const Card = () =>{

    const id = uuidv4();
    // const randID = crypto.randomBytes(8).toString()

const [text, setText] = useState("");
const [data, setData] = useState([]);

const getData = async () =>{
    await axios.get('http://localhost/1234/api').then((res)=>{
        setData(res.data.data);
        console.log(data)
    })
}

const postData = async () =>{
    await axios.post('http://localhost/1234/api/create', {name: text})
}
const postLike = async () =>{
    await axios.post(`http://localhost/1234/api/${id}/like`)
}

useEffect(()=>{
    getData();

    //newEntry is coming from the backend io.emit("newEntry"), it has to match...
    socket.on("newEntry", (newData) =>{
        setData([...data, newData])
        // console.log(newData)
    })
}, [])
    return(
        <Container>
            <Wrapper2>
                <h3>Input Card Name</h3>
                <Input value={text} onChange={(e) =>{
                    setText(e.target.value)
                }} placeholder='Enter name'/>
                <Button onClick={postData}>Add Name</Button>
            </Wrapper2>
            {data?.map((props) => (
                <Wrapper key={props._id}>
                <img style={{
                    width:"100%",
                    height:"150px",
                    objectFit:"contain"
                }} src='/ART ME.png' alt='image'/>
                <h1>{props.name}</h1>
                <AiFillLike onClick={() => {
                    postLike()
                }}></AiFillLike>
                <LikeNum>0</LikeNum>
            </Wrapper>
            ))}
            

        </Container>
    )
}

export default Card;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* flex-wrap: wrap; */
    
`;
const Wrapper2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;

`;
const LikeNum = styled.input``;
const Input = styled.input`
    /* padding: 10px 20px; */
    width: 300px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
`
const Button = styled.button`
    padding: 10px 20px;
    background-color: olivedrab;
    width: 200px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
`;

const Wrapper = styled.div`
    width: 300px;
    height: 300px;
    background-color: aliceblue;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 50px;
`;