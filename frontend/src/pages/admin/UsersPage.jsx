import React, { useState, useEffect } from "react";
import {
    LucideUser,
    LucideMail,
    LucideShield,
    LucidePhone,
    LucideTrash2,
} from "lucide-react";
import { userApiService } from "../../services/userService";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const UsersPage = () => {
    const { token } = useAuth();
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const usersPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginatedUsers = filteredUsers.slice(
        currentPage * usersPerPage,
        currentPage * usersPerPage + usersPerPage
    );

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await userApiService.fetchAllUsers(token);
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to fetch users");
        }
    };

    useEffect(() => {
        const filtered = users.filter(
            (user) =>
                `${user.firstName} ${user.lastName}`
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(0);
    }, [search, users]);

    const handleDelete = async (userId) => {
        try {
            const confirm = window.confirm("Are you sure you want to delete this user?");
            if (!confirm) return;

            await userApiService.deleteUser(userId, token);
            toast.success("User deleted successfully");
            loadUsers(); // Refresh list
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to delete user");
        }
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 dark:bg-zinc-900 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Users</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage registered users in the system</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                />
            </div>

            <div className="overflow-x-auto bg-white dark:bg-zinc-800 rounded-lg shadow">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 dark:bg-zinc-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Phone</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
                            <th className="px-6 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            paginatedUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-white flex items-center gap-2">
                                        <LucideUser className="w-4 h-4 text-blue-500" />
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                        <LucideMail className="w-4 h-4 inline mr-1 text-green-500" />
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                        <LucidePhone className="w-4 h-4 inline mr-1 text-amber-500" />
                                        {user.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-purple-600 dark:text-purple-400 capitalize">
                                        <LucideShield className="w-4 h-4 inline mr-1" />
                                        {user.userType}
                                    </td>
                                    <td
                                        className={`px-6 py-4 text-sm capitalize ${user.userStatus === "ACTIVE"
                                            ? "text-green-600"
                                            : user.userStatus === "INACTIVE"
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                            }`}
                                    >
                                        {user.userStatus.toLowerCase()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 text-right">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline"
                                        >
                                            <LucideTrash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-6 text-center text-gray-500 dark:text-gray-400">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6 px-2">
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 border rounded-lg shadow-sm font-semibold transition-colors ${currentPage === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white hover:bg-gray-50 text-black'
                            }`}
                    >
                        ← Previous
                    </button>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage >= totalPages - 1}
                        className={`px-4 py-2 border rounded-lg shadow-sm font-semibold transition-colors ${currentPage >= totalPages - 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white hover:bg-gray-50 text-black'
                            }`}
                    >
                        Next →
                    </button>
                </div>

                <span className="text-gray-500 text-sm font-medium">
                    Page {currentPage + 1} of {totalPages}
                </span>
            </div>

        </div>
    );
};

export default UsersPage;
