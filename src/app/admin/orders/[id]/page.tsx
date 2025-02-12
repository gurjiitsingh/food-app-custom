
import OrderDetail from "./components/OrderDetail";


export default async function Order({ params }: { params: { id: string } }) {
 

  return (
    <>
    <OrderDetail id={params.id} />
    </>
  );
}

