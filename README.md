# Simulador do Macho 3D — Horta no Quintal do Alyffer

Jogo 3D em Three.js ambientado em Pau Arcado, Terminal Urbano de Campo Limpo Paulista (Ônibus 402 e Linha 7-Rubi) e campus da ETECAMP.

## Como executar localmente

O projeto funciona diretamente em qualquer servidor estático (inclusive GitHub Pages) ou abrindo `index.html` no navegador, sem precisar de build obrigatório:

```bash
# Opção 1: Python
python3 -m http.server 8080

# Opção 2: Node.js
npm run dev
```

Depois acesse `http://localhost:8080`.

## Estrutura do projeto

```text
alyffer-3d-game/
├── index.html               # Entrada principal (CSS/JS modulares + imagens WebP)
├── assets/
│   ├── profile.webp         # Avatar otimizado (WebP)
│   └── profile.jpg          # Fallback otimizado (JPEG progressivo)
├── styles/
│   ├── base.css             # Variáveis :root, reset e tipografia
│   ├── hud.css              # HUD principal, barras, toasts e prompts
│   ├── modals.css           # Overlays, lojas, calendário, sono e morte
│   ├── responsive.css       # Controles touch e layout mobile
│   └── phone.css            # Celular do Macho e popups 3D
├── src/
│   ├── core/                # dom.js, audio.js, engine.js, loop.js
│   ├── data/                # config.js (culturas, receitas, enxadas, 402)
│   ├── world/               # countryside.js, house.js, terminal.js, etec.js
│   ├── entities/            # player.js, farm.js
│   ├── systems/             # state.js, gameplay.js
│   ├── ui/                  # modals.js, phone.js, shops.js
│   └── input/               # controls.js
└── vendor/
    └── three.min.js         # Three.js local para funcionamento offline
```

## Principais controles

* **W / A / S / D** ou **Setas**: movimentação
* **E** ou **Espaço** (toque): ação contextual (arar, plantar, regar, colher, falar, embarcar)
* **R**: alternar ferramenta (Regador / Enxada)
* **Q / C** ou arrastar mouse: girar câmera
* **V**: alternar 1ª / 3ª pessoa
* **I**: inventário • **K**: calendário e horários do 402 • **P**: celular do Macho • **Esc**: pausar / fechar modais

## Otimizações aplicadas nesta versão

* Remoção da pasta `.git/` do pacote de distribuição (~3,3 MB economizados).
* Divisão do `game.js` monolítico em 17 módulos em `src/` e do `style.css` em 5 folhas em `styles/`.
* Remoção de `preserveDrawingBuffer: true` do `WebGLRenderer` e ajuste adaptativo de `pixelRatio` (1.5x) e sombras (`1024px`) em dispositivos móveis.
* Adição de `disposeObject3D()` na reconstrução de animais e galinhas para evitar vazamento de VRAM.
* Eliminação de alocações `new THREE.Vector3()` por frame em `updateCamera()`.
* Pausa automática do loop `requestAnimationFrame` quando a aba fica oculta (`visibilitychange`).
* `SoundFX` aprimorado com `masterGain`, controle de volume e persistência de mudo em `localStorage`.
* Avatar `assets/profile.jpg` redimensionado e convertido para `assets/profile.webp` com fallback `<picture>`.

## Correções e limpeza visual (v2)

* **Correção de crash na inicialização:** removida chamada prematura de `syncChickensToCount(3)` dentro de `src/world/countryside.js` (executada antes de `src/entities/farm.js` carregar).
* **Correção de animais invisíveis no save:** `loadSavedGame()` agora reconstrói corretamente as malhas 3D de vacas, ovelhas, porcos e galinhas ao recarregar o jogo.
* **Modais e controles mais estáveis:** criado `closeAllModals()` para impedir sobreposição de janelas, bloqueio durante sono/morte, teclas `I / T / K / G / L / O / P` agora alternam (abrem e fecham) o próprio modal, e correção de teclas de movimento presas fora do modo jogável.
* **Transição de sono segura:** timers do sono são rastreados e cancelados em caso de reinício ou morte (`clearSleepTimers()`).
* **Redução drástica do excesso de placas:** removidas ~48+ placas redundantes e etiquetas flutuantes em objetos, NPCs, animais e cercados; mantidos apenas os marcos principais reais (ônibus/trem, fachada da casa, plaquinha `402`, fachada do Terminal e plataforma 7-Rubi, portão `ETECAMP`, totem `Estação Botujuru` e plaquetas discretas nas portas das salas).
* **Loop de movimento Zero-GC:** eliminação de `new THREE.Vector2`/`Vector3` por frame em `updateGame(dt)`.

## Melhorias da v3 (Lojinhas 3D + Inventário & Hotbar Estilo Minecraft)

* **Modelos 3D das lojinhas reconstruídos e placas restauradas:** Bancas do Terminal, Quiosque do Pastel & Caldo de Cana, Loja da Estação CLP e Cooperativa Rural agora possuem 4 pilares completos até o chão (sem toldos flutuando), toldos listrados, detalhes no balcão (caixotes com hortaliças, estufa com pastéis, moenda de cana, painel traseiro com enxadas especiais, balde, tesoura, registradora e sacos de sementes) e suas respectivas placas bem encaixadas.
* **Inventário Unificado de 45 Slots (sem limite de stack):** todos os itens do jogo (regador, enxadas, tesoura, baldes, adubos do Kaio, vaselina, pacotes de sementes, colheitas, produtos animais e pratos cozidos) ficam em uma grade de 36 slots da mochila + 9 slots da Hotbar (`I`), com clique esquerdo (pegar/mover/empilhar/trocar), clique direito (dividir pilha pela metade ou colocar 1 unidade), `Shift+Clique` (transferência rápida), teclas `1–9` sobre um slot (troca direta com a Hotbar) e botão `✨ Organizar`.
* **Hotbar inferior (9 slots) + itens 3D na mão:** troca rápida pelas teclas `1–9`, roda do mouse (e `Shift + Scroll` para zoom) ou clique/toque; o personagem segura em 3D (em 3ª e 1ª pessoa) o regador, as enxadas, baldes, tesoura, frascos de adubo, vaselina, pacotes de sementes, hortaliças e pratos.

