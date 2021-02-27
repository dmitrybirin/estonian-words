import React, { useState } from 'react'
import styled from 'styled-components'
import { CenteredContainer } from './common-styles'
import { words } from './data/words'

const List = styled(CenteredContainer)`
  flex-wrap: wrap;
`

const Card = styled(CenteredContainer)`
  width: 300px;
  height: 100px;
  border: solid black 2px;
`

const Header = () => {
  return <CenteredContainer><h1>Estonian words</h1></CenteredContainer>
}

function App() {

  const [inputText, setInputText] =  useState('')

  return (
    <>
    <Header/>
      <CenteredContainer>
          <p>{words.length}</p>
          <input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} />
      </CenteredContainer>
    <List>
        {words.filter(word => word.ruTranslation.includes(inputText) || word.forms.first.includes(inputText)).map(word => <Card key={word.forms.first} style={{color:'red'}}>{word.ruTranslation}</Card>)
        }
    </List>
    </>
  )
}

export default App
