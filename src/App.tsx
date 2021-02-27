import React, { useState } from 'react'
import './App.css'
import { words } from './data/words'

function App() {

  const [inputText, setInputText] =  useState('')

  return (
    <div className="list">
      <p>{words.length}</p>
        <input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} />
        {words.filter(word => word.ruTranslation.includes(inputText) || word.forms.first.includes(inputText)).map(word => <div key={word.forms.first} className="card" style={{color:'red'}}>{word.ruTranslation}</div>)
        }
    </div>
  )
}

export default App
