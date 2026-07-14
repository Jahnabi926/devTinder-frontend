import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import ErrorToast from "./ErrorToast";

const Requests = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      setError(
        error?.response?.data || "Something went wrong. Please try again.",
      );
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      setError(
        err?.response?.data || "Something went wrong. Please try again.",
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests found !</h1>;

  return (
    <div className="flex flex-col justify-center items-center my-10">
      {error && <ErrorToast error={error} />}

      <h1 className="text-white font-bold text-2xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-full sm:w-3/4 md:w-1/2 items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + " , " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
            <div className="card-actions justify-center my-5">
              <button
                className="btn btn-primary my-5 lg:my-0"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
