import React from "react";
import BeerCardList from "./components/beerCardList";
import data from './mock_data/beerCardData.json'

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start p-8">
      <h1 className="text-3xl font-semibold mb-6 text-yellow-800 text-center">
        Beer Rated
      </h1>
        <BeerCardList cards={data} />
    </div>
  );
}

export default App;
