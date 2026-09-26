import OnlineSlotForm from "./OnlineSlotForm";

interface SlotTabsProps {
  unavailableDates: Date[];
  setUnavailableDates: (dates: Date[]) => void;
  offlineUnavailableDates: Date[];
  setOfflineUnavailableDates: (dates: Date[]) => void;
}

const SlotTabs = ({
  unavailableDates,
  setUnavailableDates,
}: SlotTabsProps) => (
  <div className="w-full">
    <OnlineSlotForm unavailableDates={unavailableDates} setUnavailableDates={setUnavailableDates} />
  </div>
);

export default SlotTabs;
