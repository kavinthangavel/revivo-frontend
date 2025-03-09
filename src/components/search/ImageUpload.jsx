'use client'

import { useCallback, useState } from 'react'
import { Card, Button } from '@nextui-org/react'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

export default function ImageUpload({ onImageSelect }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        onImageSelect(file)
      }
    }
  }, [onImageSelect])

  const handleChange = useCallback((e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith('image/')) {
        onImageSelect(file)
      }
    }
  }, [onImageSelect])

  return (
    <Card>
      <div
        className={`image-upload-zone ${dragActive ? 'border-primary bg-primary/5' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="image-input"
        />
        <label htmlFor="image-input" className="cursor-pointer">
          <div className="flex flex-col items-center gap-4">
            <CloudArrowUpIcon className="w-12 h-12 text-gray-400" />
            <div className="text-lg font-semibold">
              Drag and drop your image here or click to browse
            </div>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF (Max 5MB)
            </p>
            <Button color="primary" variant="flat">
              Select Image
            </Button>
          </div>
        </label>
      </div>
    </Card>
  )
}