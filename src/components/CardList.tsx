import React from "react";
import { useGetPhotosQuery } from "../utils/api";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleFilter } from "../store/cardsSlice";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const CardList: React.FC = () => {
  const { data, error, isLoading } = useGetPhotosQuery();
  const likedCards = useSelector((state: RootState) => state.cards.likedCards);
  const filter = useSelector((state: RootState) => state.cards.filter);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#3b82f6"} loading={true} />
      </div>
    );
  }

  if (error) return <div>Error loading cards: {JSON.stringify(error)}</div>;

  const filteredData = filter
    ? data.photos.filter((card: any) => likedCards.includes(card.id.toString()))
    : data.photos;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 flex-grow">
        <button
          onClick={() => dispatch(toggleFilter())}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-xl"
        >
          {filter ? "Show All" : "Show Liked"}
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredData.map((card: any) => (
            <Card
              key={card.id}
              id={card.id.toString()}
              imageUrl={card.src.medium}
              description={card.alt || "Image"}
              liked={likedCards.includes(card.id.toString())}
            />
          ))}
        </div>
      </div>
      <footer className="mt-auto p-4">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-gray-800 text-center font-medium ">
            &copy;2024 Artur Kulembetov. All rights reserved.
          </p>
          <ul className="flex gap-2">
            <li>
              <a href="https://github.com/kulembetov">
                <FaGithub />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/kulembetov">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/arturkulembetov">
                <FaTwitter />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default CardList;
