import { createContext, useContext, useState } from "react";

const PostJobContext = createContext(null);

export function PostJobProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);

  const addJob = ({ title, description, experience, workType, skills, icon }) => {
    setPostedJobs((prev) => [
      {
        id: `posted-${Date.now()}`,
        label: title,
        icon: icon || "work",
        department: experience,
        location: workType,
        salary: "—",
        totalCandidates: 0,
        aiMatches: 0,
        status: "Active",
        skills,
        description,
        isNew: true,
      },
      ...prev,
    ]);
    setIsOpen(false);
  };

  return (
    <PostJobContext.Provider value={{ isOpen, setIsOpen, postedJobs, addJob }}>
      {children}
    </PostJobContext.Provider>
  );
}

export const usePostJob = () => useContext(PostJobContext);
