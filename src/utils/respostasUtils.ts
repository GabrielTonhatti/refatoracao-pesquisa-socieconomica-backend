const respostasUtils: any = {
    "1. Qual o seu curso?": [
        "Análise e Desenvolvimento de Sistemas (ADS)",
        "Gestão da Produção Industrial (GPI)",
        "Gestão de Recursos Humanos (GRH)",
        "Desenvolvimento de Software Multiplataforma (DSM)"
    ],
    "2. Qual o período que cursa?": ["Matutino", "Noturno"],
    "4. Qual o estado do Brasil que você nasceu?": [
        "Acre  (AC)",
        "Alagoas (AL)",
        "Amapá (AP)",
        "Amazonas (AM)",
        "Bahia (BA)",
        "Ceará (CE)",
        "Distrito Federal (DF)",
        "Espírito Santo (ES)",
        "Goiás (GO)",
        "Maranhão (MA)",
        "Mato Grosso (MT)",
        "Mato Grosso do Sul (MS)",
        "Minas Gerais (MG)",
        "Pará (PA)",
        "Paraíba (PB)",
        "Paraná (PR)",
        "Pernambuco (PE)",
        "Piauí (PI)",
        "Rio de Janeiro (RJ)",
        "Rio Grande do Norte (RN)",
        "Rio Grande do Sul (RS)",
        "Rondônia (RO)",
        "Roraima (RR)",
        "Santa Catarina (SC)",
        "São Paulo (SP)",
        "Sergipe (SE)",
        "Tocantins (TO)"
    ],
    "5. Qual sua cidade de residência?": [
        "Batatais",
        "Bauru",
        "Campinas",
        "Buritizal",
        "Capetinga",
        "Cássia",
        "Claraval",
        "Cristais Paulista",
        "Delfinópolis",
        "Estreito",
        "Franca",
        "Guaíra",
        "Guará",
        "Ibiraci",
        "Igarapava",
        "Ipuã",
        "Itirapuã",
        "Ituverava",
        "Jeriquara",
        "Miguelópolis",
        "Morro Agudo",
        "Nuporanga",
        "Orlândia",
        "Passos",
        "Patrocínio Paulista",
        "Pedregulho",
        "Peixoto",
        "Pratápolis",
        "Restinga",
        "Ribeirão Corrente",
        "Ribeirão Preto",
        "Rifaina",
        "Sacramento",
        "Sales Oliveira",
        "S. Joaquim da Barra",
        "S. José da Bela Vista",
        "São Tomaz de Aquino"
    ],
    "6. Qual o seu gênero?": [
        "Masculino",
        "Feminino",
        "Homem transgênero",
        "Mulher Transgênero",
        "Homem Transexual",
        "Mulher Transexual",
        "Não sei responder",
        "Prefiro não responder"
    ],
    "7. Qual a sua data de nascimento?": [],
    "8. Qual é o seu estado civil?": [
        "Solteiro(a)",
        "Casado(a) ou União Estável",
        "Separado(a), desquitado(a), divorciado(a)",
        "Viúvo(a)"
    ],
    "9. Você é portador de alguma necessidade especial?(Pode selecionar mais de uma, se for o caso)":
        ["Nenhuma", "Visual", "Física", "Auditiva", "Autismo", "De fala"],
    "10. Você convive ou mora com alguma pessoa com deficiência?": [
        "Autismo",
        "Síndrome de Down",
        "Deficiência",
        "Auditiva",
        "Visual",
        "De fala",
        "Física",
        "Não convivo ou não moro com alguém com deficiência"
    ],
    "11. Quantos filhos você tem?": [
        "Nenhum",
        "Um",
        "Dois",
        "Três",
        "Quatro",
        "Mais de quatro"
    ],
    "12. Com quem você mora atualmente?": [
        "Com pais e(ou) parentes",
        "Com esposa(o) e(ou) filho(s)",
        "Com amigos (compartilhando despesas) ou de favor",
        "Sozinho"
    ],
    "13. Quantas pessoas, incluindo você, moram no seu domicílio?": [],
    "14. Qual a situação do domicílio onde mora?": [
        "Próprio",
        "Alugado",
        "Cedido",
        "Financiado",
        "Arrendado",
        "Mensalista"
    ],
    "15. Tempo de moradia neste domicílio (Em anos)": [],
    "16. Qual a faixa de renda mensal da sua família (em Salários Mínimos)": [
        "Até dois salários mínimos",
        "Mais de dois até cinco salários mínimos",
        "Mais de cinco até dez salários mínimos",
        "Mais de dez até vinte salários mínimos",
        "Mais de vinte salários mínimos",
        "Prefiro não responder"
    ],
    "17.1. Quantas geladeiras há em seu domicílio.": [],
    "17.2. Quantos celulares comuns há em seu domicílio?": [],
    "17.3. Quantos micro-ondas há em seu domicílio?": [],
    "17.4. Quantos notebooks há em seu domicílio?": [],
    "17.5. Quantas máquinas de lavar roupa e(ou) tanquinho há em seu domicílio?":
        [],
    "17.6. Quantas motocicletas há em seu domicílio?": [],
    "17.7. Quantos automóveis há em seu domicílio?": [],
    "17.8. Quantos vídeos cassete e(ou) DVD players há em seu domicílio?": [],
    "17.9. Quantos televisores há em seu domicílio?": [],
    "17.10. Quantos smartphones há em seu domicílio?": [],
    "18. No seu domicílio tem?": [
        "Telefone fixo",
        "Internet",
        "Tv por assinatura",
        "Empregada mensalista",
        "Nenhuma das opções acima"
    ],
    "19.1. Você trabalha?": ["Sim", "Não"],
    "19.2. Qual o seu vínculo com o emprego?": [
        "Não trabalho",
        "Sou registrado em indústria (calçados/confecções/outras)",
        "Sou registrado no comércio",
        "Sou registrado em empresa prestadora de serviços",
        "Sou registrado em empresa pública (federal/estadual/municipal)",
        "Sou autônomo",
        "Sou empresário",
        "Sou estagiário"
    ],
    "19.3. Qual a área do seu trabalho?": [
        "Não trabalho",
        "Trabalho na área do curso",
        "Trabalho fora da área do curso"
    ],
    "19.4. Qual seu horário de trabalho?": [
        "Não trabalho",
        "Manhã",
        "Tarde",
        "Noite",
        "Manhã e tarde",
        "Manhã e noite",
        "Tarde e noite",
        "Regime de turnos"
    ],
    "19.5. Qual a empresa que você está contratado agora?": [],
    "20. Você tem plano de saúde privado?": [
        "Não tenho, uso o SUS",
        "Tenho e é pago integralmente pela empresa",
        "Tenho e é pago parcialmente pela empresa",
        "Tenho e é um plano familiar",
        "Tenho e é um plano individual"
    ],
    "21.1. Qual o grau de escolaridade do seu pai?": [
        "Nenhuma escolaridade",
        "Ensino fundamental I (1º ao 5º anos)",
        "Ensino fundamental II (6º ao 9º anos)",
        "Ensino Médio",
        "Ensino Superior",
        "Pós-graduação",
        "Prefiro não responder"
    ],
    "21.2. Qual o grau de escolaridade da sua mãe?": [
        "Nenhuma escolaridade",
        "Ensino fundamental I (1º ao 5º anos)",
        "Ensino fundamental II (6º ao 9º anos)",
        "Ensino Médio",
        "Ensino Superior",
        "Pós-graduação",
        "Prefiro não responder"
    ],
    "22. Na sua vida escolar você estudou": [
        "Sempre em escola pública",
        "A maior parte em escola pública",
        "Sempre em escola particular paga pela família",
        "Sempre em escola particular com bolsa",
        "A maior parte em escola particular paga pela família",
        "A maior parte em escola particular com bolsa"
    ],
    "23.1. Com que frequência você utiliza microcomputadores?": [
        "Nunca",
        "Pouco",
        "Ás vezes",
        "Muito",
        "Sempre"
    ],
    "23.2. Onde você utiliza microcomputadores?": [
        "Em casa",
        "Na escola",
        "No trabalho",
        "Em outros lugares"
    ],
    "23.3. Com qual finalidade você utiliza microcomputadores?": [
        "Para trabalhos profissionais",
        "Para trabalhos escolares",
        "Para entretenimento (músicas, vídeos, redes sociais, etc)",
        "Para comunicação por e-mail",
        "Para operações bancárias",
        "Para compras eletrônicas"
    ],
    "24. Como você classifica seu conhecimento em informática": [
        "Nenhum",
        "Pouco",
        "Intermediário",
        "Muito Avançado"
    ],
    "25. Qual o seu conhecimento em relação aos aplicativos a seguir? [Windows]":
        ["Nenhum", "Pouco", "Intermediário", "Muito Avançado"],
    "25. Qual o seu conhecimento em relação aos aplicativos a seguir? [Linux]":
        ["Nenhum", "Pouco", "Intermediário", "Muito Avançado"],
    "25. Qual o seu conhecimento em relação aos aplicativos a seguir? [Editores de textos (Word, Writer, etc.)]":
        ["Nenhum", "Pouco", "Intermediário", "Muito Avançado"],
    "25. Qual o seu conhecimento em relação aos aplicativos a seguir? [Planilhas eletrônicas (Excel, Calc, etc.)]":
        ["Nenhum", "Pouco", "Intermediário", "Muito Avançado"],
    "25. Qual o seu conhecimento em relação aos aplicativos a seguir? [Apresentadores (Powerpoint, Impress, Prezzi, etc.)]":
        ["Nenhum", "Pouco", "Intermediário", "Muito Avançado"],
    "25. Qual o seu conhecimento em relação aos aplicativos a seguir? [Sistemas de Gestão Empresaria]":
        ["Nenhum", "Pouco", "Intermediário", "Muito Avançado"],
    "26. Agora, considere seu conhecimento sobre idiomas [Inglês]": [
        "Leio, escrevo e falo bem",
        "Leio, escrevo e falo razoavelmente",
        "Leio e escrevo mas não falo",
        "Leio mas não escrevo nem falo",
        "Praticamente nula"
    ],
    "26. Agora, considere seu conhecimento sobre idiomas [Espanhol]": [
        "Leio, escrevo e falo bem",
        "Leio, escrevo e falo razoavelmente",
        "Leio e escrevo mas não falo",
        "Leio mas não escrevo nem falo",
        "Praticamente nula"
    ],
    "26. Agora, considere seu conhecimento sobre idiomas [Outro Idioma]": [
        "Leio, escrevo e falo bem",
        "Leio, escrevo e falo razoavelmente",
        "Leio e escrevo mas não falo",
        "Leio mas não escrevo nem falo",
        "Praticamente nula"
    ],
    "27. Considere a busca por informação nos seguintes meios de comunicação [Televisores]":
        ["Nunca", "Pouco", "Às vezes", "Muito", "Sempre"],
    "27. Considere a busca por informação nos seguintes meios de comunicação [Internet]":
        ["Nunca", "Pouco", "Às vezes", "Muito", "Sempre"],
    "27. Considere a busca por informação nos seguintes meios de comunicação [Revistas]":
        ["Nunca", "Pouco", "Às vezes", "Muito", "Sempre"],
    "27. Considere a busca por informação nos seguintes meios de comunicação [Jornais]":
        ["Nunca", "Pouco", "Às vezes", "Muito", "Sempre"],
    "27. Considere a busca por informação nos seguintes meios de comunicação [Rádio]":
        ["Nunca", "Pouco", "Às vezes", "Muito", "Sempre"],
    "27. Considere a busca por informação nos seguintes meios de comunicação [Redes socias]":
        ["Nunca", "Pouco", "Às vezes", "Muito", "Sempre"],
    "27. Considere a busca por informação nos seguintes meios de comunicação [Conversas com Amigos]":
        ["Nunca", "Pouco", "Às vezes", "Muito", "Sempre"],
    "28. Se você lê jornal, qual a frequência?": [
        "Diariamente",
        "Algumas vezes por semana",
        "Somente aos domingos",
        "Raramente",
        "Não leio"
    ],
    "29. Se você lê jornal, quais os assuntos que mais lê?": [
        "Não leio jornal",
        "Todos os assuntos",
        "Notícia locais",
        "Notícias nacionais",
        "Notícias internacionais",
        "Esporte",
        "Lazer, arte e cultura",
        "Notícias policiais",
        "Classificados",
        "Moda",
        "Sociais"
    ],
    "30. Não considerando os livros escolares, quantos livros você lê por ano (em média)?":
        ["Nenhum", "Até 2", "De 3 até 6", "De 7 até 10", "Mais de 10"],
    "31. Se você lê livros literários, qual/quais o(s) gênero(s) preferido(s)?":
        [
            "Não leio",
            "Romance",
            "Ficção",
            "Policial",
            "Biográfico",
            "Aventura",
            "Autoajuda",
            "Outros"
        ],
    "32. Você dedica parte do seu tempo para atividades voluntárias?": [
        "Sim",
        "Não"
    ],
    "33. Qual religião você professa?": [
        "Nenhuma",
        "Católica",
        "Espírita",
        "Evangélica",
        "Protestante",
        "Outra"
    ],
    "34. Quais fontes de entretenimento cultural você usa?": [
        "Cinema",
        "Exposições de arte",
        "Filmes na internet",
        "Literatura",
        "Museus",
        "Música",
        "Teatro",
        "TV",
        "Viagens",
        "Nenhuma"
    ],
    "35. Estamos quase acabando... Como conheceu a FATEC Franca?": [
        "Cartaz de divulgação",
        "Indicação de familiar/amigo",
        "Pelo Facebook",
        "Por algum dos jornais",
        "Por alguma das rádios",
        "Por outdoor",
        "Propaganda na escola que estudava"
    ],
    "36. Porque você escolheu este curso?": [
        "Este curso forma profissionais facilmente absorvidos pelo mercado",
        "Este curso forma profissionais que são bem remunerados",
        "Minha vocação é seguir esta carreira",
        "Este curso é gratuito",
        "Este curso é de média duração",
        "É um curso bem conceituado na região",
        "Porque já trabalho na área",
        "Sugestão ou vontade familiar",
        "Outros motivos"
    ],
    "37. Qual sua maior expectativa quanto ao curso?": [
        "Obter novos conhecimentos",
        "Obter competências para exercício de uma profissão",
        "Conhecer novas pessoas",
        "Melhorar-me como pessoa para bons relacionamentos futuros",
        "Obter um diploma de nível superior",
        "Outra expectativa",
        "Não tenho expectativa alguma"
    ],
    "38. Qual sua expectativa após se formar?": [
        "Conquistar vaga em empresa privada",
        "Prestar concurso público",
        "Melhorar cargo e salário na empresa que trabalho",
        "Abrir meu próprio negócio",
        "Ingressar na carreira acadêmica",
        "Outra expectativa",
        "Nenhuma expectativa"
    ],
    "39. Você já estudou nesta escola?": ["Sim", "Não"],
    "40. Você fez algum curso técnico?": [
        "Não fiz",
        "Sim, em uma ETEC",
        "Sim, no SENAC",
        "Sim, no SENAI",
        "Sim, em outra instituição"
    ],
    "41. Qual o meio de transporte você usa para vir à escola?": [
        "Caminhando",
        "Carona",
        "Bicicleta",
        "Moto",
        "Carro",
        "Ônibus",
        "Transporte escolar"
    ]
};

export default respostasUtils;
