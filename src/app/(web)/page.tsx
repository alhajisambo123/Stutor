import FeaturedCourse from "@/components/FeaturedCourse/FeaturedCourse";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import PageSearch from "@/components/PageSearch/PageSearch";
import { getFeaturedCourse } from "@/libs/apis";

const Home = async () => {
  const featuredCourse = await getFeaturedCourse();

  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedCourse featuredCourse={featuredCourse} />
      <Gallery />
    </>
  );
};

export default Home;
