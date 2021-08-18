// http://localhost:3000/isolated/examples/enabling-concurrent-mode.js

import * as React from 'react'
import ReactDOM from 'react-dom'

function App() {

  function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

var array = [
    { name:"string 1", value:"this", other: "that" },
    { name:"string 2", value:"this", other: "that" }
];

var resultObject = search("string 1", array);
console.log(resultObject)

  return <div>Hello React World!</div>
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />,rootEl)

