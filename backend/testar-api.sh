#!/bin/bash

# Script de Teste das APIs do Backend RoboTech
# Execute: chmod +x testar-api.sh && ./testar-api.sh

BASE_URL="http://localhost:5000/api/auth"
EMAIL="teste$(date +%s)@email.com"  # Email único
PASSWORD="senha123"
NEW_PASSWORD="novaSenha456"

echo "🚀 Testando APIs do Backend RoboTech"
echo "====================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Teste Health Check
echo "${BLUE}1. Health Check${NC}"
curl -s http://localhost:5000/health | jq '.'
echo ""
echo ""

# 2. Registrar usuário
echo "${BLUE}2. Registrando novo usuário...${NC}"
echo "Email: $EMAIL"
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/register \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Usuário Teste\",
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"role\": \"student\"
  }")

echo "$REGISTER_RESPONSE" | jq '.'
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.data.token')

if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
  echo "${GREEN}✅ Registro bem-sucedido!${NC}"
else
  echo "${RED}❌ Erro no registro${NC}"
  exit 1
fi
echo ""
echo ""

# 3. Obter perfil
echo "${BLUE}3. Obtendo perfil do usuário...${NC}"
curl -s -X GET $BASE_URL/me \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""
echo ""

# 4. Atualizar perfil
echo "${BLUE}4. Atualizando perfil...${NC}"
curl -s -X PUT $BASE_URL/perfil \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Teste Atualizado",
    "avatar": "https://avatar.exemplo.com/teste.jpg"
  }' | jq '.'
echo ""
echo ""

# 5. Verificar perfil atualizado
echo "${BLUE}5. Verificando perfil atualizado...${NC}"
curl -s -X GET $BASE_URL/me \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""
echo ""

# 6. Alterar senha
echo "${BLUE}6. Alterando senha...${NC}"
curl -s -X PUT $BASE_URL/senha \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"senhaAtual\": \"$PASSWORD\",
    \"novaSenha\": \"$NEW_PASSWORD\"
  }" | jq '.'
echo ""
echo ""

# 7. Testar login com nova senha
echo "${BLUE}7. Testando login com nova senha...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$NEW_PASSWORD\"
  }")

echo "$LOGIN_RESPONSE" | jq '.'
NEW_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.token')

if [ "$NEW_TOKEN" != "null" ] && [ ! -z "$NEW_TOKEN" ]; then
  echo "${GREEN}✅ Login com nova senha bem-sucedido!${NC}"
else
  echo "${RED}❌ Erro no login${NC}"
fi
echo ""
echo ""

# 8. Deletar conta
echo "${BLUE}8. Deletando conta...${NC}"
read -p "Deseja deletar a conta de teste? (s/n): " CONFIRM

if [ "$CONFIRM" = "s" ] || [ "$CONFIRM" = "S" ]; then
  curl -s -X DELETE $BASE_URL/conta \
    -H "Authorization: Bearer $NEW_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"senha\": \"$NEW_PASSWORD\",
      \"confirmacao\": \"DELETAR\"
    }" | jq '.'
  echo ""
  echo "${GREEN}✅ Conta deletada com sucesso!${NC}"
else
  echo "${BLUE}⏭️ Conta não deletada. Token salvo para uso:${NC}"
  echo "TOKEN=$NEW_TOKEN"
  echo "EMAIL=$EMAIL"
  echo "PASSWORD=$NEW_PASSWORD"
fi

echo ""
echo "====================================="
echo "${GREEN}✅ Testes concluídos!${NC}"

