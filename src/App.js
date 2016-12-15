import Balloon from './Balloon'
import './App.sass'

export default class App {
  static defaults = {
    balloonCount: 50,
    score: 0
  }

  static hot = {
    accept: () => {
      this.render()
    }
  }

  constructor(props = {}) {
    this.props = Object.assign({}, App.defaults, props)
    const { balloonCount } = this.props
    const onPop = this.onPop.bind(this)

    this.props.balloons = Array.apply(null, { length: balloonCount }).map((_, index) => {
      return new Balloon({ index, onPop })
    })
  }

  onPop(index) {
    const { balloons, score } = this.props
    const poppedBalloon = balloons[index]
    if (!poppedBalloon) { return }

    this.removeBalloon(index)
    this.updateScore(poppedBalloon)

    console.log(this.props.score, this.props.balloons.length)
  }

  updateScore(poppedBalloon) {
    const points = 100 - poppedBalloon.props.width
    this.props.score += points
  }

  removeBalloon(index) {
    const { balloons } = this.props
    this.props.balloons = balloons.slice(0, index)
      .concat(balloons.slice(index + 1))
  }

  render() {
    const { balloons } = this.props
    balloons.map((balloon) => {
      balloon.mount()
    })
  }
}
