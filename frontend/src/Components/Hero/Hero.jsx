import './Hero.css'
import Hand_icon from '../Asserts/hand_icon.png'
import Arrow_icon from '../Asserts/arrow.png'
import Hero_img from '../Asserts/hero_image.png'

const Hero = ({ onShopClick }) => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <div className="hero-hand-icon">
          <p>Hey You</p>
          <img src={Hand_icon} alt="hand" className="wave-hand" />
        </div>
        <h1 className="hero-title">Ready to <span>Wear Confidence?</span></h1>
        <div className="hero-latest-btn" onClick={onShopClick}>
          <div>Shop Latest Collection</div>
          <img src={Arrow_icon} alt="arrow" />
        </div>
      </div>

      <div className="hero-right">
        <img src={Hero_img} alt="fashion hero" />
      </div>
    </div>
  )
}

export default Hero
