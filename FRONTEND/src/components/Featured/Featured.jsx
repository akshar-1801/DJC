import React from "react";
import { useRef, useEffect } from "react";
import "./featured.css";
import img1 from "../../assets/product_images/image1.png";
import img2 from "../../assets/product_images/image2.png";
import img3 from "../../assets/product_images/image3.png";
import img4 from "../../assets/product_images/image4.png";
import img5 from "../../assets/product_images/image5.png";
import img6 from "../../assets/product_images/image6.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Featured() {
  const carouselRef = useRef(null);
  const listRef = useRef(null);

  const showSlider = (type) => {
    const carousel = carouselRef.current;
    const list = listRef.current;
    const items = Array.from(list.children);

    carousel.classList.remove("next", "prev");

    if (type === "next") {
      list.appendChild(items[0]);
      carousel.classList.add("next");
    } else {
      list.prepend(items[items.length - 1]);
      carousel.classList.add("prev");
    }
  };

  const handleSeeMoreClick = (e) => {
    const carousel = carouselRef.current;
    carousel.classList.remove("next", "prev");
    carousel.classList.add("showDetail");
  };

  const handleBackClick = () => {
    const carousel = carouselRef.current;
    carousel.classList.remove("showDetail");
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    const list = listRef.current;
    const seeMoreButtons = list.querySelectorAll(".seeMore");

    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
    //   const backButton = document.getElementById('back');

    let unAcceppClick;

    const handleNextClick = () => {
      nextButton.style.pointerEvents = "none";
      prevButton.style.pointerEvents = "none";
      showSlider("next");
      clearTimeout(unAcceppClick);
      unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = "auto";
        prevButton.style.pointerEvents = "auto";
      }, 2000);
    };

    const handlePrevClick = () => {
      nextButton.style.pointerEvents = "none";
      prevButton.style.pointerEvents = "none";
      showSlider("prev");
      clearTimeout(unAcceppClick);
      unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = "auto";
        prevButton.style.pointerEvents = "auto";
      }, 2000);
    };

    nextButton.onclick = handleNextClick;
    prevButton.onclick = handlePrevClick;
    seeMoreButtons.forEach((button) => {
      button.onclick = handleSeeMoreClick;
    });
    //   backButton.onclick = handleBackClick;

    return () => {
      nextButton.onclick = null;
      prevButton.onclick = null;
      seeMoreButtons.forEach((button) => {
        button.onclick = null;
      });
      // backButton.onclick = null;
    };
  }, []);

  return (
    <section id="featured">
      <div className="carousel" ref={carouselRef}>
        <h1 class="featured-title">Featured Products</h1>
        <div class="list" ref={listRef}>
          <div class="item">
            <img src={img1} />
            <div class="introduce">
              <div class="topic">Product 1</div>
              <div class="des">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, laborum cumque dignissimos quidem atque et eligendi
                aperiam voluptates beatae maxime.
              </div>
              <button class="seeMore" disabled>
                SEE MORE
              </button>
            </div>
            <div class="detail">
              <div class="title">Product 1 GHTK</div>
              <div class="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
                reiciendis suscipit nobis nulla animi, modi explicabo quod
                corrupti impedit illo, accusantium in eaque nam quia adipisci
                aut distinctio porro eligendi. Reprehenderit nostrum
                consequuntur ea! Accusamus architecto dolores modi ducimus
                facilis quas voluptatibus! Tempora ratione accusantium magnam
                nulla tenetur autem beatae.
              </div>
              <div class="specifications">
                <div>
                  <p>Used Time</p>
                  <p>6 hours</p>
                </div>
                <div>
                  <p>Charging port</p>
                  <p>Type-C</p>
                </div>
                <div>
                  <p>Compatible</p>
                  <p>Android</p>
                </div>
                <div>
                  <p>Bluetooth</p>
                  <p>5.3</p>
                </div>
                <div>
                  <p>Controlled</p>
                  <p>Touch</p>
                </div>
              </div>
              <div class="checkout">
                <button>ADD TO CART</button>
                <button>CHECKOUT</button>
              </div>
            </div>
          </div>

          <div class="item">
            <img src={img2} />
            <div class="introduce">
              <div class="topic">Product 2</div>
              <div class="des">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, laborum cumque dignissimos quidem atque et eligendi
                aperiam voluptates beatae maxime.
              </div>
              <button class="seeMore" disabled>
                SEE MORE
              </button>
            </div>
            <div class="detail">
              <div class="title">Product 2 GHTK</div>
              <div class="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
                reiciendis suscipit nobis nulla animi, modi explicabo quod
                corrupti impedit illo, accusantium in eaque nam quia adipisci
                aut distinctio porro eligendi. Reprehenderit nostrum
                consequuntur ea! Accusamus architecto dolores modi ducimus
                facilis quas voluptatibus! Tempora ratione accusantium magnam
                nulla tenetur autem beatae.
              </div>
              <div class="specifications">
                <div>
                  <p>Used Time</p>
                  <p>6 hours</p>
                </div>
                <div>
                  <p>Charging port</p>
                  <p>Type-C</p>
                </div>
                <div>
                  <p>Compatible</p>
                  <p>Android</p>
                </div>
                <div>
                  <p>Bluetooth</p>
                  <p>5.3</p>
                </div>
                <div>
                  <p>Controlled</p>
                  <p>Touch</p>
                </div>
              </div>
              <div class="checkout">
                <button>ADD TO CART</button>
                <button>CHECKOUT</button>
              </div>
            </div>
          </div>

          <div class="item">
            <img src={img3} />
            <div class="introduce">
              <div class="topic">Product 3</div>
              <div class="des">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, laborum cumque dignissimos quidem atque et eligendi
                aperiam voluptates beatae maxime.
              </div>
              <button class="seeMore" disabled>
                SEE MORE
              </button>
            </div>
            <div class="detail">
              <div class="title">Product 3 GHTK</div>
              <div class="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
                reiciendis suscipit nobis nulla animi, modi explicabo quod
                corrupti impedit illo, accusantium in eaque nam quia adipisci
                aut distinctio porro eligendi. Reprehenderit nostrum
                consequuntur ea! Accusamus architecto dolores modi ducimus
                facilis quas voluptatibus! Tempora ratione accusantium magnam
                nulla tenetur autem beatae.
              </div>
              <div class="specifications">
                <div>
                  <p>Used Time</p>
                  <p>6 hours</p>
                </div>
                <div>
                  <p>Charging port</p>
                  <p>Type-C</p>
                </div>
                <div>
                  <p>Compatible</p>
                  <p>Android</p>
                </div>
                <div>
                  <p>Bluetooth</p>
                  <p>5.3</p>
                </div>
                <div>
                  <p>Controlled</p>
                  <p>Touch</p>
                </div>
              </div>
              <div class="checkout">
                <button>ADD TO CART</button>
                <button>CHECKOUT</button>
              </div>
            </div>
          </div>

          <div class="item">
            <img src={img4} />
            <div class="introduce">
              <div class="topic">Product 4</div>
              <div class="des">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, laborum cumque dignissimos quidem atque et eligendi
                aperiam voluptates beatae maxime.
              </div>
              <button class="seeMore" disabled>
                SEE MORE
              </button>
            </div>
            <div class="detail">
              <div class="title">Product 4 GHTK</div>
              <div class="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
                reiciendis suscipit nobis nulla animi, modi explicabo quod
                corrupti impedit illo, accusantium in eaque nam quia adipisci
                aut distinctio porro eligendi. Reprehenderit nostrum
                consequuntur ea! Accusamus architecto dolores modi ducimus
                facilis quas voluptatibus! Tempora ratione accusantium magnam
                nulla tenetur autem beatae.
              </div>
              <div class="specifications">
                <div>
                  <p>Used Time</p>
                  <p>6 hours</p>
                </div>
                <div>
                  <p>Charging port</p>
                  <p>Type-C</p>
                </div>
                <div>
                  <p>Compatible</p>
                  <p>Android</p>
                </div>
                <div>
                  <p>Bluetooth</p>
                  <p>5.3</p>
                </div>
                <div>
                  <p>Controlled</p>
                  <p>Touch</p>
                </div>
              </div>
              <div class="checkout">
                <button>ADD TO CART</button>
                <button>CHECKOUT</button>
              </div>
            </div>
          </div>

          <div class="item">
            <img src={img5} />
            <div class="introduce">
              <div class="topic">Product 5</div>
              <div class="des">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, laborum cumque dignissimos quidem atque et eligendi
                aperiam voluptates beatae maxime.
              </div>
              <button class="seeMore" disabled>
                SEE MORE
              </button>
            </div>
            <div class="detail">
              <div class="title">Product 5 GHTK</div>
              <div class="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
                reiciendis suscipit nobis nulla animi, modi explicabo quod
                corrupti impedit illo, accusantium in eaque nam quia adipisci
                aut distinctio porro eligendi. Reprehenderit nostrum
                consequuntur ea! Accusamus architecto dolores modi ducimus
                facilis quas voluptatibus! Tempora ratione accusantium magnam
                nulla tenetur autem beatae.
              </div>
              <div class="specifications">
                <div>
                  <p>Used Time</p>
                  <p>6 hours</p>
                </div>
                <div>
                  <p>Charging port</p>
                  <p>Type-C</p>
                </div>
                <div>
                  <p>Compatible</p>
                  <p>Android</p>
                </div>
                <div>
                  <p>Bluetooth</p>
                  <p>5.3</p>
                </div>
                <div>
                  <p>Controlled</p>
                  <p>Touch</p>
                </div>
              </div>
              <div class="checkout">
                <button>ADD TO CART</button>
                <button>CHECKOUT</button>
              </div>
            </div>
          </div>

          <div class="item">
            <img src={img6} />
            <div class="introduce">
              <div class="topic">Product 6</div>
              <div class="des">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, laborum cumque dignissimos quidem atque et eligendi
                aperiam voluptates beatae maxime.
              </div>
              <button class="seeMore" disabled>
                SEE MORE
              </button>
            </div>
            <div class="detail">
              <div class="title">Product 6 GHTK</div>
              <div class="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
                reiciendis suscipit nobis nulla animi, modi explicabo quod
                corrupti impedit illo, accusantium in eaque nam quia adipisci
                aut distinctio porro eligendi. Reprehenderit nostrum
                consequuntur ea! Accusamus architecto dolores modi ducimus
                facilis quas voluptatibus! Tempora ratione accusantium magnam
                nulla tenetur autem beatae.
              </div>
              <div class="specifications">
                <div>
                  <p>Used Time</p>
                  <p>6 hours</p>
                </div>
                <div>
                  <p>Charging port</p>
                  <p>Type-C</p>
                </div>
                <div>
                  <p>Compatible</p>
                  <p>Android</p>
                </div>
                <div>
                  <p>Bluetooth</p>
                  <p>5.3</p>
                </div>
                <div>
                  <p>Controlled</p>
                  <p>Touch</p>
                </div>
              </div>
              <div class="checkout">
                <button>ADD TO CART</button>
                <button>CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
        <div class="arrows">
          <button id="prev">
            <FaChevronLeft />
          </button>
          <button id="next">
            <FaChevronRight />
          </button>
          {/* <button id="back">SEE ALL</button> */}
        </div>
      </div>
    </section>
  );
}

export default Featured;
