import { NextApiRequest, NextApiResponse, } from "next";
import { NextResponse} from "next/server"
import { writeFile } from "fs/promises";
import { join } from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
var bucketName = 'sasadev-nextjs-ecommerce';

export async function POST(request: NextResponse){
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File
    console.log("file 0 :",file)

    if(!file){
        return NextResponse.json({ success: false})
    }

    const bytes = await file.arrayBuffer() //return promise for array buffer
    const buffer = Buffer.from(bytes) //buffer object

    console.log("file 1 :",file.name)

    const client : S3Client = new S3Client({
        region: "eu-west-3",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
    })

    const links = [];
    const ext = file.name.split('.').pop();
    const newFileName = Date.now() + '.' + ext;
    console.log(ext);
    await client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: buffer,
        ACL: 'public-read',
        ContentType: `image/${ext}`
    }));

    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
    links.push(link)

    return NextResponse.json({ links})
}

export const config = {
    api: {bodyPareser: false}
};