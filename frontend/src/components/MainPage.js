import React from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import NewIn from './NewIn/NewIn';
import ForYou from './ForYou/ForYou';
import Trending from './Trending/Trending';
import Song from './Song/Song';

const MainPage = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[250px_1fr] h-screen">
      <div className="row-start-1 row-end-2 col-span-2">
        <Navbar />
      </div>
      <div className="row-start-2 row-end-3 col-start-1 col-end-2">
        <Sidebar />
      </div>
      <div className="row-start-2 row-end-3 col-start-2 col-end-3 overflow-y-auto p-4">
        <NewIn />
        <ForYou />
        <Trending />
      </div>
      <div className="row-start-3 row-end-4 col-span-2">
        <Song />
      </div>
    </div>
  );
};

export default MainPage;