## Melhorias da v4 (Montaria na Onça, NPCs da ETECAMP e Balanceamento)

* **Montaria na Onça corrigida:** adicionada sela de couro, cinta, estribos e rédeas na Onça Domada (`src/world/countryside.js`); ajustada a altura do assento (`+0.37m`), deslocamento na sela, rotação correta das pernas abertas para fora (sem atravessar o corpo da onça), canelas acompanhando os estribos, braços segurando as rédeas e balanço sincronizado com o galope (`src/core/loop.js`, `src/systems/gameplay.js`).
* **Modelos 3D dos NPCs da ETECAMP aprimorados (`src/world/terminal.js`):** mantido o visual característico de cada personagem (incluindo B****** e T******* cabeçudas com corpo fino, óculos do Muzzonline/Marcelo e sobretudo do Kaio), agora com pescoço, orelhas, olhos com pupila/brilho, sobrancelhas, nariz, boca, óculos com armação vazada e lentes translúcidas, cabelos em camadas, mangas, cinto com fivela, tênis com solado, mochilas/acessórios e animação suave de idle na cabeça.
* **Spawn da Onça balanceado:** cooldown aumentado (150s inicial, 110s ao amanhecer, 210s após derrotar) e checagem reduzida de 30% a cada 6s para 9% (com animais) / 5% (sem animais) a cada 18s.

## Melhorias da v5 (Layout dos Banheiros/Corredor Horizontal da ETECAMP & NPCs)

* **Banheiros e Corredor Horizontal da ETECAMP (`src/world/etec.js`, `src/systems/gameplay.js`):** banheiros realocados encostados na parede externa do fundo (`x = +16`) e na parede divisória da Sala 1AI (`z = 0`) com profundidade reduzida (`6.2m`), deixando o **corredor horizontal à direita dos banheiros** (`z = 6.2..11.0`) e atravessando os **dois lados do corredor principal** (`x = -16..+16`, com `Lab. Química` ajustado para `z = 0..6.2`). As 2 pias/bebedouros foram rotacionadas voltadas para o corredor horizontal e tiveram suas coordenadas de interação atualizadas; removida a abertura preta nas paredes externas com janelões claros nas duas pontas do corredor.
* **Professor Marcelo (`src/world/terminal.js`, `src/world/etec.js`, `src/world/countryside.js`, `src/ui/modals.js`):** visual atualizado para professor normal de meia idade (camisa cinza com gola e bolsinho, calça jeans azul, cabelo grisalho lateral com topo calvo e óculos quadrados, sem colete tático ou rádio), mantendo intactas as vendas de vaselina e a ajuda contra onças no sítio.
* **Muzzonline e Pão (`src/world/terminal.js`, `src/world/etec.js`):** removidas as duas listras estranhas (alças) do torso; Muzzonline agora usa **moletom cinza** (mangas compridas, capuz e bolso canguru) e Pão agora usa **óculos pretos** e **camisa da ETEC vermelho e preto**.

## Melhorias da v6 (Expansão da ETECAMP sem cortar Labs + Banheiros fiéis ao croqui)

* **Expansão do prédio da ETECAMP (`84 m` em Z, `z = -33..+51`):** nenhum laboratório ou sala foi reduzido — o **Lab. de Química** foi restaurado com tamanho integral (`13m × 12,2m`), todas as outras salas/labs mantêm `11m × 12,2m`, e o **Corredor Horizontal** (`z = 13..18`, `5m` de largura) foi inserido em faixa dedicada atravessando os **dois lados** do Corredor Principal (`x = -16..+16`).
* **Banheiros F/M fiéis ao croqui (`z = 0..13`, `x = 3.8..16.0`):**
  * Encostados na parede externa do fundo (`x = 16.0`) igual às outras salas.
  * Área aberta na frente (`x = 3.8..6.8`, `z = 3.6..9.4`) fazendo parte direta do Corredor Principal.
  * **Muro central** (`z = 6.5`, `x = 6.8..16.0`) encostado na parede do fundo dividindo o lado Feminino (esquerda) e o lado Masculino (direita).
  * **Pia grande com torneiras** em cada lado (espelhadas, com espelho e interação de beber água).
  * **Entradas abertas no fundo** (`x = 13.0..16.0`) dando acesso às áreas internas do Feminino (esquerda) e Masculino (direita).

## Melhorias da v7 (Placas fixadas, Zoom exclusivo no Scroll e Félix atualizado)

* **Fim das placas flutuantes (`src/world/etec.js`, `src/world/terminal.js`, `src/world/countryside.js`):** adicionada verga/parede superior (`y = 2.45..4.20`) e batente acima de todas as portas das salas/labs da ETECAMP com as plaquetas coladas rente à parede; adicionados suportes/hastes nas placas da Estação Botujuru, Linha 7-Rubi e nas 4 lojinhas.
* **Scroll exclusivo para zoom da câmera (`src/input/controls.js`):** a roda do mouse agora ajusta apenas a distância da câmera (`state.camDist`) e nunca altera o slot da hotbar/inventário.
* **Modelo 3D do Félix (`src/world/terminal.js`, `src/world/etec.js`):** cabelo reformulado para **grande e encaracolado** (`curly_big`) com volume na cabeça sem cair longo abaixo da nuca, e adição de **óculos retangulares metálicos cinza** (`metalRectGlasses`).

## Melhorias da v8 (FPS/InstancedMesh, Câmera Anti-Parede, Minimapa, Metas, Som Ambiente & Configurações)

* **Salto de FPS e renderização (`src/world/etec.js`, `src/core/engine.js`, `src/core/loop.js`):**
  * Todas as 81 carteiras, cadeiras e PCs da ETECAMP (~1.323 meshes) e as 200 gotas de chuva agora usam **`THREE.InstancedMesh`**, eliminando mais de **1.500 draw calls**.
  * Redução de 8 `PointLight` simultâneas no corredor da ETEC para 3 luzes estratégicas + luminárias instanciadas.
  * **Sombra dinâmica seguindo o jogador** (alinhada em grade de 2 m para não tremer), cobrindo todo o Pasto Oeste e Pasto Leste.
  * Eliminação de alocações `new THREE.Color()` por frame em `updateSkyAndTime()`.
