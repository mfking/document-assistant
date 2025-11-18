import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatPanelProps {
  documentId: string;
}

const suggestedQuestions = [
  "What are the main challenges in aligning decision-making AI agents with human values in complex environments?",
  "How does the proposed test-time alignment technique using model-guided policy shaping differ from traditional retraining methods?",
  "What are the key findings from the evaluation of the approach using the MACHIAVELLI benchmark?"
];

export const ChatPanel: React.FC<ChatPanelProps> = ({ documentId }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Mock chat history - in real app, fetch by documentId
    setMessages([]);
  }, [documentId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const aiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'This is a mock AI response analyzing the document content.',
        timestamp: new Date().toLocaleString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setNewMessage(question);
    handleSend(); // Automatically send the question to start the chat
  };

  return (
    <Box 
      border="2px" 
      borderColor="gray.300" 
      borderRadius="lg" 
      p={4} 
      h="full" 
      bg="white"
      shadow="sm"
    >
      <VStack align="stretch" h="full" spaceY={4}>
        <Heading size="md" color="gray.700">Chat With AI</Heading>
        
        {messages.length === 0 && (
          <VStack align="stretch" spaceY={3}>
            <Text fontSize="sm" fontWeight="semibold" color="gray.600">
              Recommended
            </Text>
            <VStack align="stretch" spaceY={2}>
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  textAlign="left"
                  whiteSpace="normal"
                  h="auto"
                  p={3}
                  borderColor="blue.200"
                  _hover={{ bg: "blue.50", borderColor: "blue.300" }}
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <Text fontSize="xs">{index + 1}. {question}</Text>
                </Button>
              ))}
            </VStack>
          </VStack>
        )}

        <Box flex="1" overflowY="auto" minH="200px">
          <VStack align="stretch" spaceY={2}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </VStack>
        </Box>

        
          <ChatInput
            value={newMessage}
            onChange={setNewMessage}
            onSend={handleSend}
          />
        
      </VStack>
    </Box>
  );
};
