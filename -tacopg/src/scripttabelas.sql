-- Table: public.grupo

-- DROP TABLE IF EXISTS public.grupo;

CREATE TABLE IF NOT EXISTS public.grupo
(
    id integer NOT NULL,
    gru_descricao character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT grupo_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.grupo
    OWNER to postgres;

-- Table: public.preparacao

-- DROP TABLE IF EXISTS public.preparacao;

CREATE TABLE IF NOT EXISTS public.preparacao
(
    id integer NOT NULL,
    pre_descricao character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT preparacao_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.preparacao
    OWNER to postgres;


-- Table: public.produto

-- DROP TABLE IF EXISTS public.produto;

CREATE TABLE IF NOT EXISTS public.produto
(
    id integer NOT NULL,
    pro_descricao character varying(255) COLLATE pg_catalog."default" NOT NULL,
    pro_grupo integer,
    CONSTRAINT produto_pkey PRIMARY KEY (id),
    CONSTRAINT produto_pro_grupo_fkey FOREIGN KEY (pro_grupo)
        REFERENCES public.grupo (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.produto
    OWNER to postgres;


-- Table: public.prodprep

-- DROP TABLE IF EXISTS public.prodprep;

CREATE TABLE IF NOT EXISTS public.prodprep
(
    pp_produto integer,
    pp_preparacao integer,
    pp_energia double precision,
    pp_proteina double precision,
    pp_lipidios double precision,
    pp_carboidrato double precision,
    pp_fibra double precision,
    pp_colesterol double precision,
    pp_agsaturado double precision,
    pp_agmono double precision,
    pp_agpoli double precision,
    pp_aglinoleico double precision,
    pp_aglinolenico double precision,
    pp_agtranstotal double precision,
    pp_acucartotal double precision,
    pp_acucaradicao double precision,
    pp_calcio double precision,
    pp_magnesio double precision,
    pp_manganes double precision,
    pp_fosforo double precision,
    pp_ferro double precision,
    pp_sodio double precision,
    pp_sodioadicao double precision,
    pp_potassio double precision,
    pp_cobre double precision,
    pp_zinco double precision,
    pp_selenio double precision,
    pp_retinol double precision,
    pp_vitamina_a double precision,
    pp_tiamina double precision,
    pp_riboflavina double precision,
    pp_niacina double precision,
    pp_niacina_ne double precision,
    pp_piridoxina double precision,
    pp_cobalamina double precision,
    pp_folato double precision,
    pp_vitamina_d double precision,
    pp_vitamina_e double precision,
    pp_vitamina_c double precision
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.prodprep
    OWNER to postgres;