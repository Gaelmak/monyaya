import { getServerUrl } from "@/lib/server-url";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

type EmailTemplateProps = {
  preview?: string | null;
  title: string;
  content: string;
  buttonText?: string | null;
  buttonLink?: string | null;
  footerMessage?: string | null;
};

export default function EmailTemplate(props: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      {props.preview && <Preview>{props.preview}</Preview>}
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`https://monyaya.com/img/logo-monyaya.webp`}
              height="32"
              alt="Monyaya"
            />
            <Hr style={hr} />
            <Text style={title}>{props.title}</Text>
            <Text style={paragraph}>{props.content}</Text>
            {props.buttonText && (
              <Button style={button} href={props.buttonLink}>
                {props.buttonText}
              </Button>
            )}
            {props.footerMessage && (
              <>
                <Hr style={hr} />
                <Text style={paragraph}>{props.footerMessage}</Text>
              </>
            )}
            <Hr style={hr} />
            <Text style={footer}>© 2025 Monyaya. Tous droits réservés.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const title = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  lineHeight: "32px",
  textAlign: "left" as const,
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#39AE44",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
