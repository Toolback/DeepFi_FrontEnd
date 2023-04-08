import { Footer, Navbar } from '../components/home';
import { About, Explore, RoadMap, GetStarted, Hero, Insights, WhatsNew, World } from '../sections/home';

const Home = () => (
  <div className="bg-primary-black overflow-hidden">
    <Navbar />
    <Hero />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
    </div>
    <div className="relative">
      <WhatsNew />
      <div className="gradient-04 z-0" />
      <GetStarted />
    </div>
    {/* <World /> */}
    <div className="relative">
      {/* <Explore /> */}
      {/* <Insights /> */}
      <div className="gradient-04 z-0" />
      <RoadMap />
    </div>
    <Footer />
  </div>
);

export default Home;
