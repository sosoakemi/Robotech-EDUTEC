# Backend RoboTech (versão simples)

API em Node.js + Express que utiliza um arquivo JSON local para guardar usuários e informações do jogo educativo.

## 🧱 Recursos disponíveis

| Recurso | Método e rota | Descrição |
| ------- | ------------- | --------- |
| Cadastro de usuários | `POST /usuarios` | Cria um novo usuário com nome, email e senha |
| Registrar dados de jogo | `POST /usuarios/:id/jogos` | Salva um registro de participação no jogo para o usuário |
| Alterar senha | `PUT /usuarios/:id/senha` | Atualiza a senha do usuário após validar a senha atual |
| Excluir conta | `DELETE /usuarios/:id` | Remove o usuário e suas informações do arquivo JSON |
| Consultar usuário | `