import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { dbConnect } from "@/service/dbConnect";

export async function getCategories() {
   // DB connection call
   await dbConnect();
   
   const categories = await Category.find({}).lean();
   return replaceMongoIdInArray(categories);
}
