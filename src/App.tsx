import React, { useEffect, useState } from 'react'
import { PromoScreen } from './pages/PromoScreen'
import { RegisterScreen } from './pages/RegisterScreen'
import { FinallyScreen } from './pages/FinallyScreen'

function App() {
  const [screenName, setScreenName] = useState<
    'promo' | 'register' | 'finally' | ''
  >('')

  useEffect(() => {
    const currentPlayerTime = 0
    localStorage.setItem('videoTime', currentPlayerTime.toString())
    setScreenName('promo')
  }, [])

  return (
    <div className="App">
      {screenName === 'promo' && <PromoScreen setScreenName={setScreenName} />}
      {screenName === 'register' && (
        <RegisterScreen setScreenName={setScreenName} />
      )}
      {screenName === 'finally' && (
        <FinallyScreen setScreenName={setScreenName} />
      )}
    </div>
  )
}

export default App
