import { NextResponse } from 'next/server';

const BASE_URL = 'https://dummyjson.com/products';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || 12;
  const skip = searchParams.get('skip') || 0;

  try {
    const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
