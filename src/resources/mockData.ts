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

export const mockDocuments: { [id: string]: Note } = {
  '1': {
    id: '1',
    title:
      'Aligning Machiavellian Agents: Behavior Steering via Test-Time Policy Shaping',
    summary:
      'The document discusses the challenge of aligning decision-making AI agents with human values in complex environments, particularly focusing on pre-trained agents that may exhibit harmful, Machiavellian behaviors when trained solely to maximize rewards. It presents a novel approach called test-time policy shaping that utilizes model-guided policy modification to better align agent behaviors with ethical norms without the need for extensive retraining.',
    keyPoints: [
      'AI agents trained solely for reward maximization can exhibit harmful Machiavellian behaviors',
      'Retraining pre-trained agents for alignment is costly and time-consuming',
      'Test-time policy shaping offers a novel approach to align agents without retraining',
      'The method uses model-guided policy modification to maintain ethical norms',
      'Evaluation conducted on MACHIAVELLI benchmark with diverse agent scenarios',
    ],
    content: `# Aligning Machiavellian Agents: Behavior Steering via Test-Time Policy Shaping

## Authors
Dena Mujtaba, Brian Hu, Anthony Hoogs, Arslan Basharat

## Abstract
The deployment of decision-making AI agents presents a critical challenge in maintaining alignment with human values or guidelines while operating in complex, dynamic environments. Agents trained solely to achieve their objectives may exhibit harmful, Machiavellian behaviors when trained solely to maximize the reward function and maintaining the alignment. For the pre-trained agents, ensuring alignment is particularly challenging, as retraining can be a costly and slow process.

## Introduction
Recent advances in artificial intelligence (AI) have led to the widespread adoption of large language models (LLMs) in high-stakes settings such as clinical diagnostic support and financial risk assessment. This accelerated deployment of AI agents concerns about the potential risks and ethical implications of using such models, which are often trained to optimize a specific reward or objective function.

## Key Contributions
- A novel test-time, model-guided policy shaping approach for aligning text-based agents trained to maximize reward
- A thorough evaluation on the MACHIAVELLI benchmark, covering a diverse set of agents`,
    subjectId: '2',
    tagIds: ['3'],
    type: 'text',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
};

// Function to get all documents including uploaded ones
export const getAllDocuments = (): { [id: string]: Note } => {
  const uploadedDocs = JSON.parse(
    localStorage.getItem('uploadedDocuments') || '{}'
  );

  // Convert uploaded docs to Note format
  const convertedUploadedDocs: { [id: string]: Note } = {};
  Object.entries(uploadedDocs).forEach(([id, doc]: [string, any]) => {
    convertedUploadedDocs[id] = {
      ...doc,
      content: '', // Will be loaded separately
      summary: doc.summary || 'Uploaded document - summary will be generated',
      keyPoints: doc.keyPoints || [],
      subjectId: '2', // Default to Computer Science
      tagIds: [],
      type: 'text' as const,
      createdAt: new Date(doc.uploadedAt || Date.now()),
      updatedAt: new Date(doc.uploadedAt || Date.now()),
    };
  });

  return { ...mockDocuments, ...convertedUploadedDocs };
};

// Function to get document content from backend
export const getDocumentContent = async (filename: string): Promise<string> => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/document/${filename}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch document content');
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching document content:', error);
    return 'Error loading document content';
  }
};
