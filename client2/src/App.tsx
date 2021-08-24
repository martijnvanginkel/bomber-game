import { useEffect } from 'react';
import './App.css';
import { io } from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:80";

function App() {

  console.log('asdf')

  useEffect(() => {
    const socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    })

    socket.on('connected', () => console.log('asdf123'))
    console.log(socket)
    // socket.on("FromAPI", data => {
    //   // setResponse(data);
    // });
  }, []);

  return (
    <div className="App">
      <p>asdf</p>
    </div>
  );
}

export default App;
