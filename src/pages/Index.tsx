import React, { useEffect } from 'react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatArea } from '@/components/ChatArea';
import { useChat } from '@/hooks/useChat';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';

const Index = () => {
  const {
    conversations,
    activeConversation,
    isLoading,
    createNewConversation,
    selectConversation,
    sendMessage,
  } = useChat();

  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  useEffect(() => {
    // Criar conversa inicial se não houver nenhuma
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, [conversations.length, createNewConversation]);

  const handleSendMessage = (message: string) => {
    if (!activeConversation) {
      const newConversationId = createNewConversation();
      // Aguardar o próximo render para enviar a mensagem
      setTimeout(() => sendMessage(message), 0);
    } else {
      sendMessage(message);
    }
  };

  return (
    <div className="h-screen flex bg-background relative">
      {isMobile && (
        <button
          className="absolute top-4 left-4 z-30 bg-muted p-2 rounded-md shadow-md"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversation?.id || null}
        onConversationSelect={selectConversation}
        onNewConversation={createNewConversation}
        isMobile={isMobile}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className={`flex-1 h-full ${isMobile ? 'w-full' : ''}`}>
        <ChatArea
          messages={activeConversation?.messages || []}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