* **Câmera anti-parede (Spring-Arm) & feedback de dano (`src/core/loop.js`, `src/systems/extras.js`):** a câmera em 3ª pessoa detecta paredes internas na Casa, Porão e ETECAMP para nunca atravessar o cenário; ataques da Onça agora disparam *screen shake* e flash vermelho.
* **Minimapa 2D, Próximo Ônibus 402 e Metas Diárias (`src/systems/extras.js`):** minimapa ao vivo (tecla `N`) mostrando canteiros, NPCs, Onça e pontos de interesse de todos os 6 locais, indicador do próximo Ônibus 402 e 3 metas diárias com recompensas em dinheiro e reputação.
* **Áudio ambiente, passos e música opcional (`src/core/audio.js`):** som procedural de chuva, brisa/grilos em Pau Arcado, ambiente urbano no Terminal, passos diferenciados (grama vs. piso duro) e música lo-fi procedural ativável nas configurações.
* **Configurações completas + Backup do Save (`index.html`, `src/systems/extras.js`):** menu de pausa agora inclui slider de volume, som ambiente, música lo-fi, qualidade de sombras (Alto/Médio/Desligado), chuva, minimapa e botões de **Exportar / Importar Save (JSON)**.
* **Inventário blindado e mais prático (`src/systems/inventory.js`, `shops.js`, `modals.js`, `gameplay.js`):** checagem de espaço (`canAddItemToInventory`) antes de cobrar em compras, suporte a **Drag-and-Drop** entre slots e botão rápido **"🌱 Comprar +5 Sementes"** direto no prompt ao ficar em um canteiro arado sem sementes na mão.

## Correções da v9 (Altura das portas e fechamento do teto da ETECAMP)

* **Vão do teto eliminado na escola inteira (`src/world/etec.js`):** todas as paredes internas (`addInteriorWall`), vergas acima das portas e paredes verdes frontais das salas/auditório agora sobem de `4,20 m` para **`4,82 m`**, encostando totalmente no teto (`y = 4,80 m`); o material do teto também recebeu acabamento claro sem reflexo esverdeado.
* **Portas proporcionais ao personagem (`src/world/etec.js`):** vão livre de todas as portas internas da ETECAMP elevado de `2,44 m` para **`3,45 m`** (folha azul de `3,38 m`, placa da sala a `3,90 m` e plaquetas dos banheiros a `3,15 m`), dando folga confortável acima do chapéu do Alyffer (`3,09 m`). As entradas externas do prédio no campus também foram elevadas para `3,40 m`.

## Melhorias da v10 (Jessy no Lago, Lanche da ETEC & Correções Finais)

* **Novo NPC no Lago ao lado da fazenda — Jessy (`src/world/countryside.js`, `src/ui/modals.js`, `src/systems/gameplay.js`, `src/core/loop.js`):**
  * Homem alto (~2 metros de estatura) tomando banho no **Lago de Pau Arcado** (acessível desde o Dia 1 pela trilha ao leste da Estrada do Garcia ou pela porteira do Pasto Leste), vestido com **camisa da ETEC (vermelho e preto)**, **bermuda preta** e **tênis preto** visível sob a água translúcida, com ondinhas animadas ao redor.
  * **Responde perguntas de matemática** (soma, subtração, multiplicação, divisão, potências, porcentagens como `25% de 240`, raízes como `raiz(144)` e equações de 1º grau como `2x + 6 = 14`) com avaliador seguro sem `eval()` — e solta **loucuras aleatórias** no meio das respostas!
  * **Lanche na borda do lago:** sobre uma pedra lisa ao lado do Jessy ficam uma **bolacha da ETEC de Campo Limpo** dentro de um **saco plástico transparente** amarrado e um **copo branco de leite com chocolate**.
* **Correções adicionais encontradas na auditoria:**
  * **Vão do teto da Casa do Alyffer corrigido (`src/world/house.js`):** divisórias internas subiram de `3,70 m` para `4,42 m`, encostando totalmente no forro (`y = 4,40 m`).
  * **Tecla `Esc` em campos de texto (`src/input/controls.js`):** agora fecha também o modal de NPC ao sair do campo de matemática do Jessy.
  * **Minimapa (`src/systems/extras.js`):** agora exibe o Lago de Pau Arcado, a trilha de acesso e o marcador do Jessy.

## Correções da v11 (Pular Cercas, Fim das Paredes Invisíveis, Jessy, Caneca & Montes)

* **Sem paredes invisíveis e cercas puláveis (`src/core/engine.js`, `src/world/countryside.js`, `src/core/loop.js`):** removidos os limites invisíveis apertados e colisores fantasma das expansões não compradas; todas as cercas do sítio e dos currais agora têm a propriedade `jumpable: true`, permitindo ao jogador **pular por cima de qualquer cerca com Espaço**.
* **Glitch visual da cabeça do Jessy corrigido (`src/world/countryside.js`, `src/core/loop.js`):** eliminada a coplanaridade/z-fighting entre cabelo, testa, olhos, boca e camisa; removida a oscilação vertical que fazia o rosto tremer e piscar branco.
* **Diálogo do Jessy simplificado (`src/ui/modals.js`):** removida a menção de "(bolacha com leite ao lado)" no cabeçalho/abertura e removidos os botões de exemplos de contas, deixando apenas a caixa limpa para digitar a conta e resolver.
* **Caneca branca com alça fora da água (`src/world/countryside.js`):** o copo virou uma **caneca branca com alça lateral** (`TorusGeometry` em "C") cheia de leite com chocolate, e a pedra com o saco transparente da bolacha da ETEC + caneca foi movida completamente para a margem seca fora da água.
* **Montes e árvores reposicionados (`src/world/countryside.js`):** o monte ao lado do lago que invadia a estrada e engolia uma árvore foi movido bem para trás (`x = 136`, fora de toda a área jogável, estrada, lago e árvores).

## Melhorias da v12 (Vegetação/Ambientação, Hitbox nas Árvores, Jessy Só Matemática & 1ª Pessoa Fluida em F4)

