import Image from "next/image";
import Header from "@/components/Header";
//import { useEffect, useState } from "react";
import { fetchProductById } from "@/app/action/products/dbOperation";
import Pictures from "./components/pictures";
import Link from "next/link";

export default async function Home({ params }: { params: { id: string } }) {
  //const [product, setProduct ] = useState();

  //   useEffect(()=>{
  //      async function fetchData(){
  // const result = await fetchProductById(id:string)
  // setProduct(result)
  //     }
  //     fetchData(id)

  //   },[])

  const id = params.id;
  const product = await fetchProductById(id);

  console.log("result", product);

  return (
    <>
      <Header />
      <main className="p-5 md:p-10">
        <section className="flex  flex-col-reverse md:flex-row gap-3">
          <div className="flex-1 ">
           <Pictures  product={product} />
          </div>
          {/* end of image */}

          <div className=" flex-1   ">
            <div className="flex flex-col gap-3 w-[60%]">
            <div className="flex gap-3">
              <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
                <img className="h-4" src={product?.image} alt="" />
                <h4 className="text-xs font-semibold">{product?.name}</h4>
              </div>

              <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
                <img className="h-4" src={product?.image} alt="" />
                <h4 className="text-xs font-semibold">{product?.name}</h4>
              </div>
            </div>

            <h1 className="font-semibold text-xl md:text-4xl">
              {product?.name}
            </h1>
            <h2 className="text-gray-600 text-sm line-clamp-3 md:line-clamp-4">
              {product?.Desc}
            </h2>

            <h3 className="text-green-500 font-bold text-lg">
              $ {product?.price}{" "}
              <span className="line-through text-gray-700 text-sm">
                $ {product?.price}
              </span>
            </h3>

            <div className="flex flex-wrap items-center gap-4">
              <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                <button className="bg-black text-white rounded-lg px-4 py-1.5">
                  Buy Now
                </button>
              </Link>

              {/* <AddToCartButton type={"cute"} productId={product?.id} />
       
       
                      <FavoriteButton productId={product?.id} />
                 */}

              <div className="flex">
                <h3 className="text-red-500 py-1 rounded-lg text-sm font-semibold">
                  Out Of Stock
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-2 py-2">
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: product?.Desc ?? "" }}
              ></div>
            </div></div>
          </div>
        </section>
      </main>
    </>
  );
}

async function Brand({ brandId }) {
  const brand = await getBrand({ id: brandId });
  return (
    <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
      <img className="h-4" src={brand?.imageURL} alt="" />
      <h4 className="text-xs font-semibold">{brand?.name}</h4>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex gap-3 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-sm text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
        )
      </h1>
    </div>
  );
}
