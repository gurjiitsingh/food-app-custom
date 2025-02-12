//import fs from 'fs';
import { NextRequest, NextResponse } from "next/server";
// import { json } from 'stream/consumers';
// import { any, unknown } from 'zod';

export async function GET(req:NextRequest, res:NextResponse){

console.log(req)
    const data = "dsf";//fs.readFileSync('temp/order_3.json');
//console.log(JSON.parse(data));
const Filereaded = JSON.parse(data);

    return NextResponse.json(Filereaded);
}