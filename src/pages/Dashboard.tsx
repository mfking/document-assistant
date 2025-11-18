import React, { useState, useEffect } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { Note, SubjectMap } from '../types/document';
import { mockNotes, mockSubjects } from '../resources/mockData';
import { SubjectGrid } from '../components/SubjectGrid';
import { DashboardHeader, ViewMode } from '../components/DashboardHeader';
import { NotesList } from '../components/NotesList';

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [subjects, setSubjects] = useState<SubjectMap>({});
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>();
  const [viewMode, setViewMode] = useState<ViewMode>('subjects');

  useEffect(() => {
    setNotes(mockNotes);
    setSubjects(mockSubjects);
  }, []);

  const clearSubject = () => setSelectedSubjectId(undefined);

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setViewMode('notes');
  };

  return (
    <Box p={8} maxW={"90%"} mx="auto">
      <DashboardHeader viewMode={viewMode} setViewMode={setViewMode} />

      <VStack align="start">
        {viewMode === 'subjects' ? (
          <SubjectGrid subjects={subjects} onClick={handleSubjectClick} />
        ) : (
          <NotesList
            clearSubject={clearSubject}
            notes={notes}
            subjects={subjects}
            subjectId={selectedSubjectId}
          />
        )}
      </VStack>
    </Box>
  );
};

export default Dashboard;
