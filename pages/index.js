import { Footer, Navbar } from '../components/home';
import { About, Explore, RoadMap, GetStarted, Hero, Insights, WhatsNew, World } from '../sections/home';
import HomePage from '../sections/home/HomePage';

const Home = () => (
  <section className="w-full h-screen bg-primary-black ">
  {/* // <div className="bg-cover bg-center" style={{backgroundImage: `url(/HomeDeposit.png)`}}> */}

  <img
      src="/HomeDeposit.png"
      alt="hero_cover"
      // className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
      className="absolute object-cover h-full w-full opacity-50"

    />
    <Navbar />
    {/* <Hero />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
    </div>
    <div className="relative">
      <WhatsNew />
      <div className="gradient-04 z-0" />
      <GetStarted />
    </div>
    <div className="relative">
      //<Explore />
      //<Insights />
      <div className="gradient-04 z-0" />
      <RoadMap />
    </div> */}
    <HomePage />
    {/* <Footer /> */}
  </section>
);

export default Home;
