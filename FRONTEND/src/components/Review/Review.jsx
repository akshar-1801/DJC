import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./review.css";
import { EffectCoverflow } from "swiper/modules";
import quote from "../../assets/quote.png";
import rev1 from "../../assets/person.jpg";

const testimonials = [
  {
    quote:
      "The gemstone collection here is exquisite. The team was very helpful in guiding me to find the perfect piece for my anniversary.",
    name: "Emma Johnson",
    title: "Gemstone Lover",
    // image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    image: rev1,
  },
  {
    quote:
      "I loved the customized options they provided. I was able to create the perfect diamond ring for my wedding, and it turned out stunning!",
    name: "Michael Smith",
    title: "Satisfied Customer",
    // image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    image: rev1,
  },
  {
    quote:
      "Their attention to detail and craftsmanship is impeccable. I always find something unique and beautiful whenever I visit their store.",
    name: "Sophia Brown",
    title: "Jewelry Enthusiast",
    // image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    image: rev1,
  },
  {
    quote:
      "I brought a design idea with me, and they made it a reality. The custom engagement ring exceeded all my expectations!",
    name: "James Williams",
    title: "Happy Fiancé",
    // image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    image: rev1,
  },
  {
    quote:
      "From start to finish, the experience was top-notch. They truly care about creating the best experience and products for their customers.",
    name: "Olivia Davis",
    title: "Loyal Client",
    // image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    image: rev1,
  },
  {
    quote:
      "The quality of the diamonds is unmatched. I appreciate the transparency and personalized care they offer.",
    name: "William Taylor",
    title: "Diamond Collector",
    // image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    image: rev1,
  },
  {
    quote:
      "If you want something special and one-of-a-kind, this is the place to go. They helped me create a piece with sentimental value.",
    name: "Charlotte Wilson",
    title: "Sentimental Shopper",
    // image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    image: rev1,
  },
];

export default function Review() {
  return (
    <section id="review">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonialBox">
              <img src={quote} alt="quote" className="quote" />
              <div className="content">
                <p>{testimonial.quote}</p>
                <div className="details">
                  <div className="imgBx">
                    <img src={testimonial.image} alt="user" />
                  </div>
                  <h3>
                    {testimonial.name}
                    <br />
                    <span>{testimonial.title}</span>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
