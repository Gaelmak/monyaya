import EmailTemplate from "@/components/email/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EmailFrom = process.env.EMAIL_FROM;

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  if (!body.email) {
    return Response.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const { data: createData, error: createError } =
      await resend.contacts.create({
        email: Array.isArray(body.email) ? body.email[0] : body.email,
        firstName: body.firstName,
        unsubscribed: false,
        audienceId: "4367756f-fcf1-44e7-8e06-d70359e2a4a3", // General Audience
      });

    if (createError) {
      return Response.json({ error: createError }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: `Mon Yaya <${EmailFrom}>`,
      to: Array.isArray(body.email) ? body.email : [body.email],
      subject: "Mon Yaya - Newsletter",
      react: EmailTemplate({
        title: "Mon Yaya - Newsletter",
        content:
          "Bienvenue sur la newsletter de Mon Yaya, nous vous remercions de votre inscription.",
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
