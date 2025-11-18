import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  ListRoot,
  ListItem,
} from '@chakra-ui/react';

interface NotePreviewProps {
  title: string;
  summary?: string;
  keyPoints?: string[];
  content: string;
}

export const NotePreview: React.FC<NotePreviewProps> = ({
  summary,
  keyPoints,
  content,
}) => {
  return (
    <VStack align="start" spaceY={8} w="full">
      {summary && (
        <Box
          w="full"
          p={4}
          bg="blue.50"
          borderRadius="md"
          borderLeft="4px"
          borderColor="blue.400"
        >
          <Heading size="md" mb={3} color="blue.600">
            AI Summary
          </Heading>
          <Text fontSize="sm" color="gray.700" lineHeight="1.6">
            {summary}
          </Text>
        </Box>
      )}

      {keyPoints && (
        <Box
          w="full"
          p={4}
          bg="green.50"
          borderRadius="md"
          borderLeft="4px"
          borderColor="green.400"
        >
          <Heading size="md" mb={3} color="green.600">
            Key Points
          </Heading>
          <ListRoot spaceY={2} pl={4}>
            {keyPoints.map((point, index) => (
              <ListItem key={index} fontSize="sm" color="gray.700">
                {point}
              </ListItem>
            ))}
          </ListRoot>
        </Box>
      )}

      <Box w="full">
        <Box
          border="1px"
          borderColor="gray.200"
          p={6}
          borderRadius="md"
          bg="gray.50"
          whiteSpace="pre-wrap"
          fontFamily="monospace"
          fontSize="sm"
          shadow="sm"
        >
          <Text>{content}</Text>
        </Box>
      </Box>
    </VStack>
  );
};
