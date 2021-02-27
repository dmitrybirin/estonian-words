import React, { useState } from 'react'
import './App.css'
import { words } from './data/words'


const Header = () => {
  return <div className="header"><h1>Estonian words</h1></div>
}

function App() {

  const [inputText, setInputText] =  useState('')

  return (
    <>
    <Header/>
    <div className="search">
      <p>{words.length}</p>
          <input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} />
        </div>
    <div className="list">
      
        {words.filter(word => word.ruTranslation.includes(inputText) || word.forms.first.includes(inputText)).map(word => <div key={word.forms.first} className="card" style={{color:'red'}}>{word.ruTranslation}</div>)
        }
    </div>
    </>
  )
}

export default App
