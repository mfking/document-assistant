import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react';

interface Document {
  id: string;
  title: string;
  summary: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    setDocuments([
      {
        id: '1',
        title: 'Meeting Notes - Jan 15',
        summary: 'Discussion about project timeline and key deliverables',
        created_at: '2024-01-15',
      },
      {
        id: '2',
        title: 'Project Requirements',
        summary: 'Key features and technical specifications for the new system',
        created_at: '2024-01-14',
      },
    ]);
  }, []);

  const handleAddNote = () => {
    console.log('Adding note:', newNote);
    setShowAddNote(false);
    setNewNote({ title: '', content: '' });
  };

  return (
    <Box p={8} maxW="800px" mx="auto">
      <Heading mb={8}>Document Assistant</Heading>

      <Box mb={8}>
        <Button colorScheme="blue" mr={4} onClick={() => setShowAddNote(true)}>
          + Add Note
        </Button>
        <Button variant="outline">📁 Upload Document</Button>
      </Box>

      {showAddNote && (
        <Box border="1px" borderColor="gray.200" p={6} borderRadius="md" mb={8}>
          <Heading size="md" mb={4}>
            Add New Note
          </Heading>
          <input
            type="text"
            placeholder="Note title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <textarea
            placeholder="Note content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            style={{ width: '100%', height: '150px', padding: '10px', marginBottom: '10px' }}
          />
          <Button colorScheme="blue" mr={4} onClick={handleAddNote}>
            Save
          </Button>
          <Button variant="ghost" onClick={() => setShowAddNote(false)}>
            Cancel
          </Button>
        </Box>
      )}

      <Box>
        <Heading size="lg" mb={4}>
          Your Documents
        </Heading>
        {documents.map((doc) => (
          <Link key={doc.id} to={`/document/${doc.id}`} style={{ textDecoration: 'none' }}>
            <Box
              border="1px"
              borderColor="gray.200"
              p={4}
              borderRadius="md"
              mb={4}
              _hover={{ bg: 'gray.50' }}
            >
              <Heading size="md" mb={2}>
                {doc.title}
              </Heading>
              <Text color="gray.600" mb={2}>
                {doc.summary}
              </Text>
              <Text fontSize="sm" color="gray.400">
                {doc.created_at}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
