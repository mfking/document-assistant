import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

interface DocumentViewHeaderProps {
  title: string;
}

export const DocumentViewHeader: React.FC<DocumentViewHeaderProps> = ({
  title,
}) => {
  return (
    <Box mb={6}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Text color="blue.500" _hover={{ textDecoration: 'underline' }}>
          ← Back to Dashboard
        </Text>
      </Link>
      <Heading mt={2}>{title}</Heading>
    </Box>
  );
};
