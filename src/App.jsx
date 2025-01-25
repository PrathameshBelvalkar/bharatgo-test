import React from 'react'
import Appnavbar from './components/header/Appnavbar'
import CategoryBar from './components/sidebar/CategoryBar'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import Products from './components/sidebar/Products'
export default function App() {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div><Appnavbar />
          <div className='container'>
            <div className='row mt-2'>
              <div className='col-md-3'>
                <CategoryBar className="hidesm" />
              </div>
              <div className='col-md-9'>
                <Products />
              </div>
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </Provider>
  )
}
