import React, { useState } from 'react';
import Card from './Components/Card/card';

const App = () =>{

  return(
    <div>
      <Card/>
    </div>
  )
}

export default App;


// const [text, setText] = useState("");
// const [data, setData] = useState([]);

// const makePost = () =>{
//   socket.on("chat message", (myText) => {
//     setData([...data, text]);
//     console.log(text)
//   });

//   console.log(text)
// }