--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: kirja; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kirja (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    rating integer
);


ALTER TABLE public.kirja OWNER TO postgres;

--
-- Name: kirja_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kirja_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kirja_id_seq OWNER TO postgres;

--
-- Name: kirja_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kirja_id_seq OWNED BY public.kirja.id;


--
-- Name: kirja id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kirja ALTER COLUMN id SET DEFAULT nextval('public.kirja_id_seq'::regclass);


--
-- Data for Name: kirja; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kirja (id, title, rating) FROM stdin;
\.


--
-- Name: kirja_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kirja_id_seq', 1, false);


--
-- Name: kirja kirja_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kirja
    ADD CONSTRAINT kirja_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

