// API
import fetchWebApi from "@/api/fetchWebApi";

// Components
import BreakingNews from "@/components/ui/BreakingNews/BreakingNews";
import Featured from "@/components/sections/Featured/Featured";
import HorizontalList from "@/components/sections/HorizontalList/HorizontalList";
import GridList from "@/components/sections/GridList/GridList";
import GridListSmall from "@/components/sections/GridList/GridListSmall";
import MostPopular from "@/components/sections/MostPopular/MostPopular";
import Divider from "@/components/ui/Divider/Divider";

export default async function Home() {
  const [
    featuredPosts,
    mainList,
    secondList,
    thirdList,
    fourthList,
    trendingPosts
  ] = await Promise.all([
    fetchWebApi.getHomeFeatured(),
    fetchWebApi.getHomeMainList(),
    fetchWebApi.getHomeSecondList(),
    fetchWebApi.getHomeThirdList(),
    fetchWebApi.getHomeFourthList(),
    fetchWebApi.getTendingPosts()
  ]);

  return (
    <>
      <BreakingNews />
      <main className="page__content">
        <div className="wrapper">

          <Featured posts={featuredPosts} />

          <HorizontalList posts={mainList} />

          <Divider />

          <GridList posts={secondList} />

          <Divider />

          <MostPopular posts={trendingPosts} />

          <Divider />

          <Featured posts={thirdList} />

          <GridListSmall posts={fourthList} />
        </div>
      </main>
    </>
  );
}
