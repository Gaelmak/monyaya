import { userAuth } from "./helper";

export async function GetSignedURL() {
  const user = await userAuth();

  if (!user) {
    return {
      error: { message: "Not authenticated" },
    };
  }

  return {
    succes: { url: "" },
  };
}
