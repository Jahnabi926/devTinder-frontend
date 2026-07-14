import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const { _id } = user;
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      await setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(
        err?.response?.data || "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:my-10">
      <div className="flex justify-center my-10 md:mx-5 md:my-0">
        <div className="card bg-base-300 w-96 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <fieldset className="fieldset">
              <label className="label" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="input"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="lastName">
                Last
              </label>
              <input
                type="text"
                id="lastName"
                className="input"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="age">
                Age
              </label>
              <input
                type="text"
                id="age"
                className="input"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                value={gender}
                className="select"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="photoUrl">
                Photo URL
              </label>
              <input
                type="text"
                id="photoUrl"
                className="input"
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                }}
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="about">
                About
              </label>
              <textarea
                className="textarea"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            {error && <p className="text-red-500">{error}</p>}
            <div className="card-actions justify-center my-5">
              {showToast && (
                <div className="toast toast-top toast-center z-50">
                  <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                  </div>
                </div>
              )}
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ _id, firstName, lastName, age, gender, photoUrl, about }}
        showActions={false}
      />
    </div>
  );
};

export default EditProfile;
