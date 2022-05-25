import { friendList, messageData } from "./mockData";

export const fetchFriendList = async () => {
  const { data } = await friendList;
  return data;
};

export const fetchMessageData = async (name) => {
  const { data } = await messageData;
  return data[name];
};