* **Vegetação, matos, flores e pedras (`src/world/countryside.js`):** ambientação rural completa dentro e fora da fazenda (280 tufos de capim, 62 arbustos em 2 camadas, 96 flores silvestres em 3 cores, 54 pedras pequenas instanciadas + 8 rochas grandes com colisor nos campos externos e lago), tudo otimizado via `THREE.InstancedMesh` mantendo alto FPS.
* **Todas as árvores com hitbox (`src/world/countryside.js`, `src/world/etec.js`):** removido o limite `|x| < 52` que deixava árvores externas sem colisor; todas as árvores da fazenda, arredores e campus da ETECAMP agora têm tronco sólido proporcional à escala.
* **Jessy focado apenas em Matemática (`src/ui/modals.js`, `src/systems/gameplay.js`):** removidas todas as loucuras e o botão aleatório; o diálogo exibe apenas o Jessy e a caixa limpa para digitar e resolver contas/equações de matemática.
* **Modo 1ª Pessoa totalmente reformulado (`src/core/loop.js`, `src/input/controls.js`, `src/systems/gameplay.js`, `index.html`):**
  * **Sem travamento ao andar:** removida a interpolação atrasada (`lerp`) de posição e o conflito de `lookAt`, usando posição travada com *headbob* sutil e rotação direta `YXZ`.
  * **Olhar livre com o mouse sem segurar clique:** suporte a **Pointer Lock** ao entrar em 1ª pessoa (com fallback automático de movimento livre do mouse e clique esquerdo pela mira central).
  * **Atalho `F4` e HUD mais limpo:** botão de 1ª Pessoa removido do topo da tela; agora **`F4`** entra e sai do modo 1ª pessoa instantaneamente.

## Melhorias da v13 (Console de Comandos `/`, Celular Comprável na Mão, Baú 3D, Jogar Ovos & HUD Limpo)

* **Console de Comandos (tecla `/`):** abra a barra de comandos apertando **`/`** e execute comandos como **`/money 99999`** (ou `/money +500`), `/give <item> [qtd]`, `/day <n>`, `/time <hora>`, `/tp <local>`, `/heal`, `/rain` e `/help`.
* **HUD mais limpo & fim da troca no `R`:** removidos da tela os 3 indicadores (`CESTA`, `ADUBO KAIO`, `REGADOR`), o botão de alternar Regador/Enxada e o botão livre do Celular; a tecla **`R`** não troca mais ferramentas (fica apenas para montar/descer da Onça), deixando a seleção de itens 100% na Hotbar (`1–9`).
* **Celular como item comprável no Terminal (`src/ui/shops.js`, `src/ui/modals.js`, `src/entities/player.js`, `src/ui/phone.js`):** o `📱 Celular do Macho` agora é comprado no Terminal CLP (R$ 180 na Loja da Estação ou nas Bancas), aparece em 3D na mão do jogador (1ª e 3ª pessoa) e só abre quando está segurado na mão (tecla `E` ou `T`).
* **Baú do Sítio no lugar da Composteira (`src/world/countryside.js`, `src/systems/inventory.js`):** composteira removida e substituída por um **Baú 3D de madeira com tampa articulada** e **36 slots de armazenamento com stack ilimitado**, com transferência rápida (`Shift+Clique`), arrastar-e-soltar e salvamento automático no `localStorage`.
* **Jogar Ovos (`src/systems/gameplay.js`, `src/core/loop.js`):** segure `🥚 Ovo Caipira` na mão e aperte **`E`** (ou **clique direito** no mapa / clique esquerdo em 1ª pessoa) para arremessar ovos 3D com arco de gravidade, partículas de gema/casca ao quebrar, dano de 12 HP na Onça, reações nos NPCs e 15% de chance de chocar um pintinho no quintal!

## Melhorias da v14 (Ragdoll do Orelha, Mouse 360° em 1ª Pessoa, Canteiros Compráveis, Maluquinho & Skin Padrão)

* **Orelha com Ragdoll & Modo Furioso Hitkill (`src/world/countryside.js`, `src/systems/gameplay.js`, `src/core/loop.js`):** chutar o Orelha (`X`) agora lança ele voando com física de ragdoll (gira nos 3 eixos, quica no chão, patas/orelhas soltas) e ele **nunca morre**; chutes repetidos podem deixá-lo **furioso** (olhos vermelhos brilhantes, corrida rápida atrás do jogador e **HITKILL** ao encostar).
* **Mouse travado 360° em 1ª Pessoa (`src/input/controls.js`, `src/systems/gameplay.js`, `src/core/loop.js`):** o mouse some da tela com Pointer Lock (girando 360° infinitamente sem bater na borda), com aviso clicável caso o navegador peça clique para travar e rotação contínua de borda como fallback.
* **Barra de comando limpa (`index.html`, `src/systems/extras.js`):** sem dicas, placeholders ou listas de comandos visíveis.
* **Economia de terrenos e canteiros de expansão (`src/systems/state.js`, `src/ui/shops.js`):** Pasto Oeste (`R$ 3.500`) e Fazenda Leste (`R$ 8.500`) agora vêm com seus 12 canteiros bloqueados para compra separada em lotes de +3 canteiros na Cooperativa, com preços reequilibrados.
* **Animação do Menino Maluquinho corrigida (`src/world/terminal.js`, `src/core/loop.js`):** rig reconstruído com braços pivotados nos ombros, pernas nos quadris com tênis acoplados e cabeça+panela articuladas em corrida natural.
* **Skin padrão do Alyffer melhorada (`src/entities/player.js`, `src/core/loop.js`):** cabelo completo sob o chapéu (nuca, laterais e topo), franja reta bem pequena na testa colada na aba do chapéu, além de olhos detalhados (esclera, pupila, brilho e sobrancelhas), nariz e boca redesenhada.

## Melhorias da v15 (Hitbox Orelha/Maluquinho, Chute no Maluquinho, Pointer Lock Real, Relógios 3D do 402 & Horizonte CLP)

