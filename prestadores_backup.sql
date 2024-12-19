--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-12-19 00:40:28 CST

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
-- TOC entry 6 (class 2615 OID 53765)
-- Name: prest; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA prest;


ALTER SCHEMA prest OWNER TO postgres;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 53774)
-- Name: Photo; Type: TABLE; Schema: prest; Owner: postgres
--

CREATE TABLE prest."Photo" (
    id text NOT NULL,
    url text NOT NULL,
    "profileId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE prest."Photo" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 53766)
-- Name: Profile; Type: TABLE; Schema: prest; Owner: postgres
--

CREATE TABLE prest."Profile" (
    id text NOT NULL,
    bio text NOT NULL,
    "fullName" text NOT NULL,
    organization text NOT NULL,
    title text NOT NULL,
    telephone text NOT NULL,
    extension text NOT NULL,
    email text NOT NULL,
    website text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE prest."Profile" OWNER TO postgres;

--
-- TOC entry 3405 (class 0 OID 53774)
-- Dependencies: 217
-- Data for Name: Photo; Type: TABLE DATA; Schema: prest; Owner: postgres
--

COPY prest."Photo" (id, url, "profileId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3404 (class 0 OID 53766)
-- Dependencies: 216
-- Data for Name: Profile; Type: TABLE DATA; Schema: prest; Owner: postgres
--

COPY prest."Profile" (id, bio, "fullName", organization, title, telephone, extension, email, website, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3258 (class 2606 OID 53781)
-- Name: Photo Photo_pkey; Type: CONSTRAINT; Schema: prest; Owner: postgres
--

ALTER TABLE ONLY prest."Photo"
    ADD CONSTRAINT "Photo_pkey" PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 53773)
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: prest; Owner: postgres
--

ALTER TABLE ONLY prest."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- TOC entry 3259 (class 1259 OID 53782)
-- Name: Photo_profileId_key; Type: INDEX; Schema: prest; Owner: postgres
--

CREATE UNIQUE INDEX "Photo_profileId_key" ON prest."Photo" USING btree ("profileId");


--
-- TOC entry 3260 (class 2606 OID 53783)
-- Name: Photo Photo_profileId_fkey; Type: FK CONSTRAINT; Schema: prest; Owner: postgres
--

ALTER TABLE ONLY prest."Photo"
    ADD CONSTRAINT "Photo_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES prest."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2024-12-19 00:40:28 CST

--
-- PostgreSQL database dump complete
--

