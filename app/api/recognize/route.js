// app/api/recognize/route.js

import { NextResponse } from 'next/server';
import vision from '@google-cloud/vision';

export async function POST(request) {
  const { image } = await request.json();

  if (!image) {
    return NextResponse.json({ error: 'Missing image data' }, { status: 400 });
  }

  try {
    const client = new vision.ImageAnnotatorClient();
    //   keyFilename: 'path/to/your-service-account-file.json', // Replace with your JSON key file path
    // });

    const [result] = await client.labelDetection(Buffer.from(image.split(',')[1], 'base64'));
    const labels = result.labelAnnotations;
    console.log("server recognize");
    console.log(labels);



    return NextResponse.json({ labels: labels.map(label => label.description) });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ error: 'Error analyzing image' }, { status: 500 });
  }
}
// // app/api/recognize/route.js

// import { NextResponse } from 'next/server';
// import vision from '@google-cloud/vision';

// export async function POST(request) {
//   const { image } = await request.json();

//   if (!image) {
//     return NextResponse.json({ error: 'Missing image data' }, { status: 400 });
//   }

//   try {
//     const client = new vision.ImageAnnotatorClient();
//     const [result] = await client.labelDetection(Buffer.from(image.split(',')[1], 'base64'));
//     const labels = result.labelAnnotations;
    
//     return NextResponse.json({ labels: labels.map(label => label.description) });
//   } catch (error) {
//     console.error('Error analyzing image:', error);
//     return NextResponse.json({ error: 'Error analyzing image' }, { status: 500 });
//   }
// }