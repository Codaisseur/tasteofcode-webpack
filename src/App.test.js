import chai, { expect } from 'chai'
import App from './App'

describe('App', () => {
  const app = new App()

  it('creates 50 balloons', () => {
    expect(app.props.balloons.length).to.eq(50)
  })

  context('when passing in balloonCount', () => {
    const app = new App({balloonCount: 4})

    it('creates that amount of balloons instead', () => {
      expect(app.props.balloons.length).to.eq(4)
    })
  })
})
