--
-- PostgreSQL database dump
--

-- Dumped from database version 10.22
-- Dumped by pg_dump version 10.22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    id text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    active boolean DEFAULT false NOT NULL,
    refresh text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "developerRequirements" text NOT NULL,
    "dateStart" timestamp(3) without time zone NOT NULL,
    "dateEnd" timestamp(3) without time zone NOT NULL,
    "enrollmentStart" timestamp(3) without time zone NOT NULL,
    "enrollmentEnd" timestamp(3) without time zone NOT NULL,
    supervisor text NOT NULL,
    "isPublic" boolean NOT NULL
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" (id, username, password, active, refresh) FROM stdin;
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" (id, name, description, "developerRequirements", "dateStart", "dateEnd", "enrollmentStart", "enrollmentEnd", supervisor, "isPublic") FROM stdin;
dd061dfc-5855-11ee-8c99-0242ac120002	Биология растений в эпоху глобальных изменений климата	Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.	Экспертное знание в области биологии растений и экологии для более глубокого понимания взаимосвязей между климатическими изменениями и растительными экосистемами. Опыт в проведении исследований, включая умение планировать и осуществлять эксперименты, анализировать данные и делать выводы. Навыки анализа данных и использования статистических методов для интерпретации результатов и выявления закономерностей в изменениях растительного мира.	2023-09-01 00:00:00	2023-12-01 00:00:00	2023-08-20 00:00:00	2023-09-01 00:00:00	Иванов П. М.	t
af1fff74-5856-11ee-8c99-0242ac120002	Изучение социально-экономических проблем современного испанского общества	Проект направлен на исследование ключевых аспектов, влияющих на современную испанскую социально-экономическую динамику. Требуется провести анализ ряда факторов, включая безработицу, социальное неравенство, систему образования и здравоохранения, а также влияние глобальных экономических трендов на испанскую экономику.	Знание испанского языка на высоком уровне для эффективной коммуникации с местными экспертами и населением. Экономические и социологические знания и методологии для проведения анализа социальных и экономических данных. Исследовательские навыки, включая сбор и анализ данных, проведение интервью и опросов, а также способность к критическому мышлению.	2023-09-07 00:00:00	2023-12-10 00:00:00	2023-09-01 00:00:00	2023-09-07 00:00:00	Новиков В. С.	t
c3f2ed0f-74bd-4220-ab8a-0eb804fdd3bf	ГМО: история, достижения, социальные и экологические риски	Проект посвящен всестороннему изучению генетически модифицированных организмов (ГМО). Следует провести анализ исторического развития технологии ГМО, исследование достижений в области генной инженерии и оценку социальные и экологических рисков, связанных с применением ГМО в сельском хозяйстве и продовольственной промышленности. Цель проекта - обеспечить обширное понимание проблематики ГМО с учетом научных, социальных и экологических аспектов и предоставить информацию для принятия обоснованных решений и разработки регулирующей политики.	Глубокое понимание биологии и генетики для анализа принципов генной инженерии и технологии ГМО. Исследовательские навыки, включая способность анализа научных статей, публикаций и данных в области ГМО. Экологические знания для оценки влияния ГМО на окружающую среду и биоразнообразие. Знание социологии и политических наук для изучения общественных и политических аспектов использования ГМО.	2023-02-01 00:00:00	2023-06-01 00:00:00	2023-01-20 00:00:00	2023-02-01 00:00:00	Старикова П. М.	t
61ea8a18-c2bb-423d-83ab-9eed411128b6	Современные проблемы эпидемиологии, микробиологии и гигиены	Проект представляет собой исследование актуальных вопросов в области общественного здоровья и медицины. Задача - анализ современных эпидемиологических тенденций, изучение микробиологических аспектов патогенов и распространения болезней, а также исследование вопросов гигиенических практик и их влияния на общественное здоровье. Цель проекта - обеспечить научное понимание современных вызовов и рисков, связанных с биологическими агентами и общественными здоровьем, и способствовать разработке стратегий для их управления и предотвращения.	Глубокое знание эпидемиологии, микробиологии и гигиеники для анализа современных проблем и вызовов в этих областях. Исследовательские навыки, включая способность анализа эпидемиологических данных, молекулярных и микробиологических исследований и статистических методов. Умение интерпретировать результаты исследований и делать выводы, имея в виду публичное здоровье.	2023-09-09 00:00:00	2023-12-10 00:00:00	2023-09-01 00:00:00	2023-09-07 00:00:00	Беляев Ф. П.	t
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f8cd6fbf-adcb-4d71-9a20-6c5f9f72f2d8	1302aacce22222c54fce64a9f614530824705668c33df380a83f54b862a3db7f	2023-09-12 18:54:41.371056+03	20230912155441_initial_migration	\N	\N	2023-09-12 18:54:41.36234+03	1
ddb3d23a-95f9-4add-960c-2f79bc79fae2	6b0db28638cfc4db307adeaa6f934f840379a8db1f54c57ec4a0db3537699390	2023-09-21 10:44:01.161093+03	20230921074401_admin_migration	\N	\N	2023-09-21 10:44:01.146446+03	1
495d934d-1f5f-4dc9-85a8-1f300ad9efe6	e05a86c695d25a69ca2030fce56e62a24474ee4bd6fcd1af7c3089e353bfcbd0	2023-09-21 10:53:38.625605+03	20230921075338_project_migration	\N	\N	2023-09-21 10:53:38.618085+03	1
\.


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

