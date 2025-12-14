-- Add submission_type field to contact_submissions table
-- This allows distinguishing between regular contact submissions and quote requests

-- Add the column if it doesn't exist
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS submission_type TEXT DEFAULT 'contact' CHECK (submission_type IN ('contact', 'quote_request'));

-- Add phone and company fields for quote requests
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS phone TEXT;

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS company TEXT;

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS service TEXT;

-- Create index for filtering
CREATE INDEX IF NOT EXISTS idx_contact_submissions_type ON contact_submissions(submission_type);

-- Update existing records to have 'contact' as default type
UPDATE contact_submissions 
SET submission_type = 'contact' 
WHERE submission_type IS NULL;

