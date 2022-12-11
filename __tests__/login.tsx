import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '@/pages/index'
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux'
import { store } from '../store'

describe('Home', () => {
  const HomeComponent = <Provider store={store}>
                          <SessionProvider>
                            <Home />
                          </SessionProvider>
                        </Provider>

  it('renders a heading', () => {
    render(HomeComponent)

    let result = screen.getByText(/sign in/i);

    expect(result).toBeInTheDocument()
  })

  it('click on login btn', async () => {
    render(HomeComponent);

    const elem = screen.getByTestId('signin-btn')
    await userEvent.click(elem);

    expect(elem).toBeInTheDOM()
  })
})