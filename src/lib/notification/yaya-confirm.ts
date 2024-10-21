import { getServerUrl } from "../server-url";

export async function onYayaConfirm(email: string, name: string) {
  const sendToUser = await fetch(`/api/send-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      title: "Vous êtes maintenant Yaya",
      content: `Votre demande de formateur a été confirmée. Vous pouvez maintenant commencer à créer vos cours sur la plateforme.`,
      buttonText: "Se connecter",
      buttonLink: `${getServerUrl()}/signin`,
    }),
  });
  if (sendToUser) {
    return true;
  }
  return false;
}