* **Colisão sólida do Orelha (`src/core/engine.js`, `src/core/loop.js`, `src/world/countryside.js`):** adicionado `resolveEntityObstacles()` em todos os estados do Orelha (passeando, voando em ragdoll e perseguindo furioso), além de colisor no celeiro oeste — ele agora respeita e quica na casa, cercas, árvores e paredes.
* **Chutar o Menino Maluquinho (`src/world/terminal.js`, `src/systems/gameplay.js`, `src/core/loop.js`, `src/input/controls.js`):** agora é possível chutar o Maluquinho (`X` ou botão na tela) para afastá-lo voando em ragdoll pelo Terminal, com colisão sólida em `terminalObstacles` (sem atravessar bancas, colunas, ônibus ou paredes).
* **Jessy branco (`src/world/countryside.js`):** tom de pele do Jessy no lago ajustado para pele clara (`#f6dac4`).
* **Correção definitiva do mouse em 1ª Pessoa (`src/core/engine.js`, `src/systems/gameplay.js`, `src/input/controls.js`):** corrigido o bug em `IS_MOBILE_DEVICE` que classificava telas desktop/notebook com `< 768px` de altura como celular e bloqueava o Pointer Lock! Agora o mouse trava corretamente dentro do navegador em 360° infinito (inclusive em `F11`), sem sair da tela.
* **Relógios Digitais 3D do Ônibus 402 & HUD mais limpo (`index.html`, `src/core/engine.js`, `src/world/countryside.js`, `src/world/terminal.js`):** removidos o botão `Loja` do topo e o selo de horário do 402 do HUD; instalados relógios/painéis LED 3D ao vivo no **Ponto 402 em Pau Arcado** e na **Baia 402 do Terminal CLP** mostrando a hora atual e quantos minutos faltam para o próximo ônibus.
* **Horizonte de Campo Limpo Paulista + Ambientação Sul (`src/world/countryside.js`):** trocados os 6 arranha-céus por **apenas 2 prédios pequenos** e **sombras/silhuetas de casas** no horizonte, além de árvores, arbustos, mato, pedras e postes ao longo de toda a estrada sul.
* **Controles movidos para Configurações (`index.html`, `styles/hud.css`):** removida a faixa de texto abaixo da hotbar e adicionada uma grade organizada de controles dentro do menu de Pausa/Configurações (`⚙️` / `Esc`).

## Melhorias da v16 (Quadra & Telhado ETEC, Interior Expandido, TVs, Sala Maker, Sala dos Professores, Refeitório c/ Cardápio Semanal & Olhos)

* **Quadra & Telhado da ETECAMP (`src/world/etec.js`, `src/core/engine.js`):** piso verde substituído por **concreto cru desgastado sem cor** (textura procedural com manchas, rachaduras e marcações apagadas); poste/tabela removidos ficando **só o aro e a rede colados direto na parede**; corrigido o *z-fighting* da faixa vermelha do telhado.
* **Notificações limpas e reposicionadas (`styles/hud.css`, `src/systems/gameplay.js`, `src/core/loop.js`):** toasts centralizados no topo para nunca encavalar com o minimapa e removidas notificações inúteis de ações repetitivas (chutes normais no Orelha/Maluquinho, troca de 1ª pessoa, carinho, ovadas comuns etc.).
* **ETECAMP expandida por dentro (`40 m × 102 m`):** corredor principal de `9 m`, salas mais amplas (`15,5 m × 12 m`) com **12 carteiras/sala** (via `InstancedMesh`), mesa do professor, armários, bancos e plantas no corredor, **TV em todas as salas e labs**, nova **Sala Maker** (impressoras 3D, laser/CNC, bancadas, kits e ferramentas) e nova **Sala dos Professores** (mesa de reunião, cantinho do café, sofá e armários).
* **Refeitório com Cardápio por Dia da Semana + Fim de Semana Fechado (`src/world/etec.js`, `src/systems/inventory.js`, `src/entities/player.js`, `src/systems/gameplay.js`):**
  * **Segunda & Terça:** Bolacha da ETEC (*madeira prensada*) + Copo de Leite c/ Chocolate (**aumentam a insanidade**).
  * **Quarta:** Ração do Exército (pote circular pequeno com leite, sucrilhos e colher azul — **aumenta mais ainda a insanidade**).
  * **Quinta:** Canjica ou Arroz Doce (mesmo pote circular pequeno com colher azul — **aumenta a sanidade**).
  * **Sexta:** Bolo de Cenoura Recheado com Chocolate (**aumenta ainda mais a sanidade**).
  * **Sábado e Domingo:** a ETECAMP fica **fechada**!
* **Cor dos olhos atualizada:** todos os NPCs com **olhos marrons** (`#5c3416`), Alyffer com **marrom mais claro** (`#9a6536`) e Jessy com **verde quase marrom** (`#4f5d32`).

## Melhorias da v17 (Lago Fundo 3D, Jessy Dentro da Água & Jacaré Agressivo)

* **Lago com profundidade real (`src/world/countryside.js`, `src/systems/gameplay.js`, `src/core/loop.js`):** o terreno principal recebeu recorte circular real (`THREE.ShapeGeometry`) e uma bacia 3D escavada (`THREE.LatheGeometry`, `-1,68 m` de profundidade) com declive suave, pedras submersas e água translúcida (`y = -0,10 m`). O jogador pode entrar e caminhar dentro do lago com desaceleração na água, respingos e som de água.
* **Jessy dentro do lago fundo (`src/world/countryside.js`):** Jessy agora fica com os pés no fundo do lago (`y = -1,68 m`) e a água até a altura do peito (com seus tênis pretos visíveis sob a água translúcida e ondinhas na superfície), mantendo a bolacha da ETEC e a caneca branca de leite com chocolate na margem seca.
* **Jacaré 3D no lago (`src/world/countryside.js`, `src/core/loop.js`, `src/systems/gameplay.js`):** jacaré blindado com placas dorsais, olhos amarelos de réptil, mandíbula articulada com dentes brancos e cauda articulada nadando no lago — quando o jogador se aproxima da água ou da margem, ele persegue e ataca com mordidas (`-28 HP`, *screen shake* e tela de morte própria). Pode ser enfrentado e afugentado com a Enxada (`1–9` + `E`/clique) ou ovos.

## Melhorias da v18 (Reformulação Visual Completa: Sítio, Casa & ETECAMP)

