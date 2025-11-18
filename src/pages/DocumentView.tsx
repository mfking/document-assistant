import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Grid } from '@chakra-ui/react';
import { DocumentViewHeader } from '../components/DocumentViewHeader';
import { NotePreview } from '../components/NotePreview';
import { ChatPanel } from '../components/chat/ChatPanel';
import { mockDocuments } from '../resources/mockData';
import { Note } from '../types/document';

const DocumentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Note>();

  useEffect(() => {
    if (id == null) {
      return;
    }

    // Get document from mock data
    const doc = mockDocuments[id];
    if (doc) {
      setDocument(doc);
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
            summary={document.summary}
            keyPoints={document.keyPoints}
            content={document.content}
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
