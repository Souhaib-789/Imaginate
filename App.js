import React from 'react'
import AppNavigation from './src/navigations'
import Store from './src/redux/Store'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
      <AppNavigation />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App

