export default function AuthLoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-8 bg-gray-800 rounded w-2/3 mx-auto" />
        <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto" />

        {/* Input Skeletons */}
        <div className="space-y-4">
          <div className="h-10 bg-gray-800 rounded w-full" />
          <div className="h-10 bg-gray-800 rounded w-full" />
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-gray-700 rounded w-full" />

        {/* OR Separator */}
        <div className="flex items-center gap-4">
          <div className="flex-grow h-px bg-gray-700" />
          <div className="w-6 h-4 bg-gray-700 rounded" />
          <div className="flex-grow h-px bg-gray-700" />
        </div>

        {/* Google Button Skeleton */}
        <div className="h-12 bg-gray-700 rounded w-full" />

        {/* Bottom Text Skeleton */}
        <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
}
