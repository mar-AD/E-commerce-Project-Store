import React, { useEffect } from 'react'
import './About.css'
import { useLocation } from 'react-router-dom';
export default function About() {
  const location = useLocation()

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="about-us-container">
      <span>Welcome to OldyGoldyHouse</span>
      <i>Where Vintage Meets Value</i>

      <div className="about-us-content center-justify">
        <p>
          Immerse yourself in the timeless allure of OldyGoldyHouse, where we celebrate the elegance of the VintageEra.
          As fervent enthusiasts of bygone epochs, we've cultivated a sanctuary for vintage lovers and aficionados of antique treasures.
          Discover a curated online store that unveils an exquisite array of vintage furniture, decor, collectibles, artifacts, fashion, accessories, books, and more.
        </p>
        <p>
          Founded by a visionary curator with an eye for the extraordinary, Oldy Goldy House is dedicated to delivering a distinctive and curated shopping experience.
          Our founder shares a profound appreciation for the artistry and craftsmanship of days gone by.
        </p>
        <p>
          Our commitment to quality resonates in our artisan-based workrooms, where we employ time-honored techniques predating the machine age.
          We take pride in handcrafting specialties such as meticulously carved vintage mahogany, intricate inlays of exotic wood veneers, and the use of lost-wax cast metal mounts for decorative objects.
          Additionally, we revel in the art of traditional vegetable-tanned and hand-tooled leather.
        </p>
        <p>
          Drawing inspiration from the aesthetic richness of the 18th, 19th, 20th, and 21st centuries
          Together, we ensure that each item in our collection tells a unique story of craftsmanship and style.
        </p>
        <p>
          Welcome to Oldy Goldy House, where we invite you to explore an extensive range of vintage collections.
          Embark on a journey to discover the perfect blend of history and value as you adorn your home with pieces that resonate with the elegance of the past.
          Create a timeless ambiance that is uniquely yours, as the charm of vintage finds its place in your modern world.
        </p>
      </div>
    </div>
  );

}
