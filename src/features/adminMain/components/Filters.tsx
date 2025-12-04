import { Search } from 'lucide-react';
import { FiltersProps } from '../types';
import { HEALTH_CONDITIONS, PREGNANCY_WEEKS } from '../constants/userManagementConstants';

const Filters = ({
  searchTerm,
  setSearchTerm,
  weekFilter,
  setWeekFilter,
  conditionFilter,
  setConditionFilter,
  dueDateFilter,
  setDueDateFilter,
  onApply,
  onReset,
}: FiltersProps) => (
  <div className="bg-white rounded-xl p-6 border border-rose/20 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-cocoa mb-2">Search User</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cocoa/40" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-cream border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-cocoa mb-2">Pregnancy Week</label>
        <select
          value={weekFilter}
          onChange={(e) => setWeekFilter(e.target.value)}
          className="w-full px-4 py-2 bg-cream border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
        >
          <option value="all">All Weeks</option>
          {/* Note: Import/use PREGNANCY_WEEKS from hook or constants here if needed */}
          {PREGNANCY_WEEKS.map((week) => (
            <option key={week} value={week}>Week {week}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-cocoa mb-2">Health Condition</label>
        <select
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
          className="w-full px-4 py-2 bg-cream border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
        >
          <option value="all">All Conditions</option>
          {HEALTH_CONDITIONS.map((condition) => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-cocoa mb-2">Due Date</label>
        <input
          type="date"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
          className="w-full px-4 py-2 bg-cream border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
        />
      </div>
    </div>

    <div className="flex gap-3">
      <button
        onClick={onApply}
        className="px-6 py-2 bg-gradient-to-r bg-rose text-white rounded-lg hover:shadow-lg transition-all font-semibold"
      >
        Apply Filters
      </button>
      <button
        onClick={onReset}
        className="px-6 py-2 bg-cream text-cocoa rounded-lg hover:bg-rose/10 transition-all font-semibold"
      >
        Reset
      </button>
    </div>
  </div>
);

export default Filters;