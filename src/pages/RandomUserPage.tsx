import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
export default function RandomUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    const cleanUsers = users.map((user: any) => cleanUser(user)); //Clean the user data
    setUsers(cleanUsers); // Update the state with cleaned user data
    localStorage.setItem("users", JSON.stringify(cleanUsers));
     //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/CleanUser
    //Then update state with function : setUsers(...)
  };

  useEffect(() => {
    const savedAmount = localStorage.getItem("genAmount");
    if (savedAmount) {
      setGenAmount(Number(savedAmount));
    }
  }, []);

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          value={genAmount}
          onChange={(event: any) => {
            const value = Number(event.target.value);
            setGenAmount(value);
            localStorage.setItem("genAmount", String(value));
          }}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>

      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users.length > 0 &&
        !isLoading &&
        users.map((user) => (
          <UserCard
            key={user.email} // ใช้ email เป็น key ตามคำแนะนำ
            name={user.name}
            email={user.email}
            address={user.address}
            imgUrl={user.imgUrl}
          />
        ))}

      {users.length === 0 && !isLoading && (
        <p className="display-6 text-center fst-italic my-4">No User</p>
      )}
    </div>
  );
}