* **Texturas procedurais de alta definição (`src/core/engine.js`):** adicionadas texturas leves em `CanvasTexture` para tábuas de madeira, telhas cerâmicas, grama com variação natural, estrada de terra batida, paredes com reboco, telhado metálico ondulado, asfalto e telas de TV/laptop.
* **Sítio & Exterior da Casa (`src/world/countryside.js`):**
  * **Casa do Alyffer:** fundação de pedra, paredes de reboco, pilastras de canto, telha cerâmica, varanda com guarda-corpo e degraus, porta almofadada com vidro e maçaneta dourada, janelas com venezianas verdes e floreiras, banco com encosto, lanterna suspensa e torre da caixa d'água com escada metálica e tubulação.
  * **Galinheiro, Poço, Celeiro & Árvores:** galinheiro elevado com rampa, ninho de palha e comedouro; poço de pedras com manivela, corda e balde pendurado; celeiro vermelho com portas em X brancas, sótão de feno e cúpula; árvores com raízes, galhos, copas em 2 tons e pétalas caídas sob os ipês.
* **Interior da Casa (`src/world/house.js`):** piso de tábuas, rodapés, janelas com cortinas, cama com cabeceira/2 travesseiros e criado-mudo com abajur, estante com mangás variados e miniatura, escrivaninha com gaveteiro e laptop aceso, cozinha com armários aéreos, azulejos, fogão 4 bocas com coifa e mesa com 4 cadeiras, banheiro com gabinete, espelho iluminado e toalheiro, e sala com sofá com almofadas, mesinha de centro, rack, TV Smart e videogame.
* **ETECAMP Exterior & Interior (`src/world/etec.js` — Sala de Automação preservada intacta):** fachada com pilastras, janelas de alumínio com peitoril, marquise com pilares, portas envidraçadas, caixa d'água com anéis e escada, carros detalhados (faróis, lanternas, para-choques, retrovisores e calotas), postes de rua, Estação Botujuru com piso tátil e bancos; interior com portas com visor de vidro, TVs com tela viva e soundbar, lousas com bandeja/apagador/canetas e relógio escolar, mesas de professor completas e palco no auditório.

## Melhorias da v19 (Portal na Entrada do Sítio, Telhado da Casa, Terminal/Estação/Trem Reformulados, Montanhas & Anti-Tremedeira)

* **Placa "SÍTIO DO MACHO" movida para a entrada do sítio (`src/world/countryside.js`, `src/core/engine.js`):** removida da varanda da casa e instalada em um **portal rústico de madeira com telhadinho** sobre a porteira principal (`x = 12.5, z = 30.0`), exibindo apenas **"SÍTIO DO MACHO"**.
* **Telhado da casa corrigido (`src/world/countryside.js`):** substituído o antigo cone de 4 lados por um **telhado duas águas** perfeitamente alinhado com empenas triangulares de reboco, cumeeira e beirais limpos sem cantos sobrando.
* **Montanhas com textura de grama (`src/world/countryside.js`):** `hillMat` atualizado para a mesma textura procedural de grama do chão.
* **Plantas removidas das entradas das salas da ETEC (`src/world/etec.js`):** portas das salas e laboratórios 100% livres.
* **Terminal Urbano, Estação CLP & Trem Linha 7-Rubi reformulados (`src/world/terminal.js`, `src/core/engine.js`, `src/core/loop.js`):**
  * **Teto 100% sólido** no Terminal e na Estação (telha ondulada, forro branco, treliças, platibandas azul/rubi e luminárias LED — sem transparência fantasma).
  * **Bug da rampa/escada flutuante corrigido:** passarela elevada agora apoiada em pilares com guarda-corpos de vidro, torre de elevador panorâmica envidraçada e escada real com 14 degraus apoiada firmemente na plataforma.
  * **Ônibus e Trem CPTM Linha 7-Rubi remodelados:** trem de 2 vagões acoplados por sanfona com cabine aerodinâmica, para-brisas, faróis/lanternas, letreiro LED, portas duplas, janelas emolduradas, ar-condicionado, pantógrafo, truques com rodas, dormentes e catenária; ônibus com faixas, janelas individuais, porta, retrovisores, faróis, para-choques e calotas.
* **Fim dos glitches de tremedeira (`src/core/engine.js`, `src/world/countryside.js`, `src/world/terminal.js`, `src/world/etec.js`):** `camera.near` ajustado para `0.28` (+2,8x precisão de profundidade), `sunLight.shadow.normalBias = 0.045` eliminando *shadow acne*, e `polygonOffset` aplicado nos pisos/faixas sobrepostos.

## Melhorias da v20 (Trens Vermelhos, Casinha Histórica sem Escada, Placa do Terminal, Sala Maker de Estudo & Portal do Sítio)

* **Trens com linhas vermelhas (`src/core/engine.js`):** faixa dos vagões, cabine, pantógrafo e letreiro LED ajustados para vermelho vivo (`#cc1818`).
* **Estação CLP limpa (`src/world/terminal.js`):** removida a escada que atravessava a frente da casinha histórica; telhado da casinha de fundo fechado com empenas triangulares, beirais de madeira, janelas com travessas e relógio com ponteiros; placa do Terminal ajustada para exibir apenas **"Av. Alfried Krupp"**.
* **Menos arbustos e pedras perto do sítio (`src/world/countryside.js`):** redução de ~10% nos arbustos (`62 → 55`), pedras pequenas (`54 → 48`) e rochas grandes (`8 → 7`).
* **Sala Maker reformulada como sala de estudo colaborativa (`src/world/etec.js`):** mantém lousa, TV na parede e mesa do professor, com **4 mesas retangulares grandes** (6 lugares cada — maioria na sala) e **2 mesas circulares grandes** (5 lugares cada) com cadeiras modernas.
* **Portal e placa "SÍTIO DO MACHO" mais altos e 100% visíveis (`src/world/countryside.js`):** portal elevado para `5,65 m` e placa dupla-face suspensa abaixo da viga (`y = 4,75 m`, fundo em `4,18 m`), totalmente à mostra dos dois lados e sem risco do personagem bater a cabeça.

