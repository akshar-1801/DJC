import "./home_page.module.css";
import Home from "../../components/Home/Home";
import Service from "../../components/Servicee/Service";
import Featured from "../../components/Featured/Featured";
import Category from "../../components/Category/Category";
import Review from "../../components/Review/Review";
import AboutUs from "../../components/About/About";

function Home_Page() {
  return (
    <>
      <Home />
      <Service />
      <Featured />
      <Category />
      <AboutUs />
      <Review />
    </>
  );
}

export default Home_Page;
