import React, { useEffect, useState } from "react";
import BeerCard from "./beerCard";
import supabase from "../supabase";


function BeerCardList() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchCards() {
            try {
                const { data, error } = await supabase.from('beers').select('*');
                if(error) {
                    console.error('Error fetching data:', error.message)
                } else {
                    setCards(data || []);
                    console.log("got cards:", data)
                }
            } catch (error) {
                console.error('Error fetching data:', error.message)
            }
        }

        fetchCards();
    }, []);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cards.map((card, index) => (
                <div key={index} className="w-full">
                <BeerCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                />
                </div>
            ))}
        </div>
    )
};

export default BeerCardList;