## Melhorias da v21 (Estação Azul, Trem Vermelho sem Placa, Bancos Corrigidos & Escopeta Calibre 12 + Balas)

* **Estrutura da Estação em Azul & Trem Vermelho sem Placa (`src/world/terminal.js`, `src/world/etec.js`, `src/core/engine.js`):**
  * Toda a estrutura da Estação CLP e da Estação Botujuru (platibandas da cobertura, guarda-corpos, passarela, topo do elevador, faixa da bilheteria, bancos e placas) agora usa **azul** (`blueTrimMat` / `#1e3a8a`), enquanto o **trem** ganhou faixas e detalhes em **vermelho vivo** (`#d91616`) e teve a placa/letreiro frontal removida.
* **Bancos corrigidos (`src/world/terminal.js`, `src/world/etec.js`):** corrigido o bug onde apenas os pés dos bancos apareciam (assentos e encostos adicionados corretamente aos grupos no Terminal, na Estação e nos fundos da ETECAMP).
* **Escopeta Calibre 12 & Balas de Escopeta (`src/entities/player.js`, `src/systems/inventory.js`, `src/ui/shops.js`, `src/systems/gameplay.js`, `src/core/loop.js`, `src/core/audio.js`, `src/input/controls.js`):**
  * Comprável na **Loja da Estação CLP** (`🔫 Escopeta Calibre 12` por R$ 650 já com 6 balas grátis; `🔴 +8 Balas` por R$ 45 e `+24 Balas` por R$ 120).
  * Modelo 3D pump-action na mão em 1ª e 3ª pessoa, contador de munição direto na Hotbar, som procedural de tiro calibre 12 + bomba (`chk-chk`), disparo de **6 chumbos em cone de dispersão** com flash/fumaça/recuo ao apertar **`E`** ou **clicar**, causando alto dano na Onça e no Jacaré e lançando Orelha/Maluquinho em ragdoll.

## Melhorias da v22 (Escopeta com Duas Mãos em 1ª/3ª Pessoa, Recarga no R c/ Animação, Inventário Limpo + Botão `?` & Sensibilidade)

* **Escopeta segurada com as duas mãos em 3ª e 1ª pessoa (`src/entities/player.js`, `src/core/loop.js`):**
  * **3ª pessoa:** ambos os braços e antebraços seguram a escopeta firmemente à frente do corpo (mão direita na coronha, mão esquerda na telha de madeira) com balanço suave, recuo no disparo e deslizamento da telha pump.
  * **1ª pessoa:** viewmodel dedicado de duas mãos (`fpShotgunGroup`) com manga verde, mão direita no cabo, mão esquerda na telha deslizante (`fpPump`) e cartucho animado (`fpLoadShell`).
* **Recarga com a tecla `R` + Animação (`src/systems/state.js`, `src/systems/gameplay.js`, `src/core/loop.js`, `src/core/audio.js`, `src/input/controls.js`):**
  * Carregador de **6 cartuchos** (`state.shotgunMag`) separado das balas reservas (`bala_escopeta`), salvo automaticamente.
  * Apertar **`R`** com a escopeta na mão inicia a recarga cartucho por cartucho (com animação da arma inclinando e a mão esquerda inserindo cada cartucho + som `reload_shell`), finalizando com a puxada da bomba (`pump_rack` — `chk-chk`), tanto em 1ª quanto em 3ª pessoa. Atirar no meio da recarga interrompe imediatamente se já houver bala carregada.
* **Inventário mais limpo + botão `?` (`src/systems/inventory.js`, `index.html`, `styles/hud.css`):**
  * Removidos os 2 botões superiores (`Mochila & Hotbar` e `Comprar Sementes`) e o card padrão com o ícone de mochila e texto explicativo.
  * Adicionado o botão **`?`** no canto superior direito do Inventário abrindo um quadro de ajuda com as dicas de controles e recarga.
* **Sensibilidade da câmera nas Configurações (`index.html`, `src/core/engine.js`, `src/systems/extras.js`, `src/input/controls.js`, `src/core/loop.js`):**
  * Controle deslizante de **25% a 250%** salvo em `localStorage`, ajustando em tempo real a velocidade de giro em 1ª pessoa (Pointer Lock, hover e bordas) e 3ª pessoa (mouse e toque).

## Correção da v23 (Escopeta em 3ª Pessoa com Duas Mãos Perfeita)

* **Escopeta em 3ª pessoa corrigida (`src/entities/player.js`, `src/core/loop.js`):** substituída a montagem no pulso por um modelo dedicado (`tpShotgunGroup`) alinhado horizontalmente para frente (`+Z`) com as duas mãos do personagem na posição exata (mão direita na coronha/gatilho e mão esquerda na telha de madeira), com recuo sincronizado, telha deslizante e cartucho vermelho visível na recarga (`R`) — mantendo a 1ª pessoa intacta.

## Melhorias da v24 (Reformulação Visual Completa de Todas as UIs — Estilo Tábua & Placa Esmaltada)

* **Identidade visual artesanal unificada (`styles/tabua.css`, `index.html`, `src/ui/modals.js`):**
  * **Moldura de curral + 4 pregos oxidados + corpo em linho quente:** todos os 12 modais do jogo (Tela Inicial, Loja/Cooperativa, Baú do Sítio, Inventário, Terminal/Vendas, NPCs, Calendário/402, Guia, Pausa/Configurações, Fogão, Loja da Estação e Tela de Morte) e a tela de sono receberam moldura de madeira texturizada, 4 rebites nos cantos e folha interna em linho quente (`#e4d6bb`), sem blur nem neon.
  * **Placas esmaltadas verde-escuro & tipografia Rokkitt/Arvo:** cabeçalhos, HUD superior, nome do item na Hotbar, banners de dia e aviso de Pointer Lock adotam placa esmaltada verde (`#245139 → #173826`) com dupla borda creme (`#f0e6cc`).
  * **Botões 3D táteis & slots escavados na madeira:** botões chanfrados que afundam fisicamente ao clicar (verde, ocre, madeira e terracota) e slots de Hotbar, Inventário e Baú escavados na madeira (`#7c5636` / `#8f6541`) com sombra interna profunda e selos de quantidade em verde esmalte.
  * **HUD completo, Minimapa, Metas, Console `/` & Celular:** minimapa com moldura de madeira, metas em quadro de linho, toasts/prompts rústicos e celular com capinha de madeira e interface harmonizada.

