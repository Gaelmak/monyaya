import { AdminEmails } from "./admin-emails";

export async function onYayaRequest(email: string, name: string) {
  const sendToUser = await fetch(`/api/send-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      title: "Votre demande de formateur",
      content: `Votre demande de formateur a été prise en compte. Vous recevrez un email de confirmation dès que votre demande sera validée.`,
    }),
  });
  const sendToAdmin = await fetch(`/api/send-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: AdminEmails,
      title: "Nouvelle demande de formateur",
      content: `${name} souhaite devenir formateur sur MonYaya. Vous pouvez valider ou refuser cette demande sur la page dédiée.`,
    }),
  });
  if (sendToUser || sendToAdmin) {
    return true;
  }
  return false;
}
