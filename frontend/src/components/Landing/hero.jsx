import { FaLeaf, FaRegFileAlt } from 'react-icons/fa'
import heroImg from 'C:/civikConnect/frontend/src/assets/hero-img.png'

export default function Hero() {
    return (
        <section className="hero-section" id="home">
            <div className="hero-left">
                <div className="hero-pill">
                    <FaLeaf />
                    Together for a Better Tomorrow
                </div>

                <h1 className="hero-title">
                    Together We Can Solve <span>Our Problems</span>
                </h1>

                <p className="hero-subtitle">
                    WeCare connects citizens, NGOs, and authorities to report issues, take action, and build a better society.
                </p>

                <button className="left-btn">
                    <FaRegFileAlt />
                    Report an Issue
                </button>
            </div>

            <div className="hero-art">
                <img src={heroImg} alt="Citizens cleaning and planting in a city park" />
            </div>
        </section>
    )
}
