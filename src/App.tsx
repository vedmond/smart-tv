import React, { useState } from 'react'
import { PromoScreen } from './pages/PromoScreen'
import { RegisterScreen } from './pages/RegisterScreen'

function App() {
  const [playerTime, setPlayerTime] = useState<number>(0)
  const [screenName, setScreenName] = useState<
    'promo' | 'register' | 'finally'
  >('register')
  return (
    <div className="App">
      {screenName === 'promo' && (
        <PromoScreen
          setScreenName={setScreenName}
          setPlayerTime={setPlayerTime}
          playerTime={playerTime}
        />
      )}
      {screenName === 'register' && (
        <RegisterScreen
          setScreenName={setScreenName}
          setPlayerTime={setPlayerTime}
        />
      )}
    </div>
  )
}

export default App
