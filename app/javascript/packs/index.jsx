// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from '../page/App'
import { BrowserRouter, Route } from 'react-router-dom'
import '../page/i18n'
import { Provider } from 'react-redux'
import store from '../page/store'
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter >
        <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store} >
          <Route path='/' component={App}/>
      </Provider>
        </Suspense>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div')),
  )
})
