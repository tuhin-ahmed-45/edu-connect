export const replaceMongoIdInArray = (array) => {
   const mappedArray = array
      .map((item) => {
         return {
            id: item._id.toString(),
            ...item,
         };
      })
      .map(({ _id, ...rest }) => rest);

   return mappedArray;
};

export function replaceMongoIdInObject(obj) {
   if (!obj) {
      return null; // Ensure we handle null or undefined objects gracefully
   }

   if (Array.isArray(obj)) {
      return obj.map(replaceMongoIdInObject);
   }

   const { _id, ...rest } = obj;
   return { id: _id?.toString(), ...rest }; // Convert `_id` to a string
}
