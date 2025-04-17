import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Leaf, X, SendHorizonal, Paperclip, SmilePlus, CheckCheck } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
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

    // Add user message
    const newMessage = {
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: [...attachments],
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText("");
    setAttachments([]);

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
                <div className="p-2  rounded-full">
                 <img src="/earthSaathiFavicon.jpg" className="h-10  rounded-full" alt="earthSaathi" />
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

            {/* Messages */}
            <div className="h-96 p-4 overflow-y-auto space-y-3 bg-[#f0f2f5]">
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
                            <div key={i} className="p-2 bg-black/10 rounded-lg">
                              <Paperclip className="inline w-4 h-4 mr-2" />
                              <span className="text-sm">{file.name}</span>
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
                    <div key={i} className="flex items-center px-2 py-1 text-sm bg-white rounded">
                      <Paperclip className="w-4 h-4 mr-1" />
                      <span>{file.name}</span>
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
                  className="bg-[#01DC98] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  <SendHorizonal className="w-5 h-5" />
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
