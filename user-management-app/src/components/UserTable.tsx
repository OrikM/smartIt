import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, setFilter } from "../features/users/userSlice";
import { RootState, AppDispatch } from "../app/store";

const UserTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredUsers, loading, filters, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p className="text-center text-blue-500">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const handleFilterChange = (field: string, value: string) => {
    dispatch(setFilter({ field, value }));
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure only numbers are entered
    if (/^\d*$/.test(value)) {
      handleFilterChange("phone", value);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        User Management Table
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
          className="border border-indigo-400 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Filter by username"
          value={filters.username}
          onChange={(e) => handleFilterChange("username", e.target.value)}
          className="border border-teal-400 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e) => handleFilterChange("email", e.target.value)}
          className="border border-purple-400 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="tel"
          placeholder="Filter by phone"
          value={filters.phone}
          onChange={handlePhoneInput}
          className="border border-pink-400 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          inputMode="numeric"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gradient-to-r from-green-200 to-blue-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm font-light">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-300 hover:bg-purple-100 transition-colors duration-200"
              >
                <td className="py-3 px-6 text-left">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.username}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
