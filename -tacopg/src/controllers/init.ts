import query from "./db";

async function init() {
    return await query(`
        START TRANSACTION;
        DROP TABLE IF EXISTS grupo;
        CREATE TABLE IF NOT EXISTS public.grupo(
        id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 32767 CACHE 1 ),
        pre_descricao character varying COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT grupo_pkey PRIMARY KEY (id));
        CREATE TABLE IF NOT EXISTS public.preparacao(
        id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 32767 CACHE 1 ),
        pre_descricao character varying COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT preparacao_pkey PRIMARY KEY (id));
        COMMIT;
        `);
}
init()
    .then((r) => console.log(r))
    .catch((e) => console.log(e));