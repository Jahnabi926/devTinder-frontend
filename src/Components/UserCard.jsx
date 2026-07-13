import { useState } from "react";
import ErrorToast from "./ErrorToast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  if (!user) return null;
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      setError(
        err?.response?.data || "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm flex justify-center items-center">
      {error && <ErrorToast error={error} />}

      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p className="grow-0">{age + " , " + gender}</p>}
        <p className="grow-0">{about}</p>
        {showActions && (
          <div className="card-actions justify-center my-5">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default UserCard;
