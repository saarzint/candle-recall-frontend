'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import pencilIcon from '@/assets/icons/pencil.svg';
import ellipsisIcon from '@/assets/icons/ellipsis-horizontal.svg';
import attachmentIcon from '@/assets/icons/attachment.svg';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function NewReportContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDarkMode = theme === 'dark';

  const [title, setTitle] = useState('Title');
  const [content, setContent] = useState('Write something to start entering your report.');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [createdDate] = useState('Jul 14 2025');
  const [modifiedDate] = useState('Jul 15 2025');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);

  // Close attachment menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (attachmentMenuRef.current && !attachmentMenuRef.current.contains(event.target as Node)) {
        setShowAttachmentMenu(false);
      }
    };

    if (showAttachmentMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAttachmentMenu]);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving new report:', { title, content, tags, uploadedFiles });
    // Redirect to reports list or the new report detail page
    router.push('/reports');
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)]);
      setShowAttachmentMenu(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto w-full mb-6">
        {/* Title and Actions */}
        <div className="flex items-start justify-between mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`text-3xl font-bold bg-transparent border-b-2 border-border focus:outline-none focus:border-primary flex-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            placeholder="Enter report title"
          />

          <div className="flex items-center gap-2 ml-4">
            {/* Attachment Icon with Dropdown */}
            <div className="relative" ref={attachmentMenuRef}>
              <button
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-2 rounded-lg hover:bg-sidebar-foreground transition-colors"
                aria-label="Attachment options"
              >
                <Image
                  src={attachmentIcon}
                  alt="Attachment"
                  width={20}
                  height={20}
                  className={isDarkMode ? '' : 'brightness-0'}
                />
              </button>

              {/* Attachment Dropdown Menu */}
              {showAttachmentMenu && (
                <div className={`absolute right-0 top-12 w-64 rounded-lg shadow-lg border border-border z-50 ${
                  isDarkMode ? 'bg-[#27272A]' : 'bg-white'
                }`}>
                  <div className="p-2">
                    <div className={`px-3 py-2 text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Include attachment
                    </div>

                    <label className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-sidebar-foreground transition-colors ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="text-sm">Upload a file</span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        multiple
                      />
                    </label>

                    <button className={`flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-sidebar-foreground transition-colors ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="12" y1="18" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="9" y1="15" x2="15" y2="15" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="text-sm">Upload a report</span>
                      <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 rounded-lg hover:bg-sidebar-foreground transition-colors">
              <Image
                src={ellipsisIcon}
                alt="More options"
                width={20}
                height={20}
                className={isDarkMode ? '' : 'brightness-0'}
              />
            </button>

            <button
              onClick={() => router.push('/reports')}
              className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-sidebar-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Created time</span>
            <span className="text-foreground font-medium">{createdDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Last modify</span>
            <span className="text-foreground font-medium">{modifiedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Stock tags</span>
            <span className="text-muted-foreground text-xs">
              {tags.length === 0 ? 'Empty' : ''}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium border border-border flex items-center gap-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-destructive transition-colors"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tag and press Enter"
            className={`px-3 py-1 text-xs bg-transparent border border-dashed border-border rounded-full focus:outline-none focus:border-primary ${
              isDarkMode ? 'text-gray-300 placeholder-gray-600' : 'text-gray-700 placeholder-gray-400'
            }`}
          />
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2 text-muted-foreground">
              Attachments ({uploadedFiles.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-border ${
                    isDarkMode ? 'bg-[#18181B]' : 'bg-gray-50'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="ml-2 hover:text-destructive transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto w-full">
          <div
            className={`rounded-xl p-6 ${
              isDarkMode ? 'bg-[#18181B]' : 'bg-white'
            }`}
            data-color-mode={isDarkMode ? 'dark' : 'light'}
          >
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={600}
              preview="live"
              hideToolbar={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
