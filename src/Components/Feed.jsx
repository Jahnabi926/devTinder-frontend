import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import ErrorToast from "./ErrorToast";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const getFeed = async () => {
    try {
      if (feed) return;

      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log("Feed - ", res.data);
    } catch (error) {
      setError(
        error?.response?.data || "Something went wrong. Please try again.",
      );
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      {feed && (
        <div className="flex justify-center my-10">
          {error && <ErrorToast error={error} />}

          <UserCard user={feed[1]} />
        </div>
      )}
    </>
  );
};

export default Feed;
