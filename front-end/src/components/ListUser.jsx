import { useEffect, useState } from "react";
import userApi from "../api/user";
import { UserCircle, CircleNotch } from "@phosphor-icons/react";
import { toast } from "react-toastify";

function ListUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const handleGetData = async () => {
    const response = await userApi.getAll();
    if (response.type === "success") {
      if (response.data?.errCode === 0) {
        setUsers(response.data?.data);
      } else {
        toast.error("Something went wrong, please try again later!");
      }
    } else {
      toast.error("Something went wrong, please try again later!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <div className="flex flex-col gap-y-2 min-h-full">
      {isLoading ? (
        <CircleNotch
          size={32}
          weight="bold"
          className="text-primary-1 m-auto animate-spin"
        />
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-x-2 w-full p-2 bg-transparent hover:bg-primary-3 rounded-lg cursor-pointer duration-200"
          >
            <div className="relative aspect-square">
              <UserCircle size={52} weight="bold" />
              <div className="w-2 h-2 aspect-square rounded-full bg-green-500 absolute bottom-1 right-1"></div>
            </div>
            <div>
              <p className="text-xl">{user.userName}</p>
              <p className="text-sm font-light text-gray-500">
                ({user.firstName} {user.lastName})
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListUser;
