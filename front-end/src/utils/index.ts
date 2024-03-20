import { User } from "@/types";
import { ETypeChat } from "@/types/enum";

export const findGuestUsers = (
  userId: string,
  users: User[],
  type: ETypeChat,
): User | User[] => {
  switch (type) {
    case ETypeChat.SINGLE:
      return users.find((user) => user._id !== userId) as User;

    case ETypeChat.GROUP:
      return users.filter((user) => user._id !== userId) as User[];
  }
};
