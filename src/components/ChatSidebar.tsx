import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MessageSquare } from 'lucide-react';
import { Conversation } from '@/types/chat';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onConversationSelect: (conversationId: string) => void;
  onNewConversation: () => void;
  isMobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewConversation,
  isMobile = false,
  open = false,
  onClose,
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const groupConversationsByDate = (conversations: Conversation[]) => {
    const groups: { [key: string]: Conversation[] } = {};
    
    conversations.forEach(conv => {
      const date = formatDate(conv.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(conv);
    });
    
    return groups;
  };

  const groupedConversations = groupConversationsByDate(conversations);

  // Se for mobile, exibe como drawer/modal
  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } bg-black/40`}
        style={{ display: open ? 'block' : 'none' }}
        onClick={onClose}
      >
        <div
          className="w-64 bg-muted border-r border-border h-full flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 flex justify-between items-center">
            <span className="font-bold">Conversas</span>
            <button
              className="text-lg px-2 py-1"
              onClick={onClose}
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
          <div className="p-4">
            <Button 
              onClick={onNewConversation}
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <MessageSquare className="h-4 w-4" />
              Nova Conversa
            </Button>
          </div>
          
          <Separator />
          
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-4 py-4">
              {Object.entries(groupedConversations).map(([date, convs]) => (
                <div key={date} className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
                    {date}
                  </h3>
                  <div className="space-y-1">
                    {convs.map((conversation) => (
                      <Button
                        key={conversation.id}
                        variant={activeConversationId === conversation.id ? "secondary" : "ghost"}
                        className="w-full justify-start text-left h-auto p-3 whitespace-normal"
                        onClick={() => onConversationSelect(conversation.id)}
                      >
                        <div className="truncate text-sm">
                          {conversation.title}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  // Desktop: sidebar fixa
  return (
    <div className="w-64 bg-muted/30 border-r border-border h-full flex flex-col">
      <div className="p-4">
        <Button 
          onClick={onNewConversation}
          className="w-full justify-start gap-2"
          variant="outline"
        >
          <MessageSquare className="h-4 w-4" />
          Nova Conversa
        </Button>
      </div>
      
      <Separator />
      
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-4 py-4">
          {Object.entries(groupedConversations).map(([date, convs]) => (
            <div key={date} className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
                {date}
              </h3>
              <div className="space-y-1">
                {convs.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant={activeConversationId === conversation.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-left h-auto p-3 whitespace-normal"
                    onClick={() => onConversationSelect(conversation.id)}
                  >
                    <div className="truncate text-sm">
                      {conversation.title}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
