import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Leaf, X, SendHorizonal, Paperclip, SmilePlus, CheckCheck } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';
import logo from "/Logo.png"

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [saving, setSaving] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && attachments.length === 0) return;

    // If first message and no user info, show form
    if (messages.length === 0 && !userInfo.name && !userInfo.email) {
      setShowForm(true);
      return;
    }

    setSaving(true);

    // Add user message locally
    const newMessage = {
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: [...attachments],
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    const messageText = inputText;
    const messageAttachments = [...attachments];
    setInputText("");
    setAttachments([]);

    // Upload attachments to Supabase Storage and save message
    try {
      const { supabase } = await import('../utils/supabase');
      const { supabaseChatAPI } = await import('../utils/supabaseApi');
      
      // Upload files to Supabase Storage
      const uploadedAttachments = [];
      
      if (supabase && messageAttachments.length > 0) {
        for (const file of messageAttachments) {
          try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${sessionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
            const filePath = `chat-attachments/${fileName}`;
            
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('chat-files')
              .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
              });
            
            if (uploadError) {
              console.error('Error uploading file:', uploadError);
              // Still save file metadata even if upload fails
              uploadedAttachments.push({
                name: file.name,
                size: file.size,
                type: file.type,
                url: null,
                error: 'Upload failed'
              });
            } else {
              // Get public URL
              const { data: { publicUrl } } = supabase.storage
                .from('chat-files')
                .getPublicUrl(filePath);
              
              uploadedAttachments.push({
                name: file.name,
                size: file.size,
                type: file.type,
                url: publicUrl,
                path: filePath
              });
            }
          } catch (fileError) {
            console.error('Error processing file:', fileError);
            uploadedAttachments.push({
              name: file.name,
              size: file.size,
              type: file.type,
              url: null,
              error: 'Processing failed'
            });
          }
        }
      } else if (messageAttachments.length > 0) {
        // If Supabase not configured, just save metadata
        uploadedAttachments.push(...messageAttachments.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: null,
          error: 'Storage not configured'
        })));
      }
      
      // Save message with attachment URLs
      await supabaseChatAPI.create({
        message: messageText,
        sender_name: userInfo.name || null,
        sender_email: userInfo.email || null,
        sender_type: 'user',
        status: 'new',
        session_id: sessionId,
        attachments: uploadedAttachments
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
      // Continue even if save fails - message is already shown to user
    } finally {
      setSaving(false);
    }

    // Simulate message read after 2 seconds
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg === newMessage ? {...msg, status: 'read'} : msg
      ));
    }, 2000);

    // Add bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thank you for your message! Our Team will respond shortly.", 
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.name.trim() && !userInfo.email.trim()) {
      alert('Please provide at least your name or email');
      return;
    }
    setShowForm(false);
    // Trigger send after form is submitted
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSend(fakeEvent);
    }, 100);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const addEmoji = (emoji) => {
    setInputText(prev => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="chat-open"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="w-80 bg-white rounded-xl shadow-2xl border border-[#01DC98]/30 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#021358] p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded-full">
                 <img src="/Logo.png" className="h-10  rounded-full" alt="earthSaathi" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">EarthSaathi</h2>
                  <p className="text-xs text-[#01DC98]">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-[#01DC98] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info Form */}
            {showForm && (
              <div className="p-4 bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm border-b">
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#01DC98] text-gray-900 placeholder:text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Your email (optional)"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#01DC98] text-gray-900 placeholder:text-gray-400"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#01DC98] text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                      Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setUserInfo({ name: '', email: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Skip
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Messages */}
            <div className="h-96 p-4 overflow-y-auto space-y-3 bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
              {messages.length === 0 && !showForm && (
                <div className="text-center py-8 text-gray-600">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-[#01DC98]" />
                  <p className="text-sm">Start a conversation with us!</p>
                </div>
              )}
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex flex-col gap-1 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-[#01DC98] text-white rounded-br-none' 
                          : 'bg-white text-[#021358] rounded-bl-none'
                      }`}
                    >
                      {message.attachments?.length > 0 && (
                        <div className="mb-2 space-y-2">
                          {message.attachments.map((file, i) => (
                            <div key={i} className="p-2 bg-black/10 rounded-lg break-words">
                              <div className="flex items-start gap-2">
                                <Paperclip className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span className="text-sm break-words break-all min-w-0">{file.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {message.text}
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs opacity-70">{message.time}</span>
                        {message.sender === 'user' && (
                          <CheckCheck className={`w-3 h-3 ${
                            message.status === 'read' ? 'text-blue-400' : 'text-white/50'
                          }`} />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-2 bg-white border-t">
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 mb-2 bg-gray-100 rounded-lg">
                  {attachments.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 px-2 py-1 text-sm bg-white rounded max-w-full">
                      <Paperclip className="w-4 h-4 flex-shrink-0" />
                      <span className="break-words break-all min-w-0 text-xs">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleSend} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message"
                    className="w-full pl-4 pr-12 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#01DC98]"
                  />
                  
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-[#021358] hover:text-[#01DC98] transition-colors"
                    >
                      <SmilePlus className="w-5 h-5" />
                    </button>
                    <label className="cursor-pointer text-[#021358] hover:text-[#01DC98] transition-colors">
                      <Paperclip className="w-5 h-5" />
                      <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#01DC98] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <SendHorizonal className="w-5 h-5" />
                  )}
                </button>
              </form>

              {showEmojiPicker && (
                <div className="absolute bottom-16 right-0">
                  <EmojiPicker
                    onEmojiClick={addEmoji}
                    skinTonesDisabled
                    searchDisabled
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="chat-closed"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#01DC98] text-white font-semibold flex items-center gap-2 openSans p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
            aria-label="Open chat"
          >
            Let's Chat 
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbox;
