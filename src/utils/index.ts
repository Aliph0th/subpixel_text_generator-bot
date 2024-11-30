export const getNextID = (currentID = '') => {
   let nextID = '';
   let carry = true;

   for (let i = currentID.length - 1; i >= 0; i--) {
      if (carry) {
         if (currentID[i] === 'z') {
            nextID = 'a' + nextID;
         } else {
            nextID = String.fromCharCode(currentID.charCodeAt(i) + 1) + nextID;
            carry = false;
         }
      } else {
         nextID = currentID[i] + nextID;
      }
   }

   if (carry) {
      nextID = 'a' + nextID;
   }

   return nextID;
};
