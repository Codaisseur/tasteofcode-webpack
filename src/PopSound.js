import $ from 'jquery'

const preloadPopSound = () => {
  const sound = require('./assets/balloon-pop.mp3')
  const audio = new Audio(sound)
  audio.preload = "auto"
  return audio
}

export default preloadPopSound()
