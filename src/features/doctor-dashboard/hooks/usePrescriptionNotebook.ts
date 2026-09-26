import { priscriptionCreate } from "@/services/api/medical.service";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePrescriptionNotebook = (doctorName:string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [noteContent, setNoteContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const roomCode = location.state?.roomCode;

  const userId = location.state?.userId;

  const pastConsultations = [
    {
      id: 1,
      title: "Prenatal Check-up",
      date: "Dec 12, 2025",
      time: "10:30 AM",
      doctor: "Dr. Sarah Jenkins",
      content:
        "Patient feeling well. Fetal heart rate normal (140 bpm). BP 110/70. Prescribed Iron supplements.",
    },
    {
      id: 2,
      title: "Symptom Review",
      date: "Nov 28, 2025",
      time: "02:15 PM",
      doctor: "Dr. Mike Ross",
      content:
        "Discussed mild back pain and sleep issues. Recommended prenatal yoga and physical therapy if pain persists.",
    },
    {
      id: 3,
      title: "Initial Consultation",
      date: "Oct 15, 2025",
      time: "09:00 AM",
      doctor: "Dr. Sarah Jenkins",
      content:
        "Pregnancy confirmed. Week 8. Patient history reviewed. LMP: Aug 20, 2025.",
    },
  ];

  const handleViewConsultation = (consultation: any) => {
    setSelectedConsultation(consultation);
    console.log("Set selected consultation ===>", consultation);
    setIsModalOpen(true);
  };

  const handleSaveNote = async () => {
    try {
      if (!roomCode || !userId || !doctorName || !noteContent) {
        console.error("Missing required fields");
        return;
      }

      const response = await priscriptionCreate({
        appointmentId: roomCode,
        userId: userId,
        doctorName: doctorName,
        content: noteContent
      });

      console.log("Prescription created:", response);
      setNoteContent("");
    } catch (error) {
      console.error("Error creating prescription:", error);
    }
  };


  const filteredConsultations = pastConsultations.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    isModalOpen,
    setIsModalOpen,
    selectedConsultation,
    handleViewConsultation,
    noteContent,
    setNoteContent,
    searchQuery,
    setSearchQuery,
    filteredConsultations,
    handleSaveNote,
  };
};
