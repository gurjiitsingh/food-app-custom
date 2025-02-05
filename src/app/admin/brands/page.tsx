"use server";
import Form from "./components/Form";
import EditForm from "./components/EditForm";
import ViewList from './components/ViewList';


export default async function page({searchParams}) {
  
 
  return (
    <>
      <div className="flex flex-col  md:flex-row gap-4">
        <div className="w-full md:w-[40%] rounded-xl bg-white p-5">
     {searchParams?.id?<EditForm />: <Form />} 
        </div>
        <div className="w-full md:w-[60%] rounded-xl bg-white p-3">

          <ViewList />
          {/* <Categories /> */}
        </div>
      </div>
    </>
  );
}
