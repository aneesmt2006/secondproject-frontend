import { useState, useMemo } from 'react';
import { User } from '../types';

export const usePagination = (filteredUsers: User[] = [], usersPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(filteredUsers.length / usersPerPage), [filteredUsers.length, usersPerPage]);
  
  const currentUsers = useMemo(
    () => filteredUsers.slice(
      (currentPage - 1) * usersPerPage,
      currentPage * usersPerPage
    ),
    [filteredUsers, currentPage, usersPerPage]
  );

  const goToPrevious = () => setCurrentPage(Math.max(1, currentPage - 1));
  const goToNext = () => setCurrentPage(Math.min(totalPages, currentPage + 1));
  const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(totalPages, page)));

  return {
    currentPage,
    totalPages,
    currentUsers,
    goToPrevious,
    goToNext,
    goToPage,
  };
};
