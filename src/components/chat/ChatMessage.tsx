import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <Box
      mb={4}
      p={3}
      borderRadius="md"
      bg={message.type === 'user' ? 'blue.50' : 'gray.50'}
    >
      <Text fontWeight="bold" mb={1}>
        {message.type === 'user' ? '💬 You' : '🤖 AI'}
      </Text>
      <Text mb={2}>{message.content}</Text>
      <Text fontSize="xs" color="gray.500">{message.timestamp}</Text>
    </Box>
  );
};
