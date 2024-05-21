import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleLike, removeCard } from "../store/cardsSlice";
import { FaHeart, FaTrashAlt } from "react-icons/fa";

interface CardProps {
  id: string;
  imageUrl: string;
  description: string;
  liked: boolean;
}

const Card: React.FC<CardProps> = ({ id, imageUrl, description, liked }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleLike(id));
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(removeCard(id));
  };

  const handleCardClick = () => {
    navigate(`/card/${id}`);
  };

  return (
    <div
      className="relative bg-white shadow-lg rounded-3xl overflow-hidden p-4 pb-16 cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={imageUrl}
        alt={description}
        className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
      />
      <p className="mt-2 text-lg text-center text-gray-700">{description}</p>
      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center border-t border-gray-200">
        <button
          onClick={handleLike}
          className={`text-2xl ${liked ? "text-red-500" : "text-gray-500"} transition-colors duration-200`}
        >
          <FaHeart />
        </button>
        <button
          onClick={handleRemove}
          className={`text-2xl ${liked ? "text-gray-500 hover:text-red-500 transition-colors duration-200" : "text-gray-300 cursor-default"}`}
          disabled={!liked}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default Card;
