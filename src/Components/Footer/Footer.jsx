import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import image from "../../Assets/logoo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
  const handleMapClick = () => {
    const coordinates = "33.571789, -7.647860";
    const mapUrl = `https://www.google.com/maps/place/${coordinates}`;
    window.open(mapUrl, "_blank");
  };
  const Year = ()=>{
    return new Date().getFullYear()
  }
  return (
    <div className="footery">
      <div>
        <svg
          className="wavesfooter"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallaxfooter">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(89, 5, 5,0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(89, 5, 5,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(89, 5, 5,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#590404" />
          </g>
        </svg>
      </div>
      <footer className="footer-distributed">
        <div className="footer-left">
          <Link to="/">
            <img src={image} alt="" />
          </Link>

          <p className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/Shop">Shop</Link>
            <Link to="/About">About</Link>
            <Link to="/Terms">Terms</Link>
            <Link to="/Contact">Contact</Link>
          </p>

          <p className="footer-company-name">Arkx © 2023</p>
        </div>

        <div className="footer-center">
          <div>
            <LocationOnIcon className="footer-icon" />
            <p>
            <span
              style={{ cursor: "pointer" }}
              onClick={handleMapClick}
              title="Click to see where on the map"
              className="tooltip"
            >
              Boulevard Ghandi, Rond Point Oulmes
            </span>{" "}

              Casablanca 20026
            </p>
          </div>

          <div>
            <CallIcon className="footer-icon" />
            <a
              href="https://wa.me/212621305151"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>+212.06.21.30.51.51</p>
            </a>
          </div>

          <div>
            <EmailIcon className="footer-icon" />
            <p>
              <a href="mailto:oldygoldyhouse@gmail.com">
                oldygoldyhouse@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            At OldyGoldyHouse, we don't just run a business; we curate an
            experience, celebrating timeless elegance and the allure of vintage.
          </p>

          <div className="footer-icons">
            <a
              href="https://www.facebook.com/ARKxacademy/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <FacebookIcon
                className="social-icons"
                style={{ fontSize: "40px" }}
              />
            </a>
            <a
              href="https://twitter.com/your-twitter-account"
              target="_blank"
              style={{ color: "white" }}
              rel="noopener noreferrer"
            >
              <TwitterIcon
                className="social-icons"
                style={{ fontSize: "40px" }}
              />
            </a>
            <a
              href="https://www.instagram.com/your-instagram-account"
              target="_blank"
              style={{ color: "white" }}
              rel="noopener noreferrer"
            >
              <InstagramIcon
                className="social-icons"
                style={{ fontSize: "40px" }}
              />
            </a>
            <a
              href="https://t.me/your-telegram-channel"
              target="_blank"
              style={{ color: "white" }}
              rel="noopener noreferrer"
            >
              <TelegramIcon
                className="social-icons"
                style={{ fontSize: "40px" }}
              />
            </a>
          </div>
        </div>
      </footer>

      <div className="copyrights">
        <p>&copy; {Year()} Your Company Name. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
