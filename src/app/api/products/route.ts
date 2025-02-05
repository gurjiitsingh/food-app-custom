import { NextRequest, NextResponse } from "next/server";

//import Products from "@/models/productModel";
//import User from "@/models/userModel";
//import connectToDatabase from "@/lib/db";
//import { connect } from "@/dbConfig/dbConfig";



//connect();

export async function GET(req: NextRequest) {

  
  const params = req.nextUrl.searchParams;
  const url = new URL(req.url);
  // console.log(url)
  const searchParams = new URLSearchParams(url.searchParams);
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 4;
  let skip = (currentPage - 1) * limit;


  //console.log("limit------------ ", limit)

  // const pro = await db.select().from(products);

  const pro = await db
    .select()
    .from(product)
    // .orderBy(asc(products.id)) // order by is mandatory
    .limit(limit)
    .offset(skip);


   
    const total = await db.select({ count: count() }).from(product);

  //console.log("-------Product list in route handler-------",pro)

  return NextResponse.json({
    status: "success",
    data:{ products: pro, total }
});
}


