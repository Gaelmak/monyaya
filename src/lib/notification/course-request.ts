import { AdminEmails } from "./admin-emails";

export async function onCourseRequest(email: string, name: string) {
  const sendToUser = await fetch(`/api/send-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      title: "Demande de cours reçue",
      content: `Votre demande de cours a été reçue avec succès. Vous recevrez un email de confirmation dès que votre demande sera traitée.`,
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
      title: "Nouvelle demande de cours",
      content: `${name} a soumis une demande de cours sur MonYaya. Vous pouvez valider ou refuser cette demande sur la page dédiée.`,
    }),
  });
  if (sendToUser || sendToAdmin) {
    return true;
  }
  return false;
}
