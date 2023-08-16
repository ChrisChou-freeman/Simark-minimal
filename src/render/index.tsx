import * as ReactDomClient from 'react-dom/client'
import { JSX } from 'react'

import '../resource/index.css'
import WindowMain from './window'

function TitleBar(): JSX.Element {
  return (
    <div className="titlebar"></div>
  );
}

function App(): JSX.Element {
  return (
    <div className='text-lg font-bold w-full h-full'>
      <TitleBar />
      <WindowMain />
    </div>
  )
}

function render() {
  const container = document.getElementById('root')
  if (container === null) { throw Error('app id html element not found!') }
  const root = ReactDomClient.createRoot(container)
  root.render(
    <App />
  )
}

render()
