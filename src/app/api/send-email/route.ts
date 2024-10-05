import EmailTemplate from "@/components/email/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EmailFrom = process.env.EMAIL_FROM;

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.email || !body?.title || !body?.content) {
    return Response.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Mon Yaya <${EmailFrom}>`,
      to: Array.isArray(body.email) ? body.email : [body.email],
      subject: "Hello world",
      react: EmailTemplate({
        preview: body.preview ?? null,
        title: body.title,
        content: body.content,
        buttonText: body.buttonText ?? null,
        buttonLink: body.buttonLink ?? null,
        footerMessage: body.footerMessage ?? null,
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
