import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Grid } from '@chakra-ui/react';
import { DocumentViewHeader } from '../components/DocumentViewHeader';
import { NotePreview } from '../components/NotePreview';
import { ChatPanel } from '../components/chat/ChatPanel';
import { getAllDocuments } from '../resources/mockData';
import { Note } from '../types/document';

const DocumentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Note>();

  useEffect(() => {
    if (id == null) {
      return;
    }

    // Get document from all documents (including uploaded ones)
    const allDocs = getAllDocuments();
    const doc = allDocs[id];
    if (doc) {
      setDocument(doc);

      // If it's an uploaded document, fetch content from backend
      const uploadedDocs = JSON.parse(
        localStorage.getItem('uploadedDocuments') || '{}'
      );
      if (uploadedDocs[id]) {
        const fetchContent = async () => {
          try {
            const response = await fetch(
              `http://localhost:3001/api/document/${uploadedDocs[id].filename}`
            );
            if (response.ok) {
              const data = await response.json();
              setDocument((prev) =>
                prev ? { ...prev, content: data.content } : undefined
              );
            }
          } catch (error) {
            console.error('Error loading document content:', error);
          }
        };
        fetchContent();
      }
    }
  }, [id]);

  if (!document) return <Text>Loading...</Text>;

  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <Box p={4} borderBottom="1px" borderColor="gray.200">
        <DocumentViewHeader title={document.title} />
      </Box>

      <Grid templateColumns="1fr 400px" flex="1" h="calc(100vh - 120px)">
        {/* Left Panel - Document Content with Summary and Key Points */}
        <Box overflow="auto" p={6} borderRight="1px" borderColor="gray.200">
          <NotePreview
            title={document.title}
            summary={document.summary || 'No summary available'}
            keyPoints={document.keyPoints || []}
            content={document.content || 'Loading content...'}
          />
        </Box>

        {/* Right Panel - Chat Only */}
        <Box p={4} overflow="hidden">
          <ChatPanel documentId={document.id} />
        </Box>
      </Grid>
    </Box>
  );
};

export default DocumentView;
