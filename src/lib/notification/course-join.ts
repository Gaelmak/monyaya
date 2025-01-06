import { getServerUrl } from "../server-url";
import { AdminEmails } from "./admin-emails";

export async function onCourseJoined(
  yayaEmail: string,
  userEmail: string,
  name: string,
  courseName: string,
  yayaId: string
) {
  const sendToUser = await fetch(`/api/send-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      title: `Vous avez rejoint le cours ${courseName}.`,
      content: `Félicitations 🎉 ! Vous avez rejoint le cours ${courseName}. Nous vous contacterons dans les prochaines heures via votre numéro WhatsApp ou votre adresse e-mail.`,
    }),
  });
  const sendToYaya = await fetch(`/api/send-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: yayaEmail,
      title: "Nouvel apprenti(e) dans votre cours",
      content: `Felicitations 🎉. ${name} vient de s’inscrire à votre cours ${courseName}. Nous vous contacterons bientôt via WhatsApp ou email pour convenir de l’heure, du lieu et de la date de début du contrat.`,
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
      title: "Nouvel apprenti(e) dans un cours",
      content: `${name} vient de rejoindre le cours: ${courseName} de votre yaya ${yayaId}.`,
    }),
  });

  if (sendToUser || sendToYaya || sendToAdmin) {
    return true;
  }
  return false;
}
