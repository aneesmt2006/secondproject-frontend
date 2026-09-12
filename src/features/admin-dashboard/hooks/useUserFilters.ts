import { useState, useMemo } from 'react';
import { User } from '../types';
import { PREGNANCY_WEEKS, HEALTH_CONDITIONS} from '../constants/userManagementConstants'

export const useUserFilters = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weekFilter, setWeekFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [dueDateFilter, setDueDateFilter] = useState('');

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.full_name.toLowerCase().includes(lowerSearch) ||
          u.email.toLowerCase().includes(lowerSearch)
      );
    }

    if (weekFilter !== 'all') {
      const week = parseInt(weekFilter);
      filtered = filtered.filter((u) => u.currentWeek === week);
    }

    if (conditionFilter !== 'all') {
      filtered = filtered.filter((u) => u.otherHealthIssues ? 'Abnormal':'Normal' === conditionFilter);
    }

    if (dueDateFilter) {
      filtered = filtered.filter((u) => {
        if (!u.dueDate) return false;
        // Compare dates (ignoring time)
        const userDate = new Date(u.dueDate).toISOString().split('T')[0];
        return userDate === dueDateFilter;
      });
    }

    return filtered;
  }, [users, searchTerm, weekFilter, conditionFilter, dueDateFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setWeekFilter('all');
    setConditionFilter('all');
    setDueDateFilter('');
  };

  return {
    searchTerm,
    setSearchTerm,
    weekFilter,
    setWeekFilter,
    conditionFilter,
    setConditionFilter,
    dueDateFilter,
    setDueDateFilter,
    filteredUsers,
    resetFilters,
    // Expose constants for use in components if needed
    pregnancyWeeks: PREGNANCY_WEEKS,
    healthConditions: HEALTH_CONDITIONS,
  };
};
