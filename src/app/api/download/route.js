import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID missing' }, { status: 400 });
  }

  const appScriptURL = 'https://script.google.com/macros/s/AKfycbzuphy6K3pcWWtCP2CplrzRCaF9UWUuha7gLOmZH24wNDM2hWEq9XaFAPbFUyBU6jEr/exec';

  try {
    const response = await fetch(`${appScriptURL}?orderId=${encodeURIComponent(orderId)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch PDF from App Script');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${orderId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF Download Error:', error);
    return NextResponse.json({ error: 'Failed to download PDF' }, { status: 500 });
  }
}
