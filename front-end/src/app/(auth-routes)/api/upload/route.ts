import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
});

async function uploadFileToS3(file: Buffer, fileName: string, folderName: string) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: folderName+"/"+fileName,
    Body: file,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${folderName}/${fileName}`;
  return fileUrl;
}

export async function POST(
	req: Request
) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const name = formData.get("name") as string;
    const folder = formData.get("folder") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await (file as Blob).arrayBuffer());
    const fileUrl = await uploadFileToS3(buffer, name, folder);

    return NextResponse.json({ status: 200, fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
