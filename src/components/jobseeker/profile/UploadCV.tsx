import React from 'react'
import { UploadButton } from '@utils/uploadthing'
import "@uploadthing/react/styles.css";

function UploadCV() {
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);

  return (
    <div className='flex flex-col'>
      {!fileUrl && (
        <div className='self-start'>
          <UploadButton
            endpoint='pdfUploader'
            onClientUploadComplete={(res) => {
              if(Array.isArray(res) && res.length > 0 && res[0]?.fileUrl) {
                setFileUrl(res[0]?.fileUrl)
              }
              else {
                throw new Error('upload error')
              }
            }}
            onUploadError={() => {
              alert('upload error')
            }}
          />
        </div>
      )}
      {fileUrl && (
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
              <iframe
                src={fileUrl}
                className='w-full h-96'
              />
          </div>
          <div className='flex justify-end'>
            <button
              onClick={() => {
                setFileUrl(null)
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadCV