# omnistack
Treinamento aberto Omnistack Semana 9 realizado entre 30 Set e 06 Out de 2019 utilizando o stack Node.js, React e React Native, além da introdução ao MongoDB na nuvem através dos serviços fornecidos pelo Atlas e a utilização de websockets para disponibilização de informação instantânea entre as plataformas e perfis de usuários envolvidos.

Durante a atividade foi criada uma pequena aplicação inspirada no AirBnB chamada de AirCnc que basicamente envolvia a possibilidade de empresas cadastrarem e disponibilizarem seus espaços físicos contendo a infra-estrutura necessária para o desenvolvimento de aplicações nos mais diversos modelos e stacks, de modo esses serviços seriam oferecidos a outras empresas ou profissionais de desenvolvimento de software que necessitassem de um espaço que atendesse às suas demandas por um curto período de tempo.
No caso, a unidade utilizada como referência é a diária.

Foi utilizado o Node.js para a criação de uma API Rest comunicando-se com o cloud do MongoDB.
Também foi criado um front-end Web responsivo em React cuja principal funcionalidade se resumia ao cadastramento dos espaços físicos que seriam disponibilizados e que receberam a nomeclatura de Spots. Um fato interessante nesse camada da aplicação é a seleção da imagem do Spot com preview automático sem a necessidade do upload.
Ao final, foi criado um App híbrido (Android e iOS) com React Native destinado às empresas e profissionais interessados em reservar os Spots. O fato interessante dessa camada da aplicação é a utilização de websockets para solicitação da reserva pelo profissional interessado no spot, a aprovação ou rejeição da reserva feita pela empresa que cadastrou o spot e o retorno ao solicitante. Esse fato garante a disponibilização da informação de forma instantânea na iterface do usuário (Web ou Mobile) sem necessidade de refresh ou a utilização de notificações.
Em ambos os casos referentes ao front-end (Web e Mobile) foi utilizada a mesma API feita em Node.js.

