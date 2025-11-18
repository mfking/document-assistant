import { Box, Text, Badge, VStack, HStack } from '@chakra-ui/react';
import { Subject } from '../types/document';

interface SubjectCardProps {
  subject: Subject;
  noteCount: number;
  onClick: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  noteCount,
  onClick,
}) => {
  return (
    <Box
      p={4}
      borderRadius="md"
      borderWidth={1}
      borderColor="gray.200"
      cursor="pointer"
      onClick={onClick}
      _hover={{ borderColor: subject.color, shadow: 'md' }}
      transition="all 0.2s"
    >
      <VStack align="start">
        <HStack justify="space-between" w="full">
          <Text fontWeight="bold" color={subject.color}>
            {subject.name}
          </Text>
          <Badge colorScheme="gray" variant="subtle">
            {noteCount} notes
          </Badge>
        </HStack>
        {subject.description && (
          <Text fontSize="sm" color="gray.600">
            {subject.description}
          </Text>
        )}
      </VStack>
    </Box>
  );
};
