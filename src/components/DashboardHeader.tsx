import { Button, Heading, HStack } from '@chakra-ui/react';

export type ViewMode = 'subjects' | 'notes';

interface DashboardHeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  viewMode,
  setViewMode,
}: DashboardHeaderProps) => {
  return (
    <>
      <Heading mb={8}>Note Assistant</Heading>
      <HStack justify="space-between" mb={6}>
        <HStack>
          <Button
            variant={viewMode === 'subjects' ? 'solid' : 'outline'}
            onClick={() => setViewMode('subjects')}
          >
            Subjects
          </Button>
          <Button
            variant={viewMode === 'notes' ? 'solid' : 'outline'}
            onClick={() => setViewMode('notes')}
          >
            All Notes
          </Button>
        </HStack>
        <HStack>
          <Button colorScheme="blue">+ Add Note</Button>
          <Button variant="outline">📁 Upload Note</Button>
        </HStack>
      </HStack>
    </>
  );
};
