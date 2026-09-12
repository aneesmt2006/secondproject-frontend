

interface DoctorFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  specializationFilter: string;
  setSpecializationFilter: (val: string) => void;
  locationFilter: string;
  setLocationFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  specializations: string[];
  onApply: () => void;
  onReset: () => void;
}

const DoctorFilters = ({
  searchTerm,
  setSearchTerm,
  specializationFilter,
  setSpecializationFilter,
  locationFilter,
  setLocationFilter,
  statusFilter,
  setStatusFilter,
  specializations,
  onApply,
  onReset,
}: DoctorFiltersProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-rose/20 mb-6">
      <h3 className="text-xl font-bold text-cocoa mb-4">Filter Doctors</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-cocoa mb-2">
            Search by Name or ID
          </label>
          <input
            type="text"
            placeholder="e.g., Dr. Anya Sharma"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-cream border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cocoa mb-2">
            Specialization
          </label>
          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="w-full px-4 py-2 bg-cream border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
          >
            <option value="all">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cocoa mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g., New York"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full px-4 py-2 bg-cream border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cocoa mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {['all', 'approved', 'pending', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
                  statusFilter === status
                    ? 'bg-gradient-to-r bg-rose text-white'
                    : 'bg-cream text-cocoa hover:bg-rose/10'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
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
};

export default DoctorFilters;
