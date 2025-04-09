// components/RegisterSkeleton.tsx
export default function RegisterSkeleton() {
   return (
     <div className="bg-white p-6 rounded shadow-md w-80 animate-pulse">
       <div className="h-6 bg-gray-300 rounded mb-4 w-1/2 mx-auto"></div>
       <div className="h-10 bg-gray-200 rounded mb-3"></div>
       <div className="h-10 bg-gray-200 rounded mb-3"></div>
       <div className="h-10 bg-gray-200 rounded mb-4"></div>
       <div className="h-10 bg-blue-300 rounded"></div>
     </div>
   );
 }
 