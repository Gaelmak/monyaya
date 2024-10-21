import { getServerUrl } from "../server-url";

export async function onCourseConfirm(
  email: string,
  name: string,
  courseId: string
) {
  const sendToUser = await fetch(`/api/send-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      title: "Votre cours a été validé",
      content: `Votre cours a été validé et disponible sur la plateforme. Les utilisateurs pourront maintenant le consulter et rejoindre.`,
      buttonText: "Voir sur le site",
      buttonLink: `${getServerUrl()}/courses/${courseId}`,
    }),
  });
  if (sendToUser) {
    return true;
  }
  return false;
}
