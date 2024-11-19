import React, { useEffect, useState } from 'react';
import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import Loader from '../../loader';
import Message from '../message/index';
import { toast } from 'react-toastify';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} from '../../../../redux/api/usersApiSlice';
import { AiOutlineClose } from "react-icons/ai"; 

const UserList = () => {

  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState('');
  const [editableUserEmail, setEditableUserEmail] = useState('');

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Handler for deleting a user
  const handleDelete = async (id) => {
     if(window.confirm("Are you sure to delete this user")){
      try {
        await deleteUser(id);
        toast.success('User deleted successfully!');
        refetch(); // Refetch the users list after deletion
      } 
      catch (error) {
        toast.error('Failed to delete user.');
      }
     }
  };

  // Handler for editing a user
  const handleEdit = (user) => {
    setEditableUserId(user._id);
    setEditableUserName(user.username);
    setEditableUserEmail(user.email);
  };

  // Handler for saving edited user details
  const handleSaveEdit = async (editableUserId) => {
    try {
      await updateUser(
        { 
          userId: editableUserId, 
          username: editableUserName, 
          email: editableUserEmail 
        }
      );
      toast.success('User updated successfully!');
      setEditableUserId(null); // Exit edit mode
      refetch(); // Refetch the users list after update
    } 
    catch (error) {
      toast.error('Failed to update user.');
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-semibold mb-4 text-center'>
        User <span className='text-[#1DB954]'>Managament.</span>
      </h1>

      {
      isLoading 
      ? 
      (
        <Loader />
      ) 
      : 
      error 
      ? 
      (
        <Message variant='danger'>{error?.data.message || error.message}</Message>
      ) : 
      (
        <div className='flex flex-col md:flex-row'>
          <table className='w-full md:w-4/5 mx-auto border border-gray-300'>
            <thead className='bg-white text-black'>
              <tr className='border border-black'>
                <th className='px-4 py-2 text-left border border-black'>ID</th>
                <th className='px-4 py-2 text-left border border-black'>NAME</th>
                <th className='px-4 py-2 text-left border border-black'>EMAIL</th>
                <th className='px-4 py-2 text-left border border-black'>ADMIN</th>
                <th className='px-4 py-2 text-left border border-black'>ACTIONS</th>
                <th className='px-4 py-2 text-left border border-black'>CREATED AT</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => (
                 <tr key={user._id} className='border border-gray-300'>
                  <td className='px-4 py-2 border border-gray-300'>{user._id}</td>
                  <td className='px-4 py-2 border border-gray-300'>
                    {
                    editableUserId === user._id 
                     ? 
                     (
                        <div className='flex items-center'>
                          <input
                            type='text'
                            value={editableUserName}
                            onChange={(e) => setEditableUserName(e.target.value)}
                            className='border p-1 text-black w-[70%]'
                          />
                          <button
                            className='ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg'
                          >
                            <FaCheck/>
                          </button>
                        </div>
                    ) 
                    : 
                    (
                      user.username
                    )
                    }
                  </td>
                  <td className='px-4 py-2 border border-gray-300'>
                    {
                     editableUserId === user._id 
                     ? 
                     (
                      <div>
                        <input
                          type='email'
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className='border p-1 text-black w-[70%]'
                        />
                        <button
                        className='ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg'
                        >
                        <FaCheck/>
                        </button>   
                      </div>
                     ) 
                     : 
                     (
                      user.email
                     )
                    }
                  </td>
                  <td className='px-4 py-2 border border-gray-300'>
                    {user.isAdmin ? <FaCheck className='text-[#1DB954] text-lg ml-3'/> : <AiOutlineClose className='text-red-600 font-black text-xl ml-3'/>}
                  </td>
                  <td className='px-5 py-2 border border-gray-300'>
                    {editableUserId === user._id ? (
                      <div className='text-black'> 
                        <button onClick={() => handleSaveEdit(user._id)} className='text-[#1DB954]'>
                          <FaCheck />
                        </button>
                        <button onClick={() => setEditableUserId(null)} className='text-[#D62828] ml-2 font-semibold'>
                          <FaTimes />
                        </button>
                      </div>
                      ) 
                      : 
                      (
                      <>
                       {
                         !user.isAdmin && (
                          <>
                             <button onClick={() => handleEdit(user)} className='text-[#3d6cad] hover:text-blue-500'>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(user._id)} className='text-[#D62828] hover:text-red-500 ml-2'>
                          <FaTrash />
                        </button>
                          </>
                         )
                       }
                      </>
                      )
                    }
                  </td>
                  <td className='px-4 py-2'>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;