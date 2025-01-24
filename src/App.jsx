import React from 'react'
import Appnavbar from './components/header/Appnavbar'
import CategoryBar from './components/sidebar/CategoryBar'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Products from './components/sidebar/Products'
export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div><Appnavbar />
        <div className='container'>
          <div className='row mt-2'>
            <div className='col-md-3'>
              <CategoryBar />
            </div>
            <div className='col-md-9'>
              <Products />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  )
}
