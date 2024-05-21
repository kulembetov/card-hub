import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPhotosQuery } from "../utils/api";

const CardDetails: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const { data } = useGetPhotosQuery();
  const navigate = useNavigate();

  const card = data?.photos.find(
    (photo: any) => photo.id.toString() === cardId
  );

  if (!card) return <div>Card not found</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-xl"
      >
        Back to List
      </button>
      <h1 className="text-2xl mb-4 text-center">{card.alt || "Image"}</h1>
      <img
        src={card.src.medium}
        alt={card.alt || "Image"}
        width={100}
        height={100}
        className="w-64 h-auto rounded-lg ml-auto mr-auto"
      />
    </div>
  );
};

export default CardDetails;
