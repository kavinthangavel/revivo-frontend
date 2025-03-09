'use client'

import { useState } from 'react'
import { Card, Button, Container, Input } from '@nextui-org/react'
import ImageUpload from '@/components/search/ImageUpload'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [searchUrl, setSearchUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleImageSelect = (file) => {
    setSelectedImage(file)
  }

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    if (searchUrl) {
      // Handle URL search
      console.log('Searching with URL:', searchUrl)
    }
  }

  const handleSearch = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    try {
      // TODO: Implement search functionality
      console.log('Searching with image:', selectedImage)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-8">
      <Container>
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Reverse Image Search</h1>
            <p className="text-xl text-gray-600">
              Search across multiple engines to find similar images
            </p>
          </div>

          <Card className="p-4">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <Input
                type="url"
                label="Image URL"
                placeholder="https://example.com/image.jpg"
                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
              />
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
              >
                Search with URL
              </Button>
            </form>
          </Card>

          <div className="text-center text-gray-500">OR</div>

          <ImageUpload onImageSelect={handleImageSelect} />

          {selectedImage && (
            <div className="flex justify-center">
              <Button
                color="primary"
                size="lg"
                onClick={handleSearch}
                isLoading={isLoading}
              >
                Search with Selected Image
              </Button>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}