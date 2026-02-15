export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
      <div className="flex gap-8">
        <div className="lg:w-2/3">
          <div className="h-12 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-gray-200 rounded"></div>)}
          </div>
        </div>
        <div className="lg:w-1/3 space-y-6">
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
