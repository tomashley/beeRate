import React from "react";
import BeerCard from "./beerCard";

function BeerCardList({ cards }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cards.map((card, index) => (
                <BeerCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                />
            ))}
        </div>
    )
};

export default BeerCardList;