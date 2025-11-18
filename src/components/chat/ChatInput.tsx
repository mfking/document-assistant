import React from 'react';
import { HStack, Input, Button } from '@chakra-ui/react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <HStack>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask a question about this document..."
        flex={1}
      />
      <Button onClick={onSend} colorScheme="blue">
        Send
      </Button>
    </HStack>
  );
};
