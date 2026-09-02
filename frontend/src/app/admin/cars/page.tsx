import Sidebar from "@/components/admin/Sidebar";

export default function AdminCars() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Coches en venta
          </h1>
        </div>
      </div>
    </div>
  );
}
