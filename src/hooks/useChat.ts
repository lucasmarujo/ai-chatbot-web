import { useState, useCallback } from 'react';
import { ChatState, Conversation, Message } from '@/types/chat';
import { fetchChatCompletion } from '@/components/ChatBotInferece';
import { initialPrompt } from '@/components/initialprompt';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    conversations: [],
    activeConversationId: null,
    isLoading: false,
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'Nova Conversa',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      conversations: [newConversation, ...prev.conversations],
      activeConversationId: newConversation.id,
    }));

    return newConversation.id;
  }, []);

  const selectConversation = useCallback((conversationId: string) => {
    setChatState(prev => ({
      ...prev,
      activeConversationId: conversationId,
    }));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const activeId = chatState.activeConversationId;
    if (!activeId) return;

    const userMessage: Message = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    // Adiciona a mensagem do usuário
    setChatState(prev => ({
      ...prev,
      conversations: prev.conversations.map(conv =>
        conv.id === activeId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              title: conv.messages.length === 0 ? content.slice(0, 50) + '...' : conv.title,
              updatedAt: new Date(),
            }
          : conv
      ),
      isLoading: true,
    }));

    try {
      // Monta o histórico para o modelo: initialPrompt + mensagens da conversa
      const conversation = chatState.conversations.find(conv => conv.id === activeId);
      const history = [
        ...initialPrompt,
        ...(conversation ? conversation.messages : []),
        userMessage
      ].map(m => ({
        role: m.role,
        content: m.content,
      }));

      // Chama o modelo real
      const aiContent = await fetchChatCompletion(history);

      const assistantMessage: Message = {
        id: generateId(),
        content: aiContent,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        conversations: prev.conversations.map(conv =>
          conv.id === activeId
            ? {
                ...conv,
                messages: [...conv.messages, assistantMessage],
                updatedAt: new Date(),
              }
            : conv
        ),
        isLoading: false,
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        conversations: prev.conversations.map(conv =>
          conv.id === activeId
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    id: generateId(),
                    content: "Ocorreu um erro ao obter resposta da IA.",
                    role: "assistant",
                    timestamp: new Date(),
                  }
                ],
                updatedAt: new Date(),
              }
            : conv
        ),
        isLoading: false,
      }));
    }
  }, [chatState.activeConversationId, chatState.conversations]);

  const activeConversation = chatState.conversations.find(
    conv => conv.id === chatState.activeConversationId
  );

  return {
    conversations: chatState.conversations,
    activeConversation,
    isLoading: chatState.isLoading,
    createNewConversation,
    selectConversation,
    sendMessage,
  };
};