## Melhorias da v25 (Cenário Completo em Volta do Terminal, Estação CLP & ETECAMP)

* **Entorno do Terminal & Estação Campo Limpo Paulista (`src/world/terminal.js`):**
  * **Vale verde + Serras:** substituído o piso cinza infinito por um vale gramado cercado de morros verdes texturizados em todos os horizontes.
  * **Centro de Campo Limpo Paulista (Sul da Av. Alfried Krupp):** calçada ampla, semáforo, carros na avenida e 7 lojas/sobrados comerciais (Padaria Central, Farmácia Popular, Mercado Krupp, Papelaria ETEC, Lanchonete 402, Barbearia do Zé e Loja do Centro) com toldos, vitrines e os 2 prédios pequenos da cidade ao fundo.
  * **Praça com coreto (Oeste), Galpões industriais (Norte) & Encosta residencial (Leste):** praça arborizada com coreto ao lado do terminal, galpões no eixo ferroviário norte, ponte da Av. Alfried Krupp sobre os trilhos e o Rio Jundiaí, mata ciliar com árvores/arbustos instanciados e casinhas na encosta leste.
  * **Ferrovia e rio estendidos:** trilhos, brita, 312 dormentes instanciados, postes de catenária e o Rio Jundiaí estendidos para `±110 m` sem cortes bruscos.
* **Entorno da ETECAMP & Estação Botujuru (`src/world/etec.js` — Sala de Automação preservada intacta):**
  * **Bairro Botujuru completo:** ruas transversais oeste e leste, faixa de pedestres no portão principal, ponto de ônibus escolar, comércios de bairro (*Padaria Botujuru*, *Mercado da Estação*) e dezenas de casas/sobrados nos lados oeste, leste e sul da linha férrea.
  * **Ferrovia de Botujuru completa:** lastro, trilhos, 156 dormentes instanciados e postes/fio de catenária estendidos por `220 m`.
  * **Mata Atlântica & Serra nos fundos:** 56 árvores (incluindo ipês amarelos), 64 arbustos e 32 pedras em `InstancedMesh` subindo até os morros verdes ao redor do campus.

## Correções da v26 (Placas Comerciais & Fechamento dos Telhados das Casas)

* **Nomes de comércios no Terminal atualizados (`src/world/terminal.js`):** `"PAPELARIA ETEC"` renomeada para **"PAPELARIA SÃO JOSÉ"** e `"LANCHONETE 402"` renomeada para **"LANCHONETE DA PRAÇA"**.
* **Vãos triangulares dos telhados fechados em todas as casas (`src/world/terminal.js`, `src/world/etec.js`, `src/world/countryside.js`):** adicionadas empenas triangulares sólidas (`ExtrudeGeometry`) e cumeeiras alinhadas em todas as casas genéricas ao redor do Terminal/Estação (`addBgHouse`) e da ETECAMP/Botujuru (`addBotHouse`), além do celeiro oeste e do galinheiro no sítio.

## Revisão Geral da v27 (Correção de Bugs, Rebalanceamento Econômico/Combate & Otimização)

* **Bugs corrigidos:**
  * **Contraste no Celular (`styles/tabua.css`):** todos os textos de Only-Resenha, InstaRoça, Zap e ícones da Home ajustados para contraste alto escuro sobre o linho quente.
  * **Prioridade da tecla `E` (`src/systems/gameplay.js`):** segurar **Escopeta**, **Celular**, **Ovo**, **Vaselina** ou comida sobre canteiros não-maduros ou com a Onça ativa agora usa/dispara o item na mão corretamente.
  * **Sem duplicação no Baú (`src/systems/state.js`):** `chestSlots` é carregado antes de checar falta de regador/enxada, evitando duplicar itens guardados no baú.
  * **Virada de meia-noite completa (`src/systems/gameplay.js`, `src/core/loop.js`):** passar das `24:00` acordado atualiza mercado, encomendas, metas, ovos, animais, cardápio do Refeitório e fecha a ETEC no fim de semana.
  * **Lago profundo para NPCs/animais (`src/core/loop.js`):** Orelha (incluindo ragdoll), Onça, Onça Domada e Marcelo agora respeitam a altura do terreno/lago (`getYardEntityFloorY`) em vez de flutuarem em `y = 0`.
  * **Escopeta em 3ª pessoa adaptada às skins (`src/core/loop.js`):** altura e avanço da arma ajustados para as skins **PAC**, **Homem Guloso** e **Macho**.
* **Rebalanceamento (`src/data/config.js`, `src/systems/gameplay.js`, `src/ui/shops.js`):**
  * **Refeitório:** limite justo de **2 porções por dia** (`merendaTakenToday`).
  * **Alface Guloso vs Dourado:** bônus do Guloso ajustado para `65%` de `+1` e preço base do **Alface Dourado** elevado para `R$ 430`.
  * **Escopeta Calibre 12:** preço ajustado para `R$ 1.150` (`6` carregadas + `4` reservas), caixas de munição em `R$ 65` (+8) / `R$ 175` (+24) e dano calibrado em `11 × 6 = 66` máx. (equilibrando alcance contra a Enxada de Diamante corpo-a-corpo).
  * **Vaca Leiteira & Fogão:** **Leite Fresco** elevado para `R$ 130` e pratos cozidos elevados (`Salada R$ 185`, `Omelete R$ 160`, `Vitamina R$ 310`, `Risoto R$ 435`).
* **UX & Otimização (`src/world/countryside.js`, `src/world/terminal.js`, `src/world/etec.js`, `index.html`, `src/ui/modals.js`):**
  * Aspersores 3D adicionados também aos pastos **Oeste** e **Leste**, textos antigos atualizados (`Refeitório`, tecla `R`, aviso da Estação), código morto removido (`toggleEquippedTool`, `compostDoneToday`, `terminalRoofSlabs`, `invModalTab`) e geometrias/materiais das casas de fundo compartilhados em cache.
