//import { category } from '@/db/schema'
'use server'
import { revalidatePath } from 'next/cache';

export async function fetchCategories(){

    const result = await db.select().from(category)
    return result;
}


export async  function deleteCategory(catId){
    const { id } = JSON.parse(catId)
console.log("jlkjlll================8", id)

//const result = await db.delete(category).where(eq(category.id, id))
revalidatePath('/admin/categories')
}