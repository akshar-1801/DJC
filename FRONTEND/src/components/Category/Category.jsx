import React, { useState, useEffect } from "react";
import "./category.css";
import bgimage1 from "../../assets/product_images/bgimage1.png";
import bgimage2 from "../../assets/product_images/bgimage2.jpg";
import bgimage3 from "../../assets/product_images/bgimage3.png";
import bgimage4 from "../../assets/product_images/bgimage4.png";
import bgimage5 from "../../assets/product_images/bgimage5.jpg";
import thumb1 from "../../assets/product_images/thumb1.jpg";
import thumb2 from "../../assets/product_images/thumb2.jpg";
import thumb3 from "../../assets/product_images/thumb3.png";
import thumb4 from "../../assets/product_images/thumb4.jpg";
import thumb5 from "../../assets/product_images/thumb5.jpg";

function Category() {
  const items = [
    {
      bgImage: bgimage1,
      thumb: thumb1,
      title: "Rings",
      description:
        "Explore our exquisite collection of rings, perfect for every occasion—from stunning engagement rings to elegant fashion rings.",
    },
    {
      bgImage: bgimage2,
      thumb: thumb2,
      title: "Necklaces",
      description:
        "Discover a variety of necklaces that combine style and elegance. Our necklaces are crafted to complement any outfit.",
    },
    {
      bgImage: bgimage3,
      thumb: thumb3,
      title: "Earrings",
      description:
        "Our earrings collection features designs ranging from classic studs to bold statement pieces, suitable for every taste.",
    },
    {
      bgImage: bgimage4,
      thumb: thumb4,
      title: "Bracelets",
      description:
        "Browse our unique bracelets that can be worn alone or stacked for a trendy look. Each piece is a statement of style.",
    },
    {
      bgImage: bgimage5,
      thumb: thumb5,
      title: "Pendants",
      description:
        "Our pendants are crafted to add a touch of elegance to your neckline. Explore our custom options to create your unique piece.",
    },
  ];

  const [itemActive, setItemActive] = useState(0);

  const showSlider = (index) => {
    setItemActive(index);
  };

  useEffect(() => {
    const handleThumbnailClick = (index) => {
      showSlider(index);
    };

    const thumbnails = document.querySelectorAll(".thumbnail .item");
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => handleThumbnailClick(index));
    });

    return () => {
      thumbnails.forEach((thumbnail) => {
        thumbnail.removeEventListener("click", handleThumbnailClick);
      });
    };
  }, []);

  return (
    <section id="category">
      <div className="slider">
        <div className="list">
          {items.map((item, index) => (
            <div
              key={index}
              className={`item ${index === itemActive ? "active" : ""}`}
            >
              <img src={item.bgImage} alt={item.title} />
              <div className="content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button className="button-74" role="button">
                  EXPLORE
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="thumbnail">
          {items.map((item, index) => (
            <div
              key={index}
              className={`item ${index === itemActive ? "active" : ""}`}
            >
              <img src={item.thumb} alt={item.title} />
              <div className="content">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Category;
