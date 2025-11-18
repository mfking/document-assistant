import { Heading, SimpleGrid } from '@chakra-ui/react';
import { SubjectCard } from './SubjectCard';
import { SubjectMap } from '../types/document';

interface SubjectGridProps {
  subjects: SubjectMap;
  onClick: (id: string) => void;
}

export const SubjectGrid: React.FC<SubjectGridProps> = ({
  subjects,
  onClick,
}: SubjectGridProps) => {
  return (
    <>
      <Heading size="lg">Subjects</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} w="full" spaceX={"3"}>
        {Object.values(subjects).map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            noteCount={subject.noteCount}
            onClick={() => onClick(subject.id)}
          />
        ))}
      </SimpleGrid>
    </>
  );
};
