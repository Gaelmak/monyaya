import { getServerUrl } from "../server-url";

export async function onCourseJoined(
  email: string,
  name: string,
  courseName: string
) {
  const sendToUser = await fetch(`/api/send-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      title: "Nouvel apprenti(e) dans votre cours",
      content: `Felicitations 🎉. ${name} vient de rejoindre votre cours: ${courseName}.`,
    }),
  });
  console.log("res", sendToUser);

  if (sendToUser) {
    return true;
  }
  return false;
}
