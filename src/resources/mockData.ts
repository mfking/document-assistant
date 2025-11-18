import { Note, SubjectMap, Tag } from '../types/document';

export const mockSubjects: SubjectMap = {
  ['1']: {
    id: '1',
    name: 'Mathematics',
    description: 'Calculus and Linear Algebra notes',
    color: '#3182CE',
    createdAt: new Date('2024-01-15'),
    noteCount: 1,
  },
  ['2']: {
    id: '2',
    name: 'Computer Science',
    description: 'Programming and algorithms',
    color: '#38A169',
    createdAt: new Date('2024-01-20'),
    noteCount: 1,
  },
  ['3']: {
    id: '3',
    name: 'Work Projects',
    description: 'Meeting notes and project documentation',
    color: '#D69E2E',
    createdAt: new Date('2024-02-01'),
    noteCount: 1,
  },
};

export const mockTags: Tag[] = [
  { id: '1', name: 'derivatives', subjectId: '1', createdAt: new Date() },
  { id: '2', name: 'integration', subjectId: '1', createdAt: new Date() },
  { id: '3', name: 'algorithms', subjectId: '2', createdAt: new Date() },
  { id: '4', name: 'data-structures', subjectId: '2', createdAt: new Date() },
  { id: '5', name: 'meetings', subjectId: '3', createdAt: new Date() },
];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Derivative Rules',
    content: '# Derivative Rules\n\n## Power Rule\nd/dx[x^n] = nx^(n-1)',
    summary: 'Basic derivative rules and examples',
    subjectId: '1',
    tagIds: ['1'],
    type: 'text',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '2',
    title: 'Binary Search Algorithm',
    content: '# Binary Search\n\nEfficient search algorithm for sorted arrays.',
    summary: 'Implementation and analysis of binary search',
    subjectId: '2',
    tagIds: ['3'],
    type: 'text',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '3',
    title: 'Sprint Planning Notes',
    content:
      '# Sprint Planning - Week 3\n\n- Feature A: In progress\n- Bug fixes: Complete',
    summary: 'Weekly sprint planning meeting notes',
    subjectId: '3',
    tagIds: ['5'],
    type: 'text',
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02'),
  },
];
