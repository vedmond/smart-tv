import { useEffect, useState } from 'react'
import { PromoScreen } from './pages/PromoScreen'
import { RegisterScreen } from './pages/RegisterScreen'
import { FinallyScreen } from './pages/FinallyScreen'

function App() {
  const [isTimePlayerToggle, setIsTimePlayerToggle] = useState(false)
  const [screenName, setScreenName] = useState<
    'promo' | 'register' | 'finally'
  >('promo')

  useEffect(() => {
    setIsTimePlayerToggle(true)
  }, [])

  return (
    <div className="App">
      {screenName === 'promo' && (
        <PromoScreen
          setScreenName={setScreenName}
          isTimePlayerToggle={isTimePlayerToggle}
        />
      )}
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
