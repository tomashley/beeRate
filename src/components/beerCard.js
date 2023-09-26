import React from "react";

function BeerCard({title, description, image, rating}) {
    return (
        <div className="bg-yellow-200 border-2 border-yellow-300 rounded-lg p-4 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="relative mb-4">
          <img
            src={image}
            alt={title}
            className="w-full rounded-lg border-2 border-yellow-400"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">{title}</h2>
          <p className="text-yellow-600">{description}</p>
        <hr className="my-2 border-yellow-300" />
        <div className="flex justify-between">
            <p className="text-yellow-600">Rating: {rating}</p>
        </div>
        </div>
      </div>
    );
}

export default BeerCard;