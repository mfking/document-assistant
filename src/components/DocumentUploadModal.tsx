import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, VStack, Text, HStack, Box } from '@chakra-ui/react';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
  DialogActionTrigger,
} from './ui/dialog';
import { mockSubjects } from '../resources/mockData';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: (documentId: string) => void;
}

const colorOptions = [
  '#3182CE', // blue
  '#38A169', // green
  '#D69E2E', // yellow
  '#E53E3E', // red
  '#805AD5', // purple
  '#DD6B20', // orange
  '#319795', // teal
  '#D53F8C', // pink
];

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [subjectInput, setSubjectInput] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isNewSubject, setIsNewSubject] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if the entered subject exists and update color accordingly
  useEffect(() => {
    const existingSubject = Object.values(mockSubjects).find(
      (subject) => subject.name.toLowerCase() === subjectInput.toLowerCase()
    );

    if (existingSubject) {
      setSelectedColor(existingSubject.color);
      setIsNewSubject(false);
    } else {
      setIsNewSubject(true);
    }
  }, [subjectInput]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    if (!subjectInput.trim()) {
      console.error('Please enter a subject name');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('document', selectedFile);
      formData.append('subjectName', subjectInput.trim());
      formData.append('subjectColor', selectedColor);

      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const document = await response.json();

      // Store document metadata in localStorage
      const existingDocs = JSON.parse(
        localStorage.getItem('uploadedDocuments') || '{}'
      );
      existingDocs[document.id] = {
        ...document,
        subjectName: subjectInput.trim(),
        subjectColor: selectedColor,
      };
      localStorage.setItem('uploadedDocuments', JSON.stringify(existingDocs));

      console.log('Document uploaded successfully');
      onUploadSuccess?.(document.id);
      handleClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setSubjectInput('');
    setSelectedColor(colorOptions[0]);
    setIsNewSubject(true);
    setShowColorPicker(false);
    setShowSubjectDropdown(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => !details.open && handleClose()}
    >
      <DialogContent maxW="md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack spaceY={6} align="stretch">
            <Box>
              <Text mb={3} fontWeight="semibold">
                Select File
              </Text>
              <Box
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
                p={6}
                textAlign="center"
                bg="gray.50"
                _hover={{ borderColor: 'gray.400', bg: 'gray.100' }}
                cursor="pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md"
                  onChange={handleFileSelect}
                  display="none"
                />
                {selectedFile ? (
                  <VStack spaceY={2}>
                    <Text fontWeight="medium">{selectedFile.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      Click to change file
                    </Text>
                  </VStack>
                ) : (
                  <VStack spaceY={2}>
                    <Text fontWeight="medium">Choose File</Text>
                    <Text fontSize="sm" color="gray.600">
                      Click to select a .txt or .md file
                    </Text>
                  </VStack>
                )}
              </Box>
            </Box>

            <Box position="relative">
              <Text mb={3} fontWeight="semibold">
                Subject
              </Text>
              <HStack spaceX={3} align="center">
                {/* Color circle on the left */}
                <Box position="relative">
                  <Box
                    w={10}
                    h={10}
                    bg={selectedColor}
                    borderRadius="full"
                    border="2px solid"
                    borderColor="gray.300"
                    cursor={isNewSubject ? 'pointer' : 'default'}
                    opacity={isNewSubject ? 1 : 0.8}
                    onClick={() =>
                      isNewSubject && setShowColorPicker(!showColorPicker)
                    }
                  />

                  {/* Color picker dropdown - positioned relative to the color circle */}
                  {showColorPicker && isNewSubject && (
                    <Box
                      position="absolute"
                      top="100%"
                      left="0"
                      mt={2}
                      bg="white"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                      p={3}
                      shadow="lg"
                      zIndex={1000}
                    >
                      <VStack spaceY={2}>
                        <HStack spaceX={2}>
                          {colorOptions.slice(0, 4).map((color) => (
                            <Box
                              key={color}
                              w={8}
                              h={8}
                              bg={color}
                              borderRadius="full"
                              cursor="pointer"
                              border={
                                selectedColor === color
                                  ? '3px solid'
                                  : '2px solid'
                              }
                              borderColor={
                                selectedColor === color
                                  ? 'gray.800'
                                  : 'gray.300'
                              }
                              onClick={() => {
                                setSelectedColor(color);
                                setShowColorPicker(false);
                              }}
                              _hover={{ transform: 'scale(1.1)' }}
                              transition="all 0.2s"
                            />
                          ))}
                        </HStack>
                        <HStack spaceX={2}>
                          {colorOptions.slice(4).map((color) => (
                            <Box
                              key={color}
                              w={8}
                              h={8}
                              bg={color}
                              borderRadius="full"
                              cursor="pointer"
                              border={
                                selectedColor === color
                                  ? '3px solid'
                                  : '2px solid'
                              }
                              borderColor={
                                selectedColor === color
                                  ? 'gray.800'
                                  : 'gray.300'
                              }
                              onClick={() => {
                                setSelectedColor(color);
                                setShowColorPicker(false);
                              }}
                              _hover={{ transform: 'scale(1.1)' }}
                              transition="all 0.2s"
                            />
                          ))}
                        </HStack>
                      </VStack>
                    </Box>
                  )}
                </Box>

                {/* Subject input with custom dropdown */}
                <Box flex={1} position="relative">
                  <Input
                    placeholder="Search existing subjects or type new subject name"
                    value={subjectInput}
                    onChange={(e) => {
                      setSubjectInput(e.target.value);
                      setShowSubjectDropdown(true);
                    }}
                    onClick={() => setShowSubjectDropdown(true)}
                    onBlur={() =>
                      setTimeout(() => setShowSubjectDropdown(false), 150)
                    }
                  />

                  {/* Custom subject dropdown */}
                  {showSubjectDropdown && (
                    <Box
                      position="absolute"
                      top="100%"
                      left="0"
                      right="0"
                      mt={1}
                      bg="white"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                      shadow="lg"
                      zIndex={1000}
                      maxH="200px"
                      overflowY="auto"
                    >
                      {Object.values(mockSubjects)
                        .filter(
                          (subject) =>
                            subjectInput.length === 0 ||
                            subject.name
                              .toLowerCase()
                              .includes(subjectInput.toLowerCase())
                        )
                        .map((subject) => (
                          <Box
                            key={subject.id}
                            p={3}
                            cursor="pointer"
                            _hover={{ bg: 'gray.100' }}
                            onClick={() => {
                              setSubjectInput(subject.name);
                              setShowSubjectDropdown(false);
                            }}
                          >
                            <HStack spaceX={3}>
                              <Box
                                w={4}
                                h={4}
                                bg={subject.color}
                                borderRadius="full"
                              />
                              <Text>{subject.name}</Text>
                            </HStack>
                          </Box>
                        ))}

                      {/* Show "Create new subject" option if no exact match and user has typed something */}
                      {!Object.values(mockSubjects).some(
                        (subject) =>
                          subject.name.toLowerCase() ===
                          subjectInput.toLowerCase()
                      ) &&
                        subjectInput.trim() && (
                          <Box
                            p={3}
                            cursor="pointer"
                            _hover={{ bg: 'blue.50' }}
                            borderTop="1px solid"
                            borderColor="gray.100"
                            onClick={() => setShowSubjectDropdown(false)}
                          >
                            <HStack spaceX={3}>
                              <Box
                                w={4}
                                h={4}
                                bg={selectedColor}
                                borderRadius="full"
                              />
                              <Text color="blue.600">
                                Create "{subjectInput}"
                              </Text>
                            </HStack>
                          </Box>
                        )}
                    </Box>
                  )}
                </Box>
              </HStack>

              {!isNewSubject && (
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Using existing subject color
                </Text>
              )}
            </Box>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            colorScheme="blue"
            onClick={handleUpload}
            loading={isUploading}
            loadingText="Uploading..."
          >
            Upload
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
