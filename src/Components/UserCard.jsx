const UserCard = ({ user, showActions = true }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm flex justify-center items-center">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p className="grow-0">{age + " , " + gender}</p>}
        <p className="grow-0">{about}</p>
        {showActions && (
          <div className="card-actions justify-center my-5">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default UserCard;
