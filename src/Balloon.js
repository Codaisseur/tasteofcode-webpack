import $ from 'jquery'
import './Balloon.sass'
import PopSound from './PopSound'

export default class Balloon {
  static colors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf'
  ]

  constructor(props = {}) {
    this.props = props
    this.id = `balloon-${props.index || 0}`
    this.setWidth()
    this.setHeight()
    this.setColor()
    this.update(props)
    return this
  }

  mount() {
    $(this.domNode).appendTo('body')
    this.componentDidMount()

    return this
  }

  componentDidMount() {
    const { width } = this.props
    const xdiff = Math.floor(Math.random() * 100)
    const container = $(`#${this.id}`)

    container.bind('click', this.pop.bind(this))

    container.animate({
      bottom: '100%',
      left: xdiff + '%'
    }, (8000 - width * 10))
  }

  unmount() {
    const node = $(`#${this.id}`)
    if (node.length > 0) {
      node.remove()
    }
    return this
  }

  update(newProps) {
    this.props = Object.assign({}, this.props, newProps)
    this.domNode = this.render()
  }

  getWidth() {
    return this.props.width || this.setWidth()
  }

  setWidth() {
    this.props.width = Math.max(20, Math.floor(Math.random() * 90) + 1)
    return this.props.width
  }

  getHeight() {
    return this.props.height || this.setHeight()
  }

  setHeight() {
    this.props.height = 1.2 * this.getWidth()
    return this.props.height
  }

  getColor() {
    return this.props.color || this.setColor()
  }

  setColor() {
    this.props.color = Balloon.colors[Math.floor(Math.random() * Balloon.colors.length)]
    return this.props.color
  }

  pop() {
    const { index } = this.props
    PopSound.play()
    this.unmount()
    this.props.onPop(index)
  }

  render() {
    const { color, height, width } = this.props

    return(`
      <div class="balloon" id="${this.id}"
        style="left: 50%; bottom: 0">
        <div class="bubble"
          style="background-color: ${color};
            height: ${height}px;
            width: ${width}px;
            border-radius: ${width}px / ${height}px"/>
        <div class="string"
          style="margin-left: ${0.5 * width}px; height: ${0.5 * height}px"/>
      </div>
    `)
  }
}
