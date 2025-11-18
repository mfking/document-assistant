import { Link } from 'react-router-dom';
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { Note, SubjectMap } from '../types/document';
import { useMemo } from 'react';

interface NotesListProps {
  clearSubject: () => void;
  notes: Note[];
  subjectId?: string;
  subjects: SubjectMap;
}

export const NotesList: React.FC<NotesListProps> = ({
  clearSubject,
  notes,
  subjectId,
  subjects,
}: NotesListProps) => {
  const subject = useMemo(
    () => (subjectId != null ? subjects[subjectId] : null),
    [subjectId, subjects]
  );
  const filteredNotes = useMemo(
    () =>
      subjectId != null
        ? notes.filter((note) => note.subjectId === subjectId)
        : notes,
    [notes, subjectId]
  );

  return (
    <>
      <HStack justify="space-between" w="full">
        <Heading size="lg">{`${subject?.name ?? 'All'} Notes`}</Heading>
      </HStack>

      {subject && (
        <Button variant="ghost" onClick={clearSubject}>
          ← Back to all notes
        </Button>
      )}

      <Box w="full">
        {filteredNotes.map((note) => (
          <Link
            key={note.id}
            to={`/document/${note.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Box
              border="1px"
              borderColor="gray.200"
              p={4}
              borderRadius="md"
              mb={4}
              _hover={{ bg: 'gray.50' }}
            >
              <HStack justify="space-between" mb={2}>
                <Heading size="md">{note.title}</Heading>
                <Text fontSize="sm" color={subjects[note.subjectId].color}>
                  {subjects[note.subjectId].name}
                </Text>
              </HStack>
              <Text color="gray.600" mb={2}>
                {note.summary}
              </Text>
              <Text fontSize="sm" color="gray.400">
                {note.createdAt.toLocaleDateString()}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </>
  );
};
