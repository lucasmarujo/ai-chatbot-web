
## 💡 Como funciona

- O usuário inicia uma conversa digitando sua mensagem.
- O histórico é enviado para o modelo Llama-4 Maverick via Azure AI Inference.
- O assistente responde sempre em português, de forma educada e objetiva.
- O usuário pode criar novas conversas e navegar entre elas.

## 📦 Scripts Disponíveis

- `dev` — Inicia o servidor de desenvolvimento.
- `build` — Gera a build de produção.
- `preview` — Visualiza a build de produção localmente.
- `lint` — Executa o linter.

## 📝 Personalização

- Para alterar o prompt inicial do assistente, edite o arquivo:
  ```
  src/components/initialprompt.tsx
  ```

## ▶️ Como usar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/ai_chatbot_by_lucas.git
   cd chat-cloud-story
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo chamado `.env` na raiz do projeto com o seguinte conteúdo:
     ```
     VITE_GITHUB_TOKEN=seu_token_github_models
     ```
   - Substitua `seu_token_github_models` pelo token de acesso ao serviço do Github Models.

4. **Inicie o projeto em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

Pronto! Agora você pode começar a conversar com o assistente de IA.

## 🧑‍💻 Autor

- **Lucas Marujo**
- [LinkedIn](https://www.linkedin.com/in/lucasmarujo/)

---

> Projeto desenvolvido para estudos e demonstração de integração com IA generativa em aplicações web modernas.
