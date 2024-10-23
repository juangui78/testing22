import { dbConnected } from '@/utils/mongoose';
import User from '@/models/users'
import { NextResponse } from 'next/server';


dbConnected();

export async function GET(request){
  const users = await User.find();
  console.log(users)
  return NextResponse.json(users);
}

export async function POST(request){
  const data = await request.json();
  const newUser = new User(data);
  newUser.save();

  return NextResponse.json({
    data
  })
}