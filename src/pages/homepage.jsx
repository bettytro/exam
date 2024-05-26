import React, { useEffect, useState } from "react";
import MostRecent from "../components/mostrecent";
import { getVenues } from "../helpers/apidata";
import ExploreGrid from "../components/exploregrid";
import Newsletter from "../components/newsletter";
import { Helmet } from "react-helmet";
function HomePage() {
  const [recent, setRecent] = useState([]);
  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getVenues(1).then((data) => {
      setRecent(data.data.slice(0, 3));
      setGrid(data.data.slice(3,38));
      setLoading(false);
    });
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <>
    <Helmet>
      <title>Holidaze - the spot for your venues</title>
      <meta name="description" content="Find the perfect listing for you, right here on holidaze" />
    </Helmet>
    <section className="bg-primary text-sec">
      <h1 className="sr-only">Holidaze - the spot for your venues</h1>
      <div className="max-w-[1600px] mx-auto p-8 py-32">
        <h2 className="text-6xl font-black text-center">Finally, we have gathered all the venues in one spot<span className="text-[#dcbba9]">.</span></h2>
        <p className="text-2xl text-center mt-4">Find the perfect listing for you, right here on holidaze</p>
      </div>
    </section>
    <MostRecent listings={recent} />
    <ExploreGrid griddata={grid} />
    <Newsletter />
    </>
  );
}

export default HomePage;
