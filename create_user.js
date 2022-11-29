import bcrypt from "bcrypt";
import usersDB from "./db/usersDB.js";

export async function createUser(
  first_name,
  last_name,
  username,
  password,
  email
) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    password: hashedPassword,
    email: email,
    profile_is_hidden: false,
    location: "",
    gender: "",
    bio: "",
    date_joined: Date(),
    posts: [],
    favorited_posts: [],
    liked_posts: [],
  };
  return user;
}

export async function usernameIsAvailable(username) {
  const dbResponse = await usersDB.getUserByUsername(username);
  return !dbResponse.success;
}

export async function emailCanBeUsed(email) {
  const dbResponse = await usersDB.getUserByEmail(email);
  return !dbResponse.success;
}
