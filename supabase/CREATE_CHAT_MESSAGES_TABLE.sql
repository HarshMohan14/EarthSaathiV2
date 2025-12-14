-- CHAT MESSAGES TABLE
-- Stores messages from the "Let's Chat" feature

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  message TEXT NOT NULL,
  sender_name TEXT,
  sender_email TEXT,
  sender_type TEXT NOT NULL DEFAULT 'user', -- 'user' or 'admin'
  status TEXT DEFAULT 'new', -- 'new', 'read', 'replied', 'archived'
  session_id TEXT, -- To group messages from same chat session
  attachments JSONB DEFAULT '[]'::jsonb, -- Store file info as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_status ON chat_messages(status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);

-- Create trigger for updated_at
CREATE TRIGGER update_chat_messages_updated_at BEFORE UPDATE ON chat_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can insert (users can send messages)
CREATE POLICY "Public can insert chat messages" ON chat_messages
    FOR INSERT WITH CHECK (true);

-- Public can read their own messages (optional, for user to see their sent messages)
-- For now, we'll allow public read for simplicity, but you can restrict this
CREATE POLICY "Public can read chat messages" ON chat_messages
    FOR SELECT USING (true);

-- Allow all operations for admin (will be handled by service role key)
-- For anon key, we'll allow full CRUD for simplicity in admin panel
CREATE POLICY "Allow all operations on chat messages" ON chat_messages
    FOR ALL USING (true) WITH CHECK (true);

