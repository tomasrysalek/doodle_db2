-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost
-- Vytvořeno: Stř 26. čen 2019, 06:33
-- Verze serveru: 8.0.13-4
-- Verze PHP: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `C1ehp7mXWV`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `Adresa`
--

CREATE TABLE `Adresa` (
  `PSC` varchar(6) NOT NULL,
  `Nazev` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabulky `Chat`
--

CREATE TABLE `Chat` (
  `ID` int(11) NOT NULL,
  `Message` varchar(250) NOT NULL,
  `Skupina` varchar(250) NOT NULL,
  `Uzivatel` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vypisuji data pro tabulku `Chat`
--

INSERT INTO `Chat` (`ID`, `Message`, `Skupina`, `Uzivatel`) VALUES
(1, 'zprava1', 'test', 'tomas'),
(2, 'zprava2', 'test', 'tomas'),
(3, 'zprava3', 'test', 'michal'),
(4, 'zprava4', 'test', 'michal'),
(5, 'ahoj', 'test', 'tomas'),
(6, 'Testovaci zprava pro chat', 'Testovaci skupina', 'tomas@ahoj.com'),
(7, 'ahioj', 'Testovaci skupina', 'tomasrysalek'),
(8, 'asdfhoasdhf', 'Testovaci skupina', 'tomasrysalek'),
(9, 'asdf', 'Testovaci skupina', 'tomasrysalek'),
(10, 'asdf', 'Testovaci skupina', 'tomasrysalek'),
(11, 'asdf', 'Testovaci skupina', 'tomasrysalek'),
(12, 'asdf', 'Testovaci skupina', 'tomasrysalek'),
(13, 'asdf', 'Testovaci skupina', 'tomasrysalek'),
(14, '', 'Testovaci skupina', 'tomasrysalek'),
(15, '', 'Testovaci skupina', 'tomasrysalek'),
(16, '', 'Testovaci skupina', 'tomasrysalek'),
(17, '', 'Testovaci skupina', 'tomasrysalek'),
(18, 'a', 'Testovaci skupina', 'tomasrysalek'),
(19, 'asdfas adsf a', 'Testovaci skupina', 'tomasrysalek'),
(20, 'asdfasdf', 'test', 'tomas'),
(21, 'asdf', 'test', 'tomas'),
(22, 'asdfadf', 'test', 'tomas'),
(23, 'asdfasdf', 'test', 'tomas'),
(24, 'asdf', 'test', 'tomas'),
(25, 'asdf', 'test', 'tomas');

-- --------------------------------------------------------

--
-- Struktura tabulky `Prava`
--

CREATE TABLE `Prava` (
  `IDPrava` int(11) NOT NULL,
  `Nazev` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vypisuji data pro tabulku `Prava`
--

INSERT INTO `Prava` (`IDPrava`, `Nazev`) VALUES
(1, 'admin'),
(2, 'uzivatel');

-- --------------------------------------------------------

--
-- Struktura tabulky `Skupina`
--

CREATE TABLE `Skupina` (
  `Nazev` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `SkupinaID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vypisuji data pro tabulku `Skupina`
--

INSERT INTO `Skupina` (`Nazev`, `SkupinaID`) VALUES
('gsgs', 54),
('mojeSkupina', 56),
('testovací skupina', 57);

-- --------------------------------------------------------

--
-- Struktura tabulky `SkupinaUzivatel`
--

CREATE TABLE `SkupinaUzivatel` (
  `UzivatelID` int(11) NOT NULL,
  `SkupinaID` int(11) NOT NULL,
  `ID_Prava` int(11) NOT NULL,
  `SU_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vypisuji data pro tabulku `SkupinaUzivatel`
--

INSERT INTO `SkupinaUzivatel` (`UzivatelID`, `SkupinaID`, `ID_Prava`, `SU_ID`) VALUES
(75, 56, 1, 44),
(74, 57, 1, 45),
(78, 57, 2, 48);

-- --------------------------------------------------------

--
-- Struktura tabulky `Soubor`
--

CREATE TABLE `Soubor` (
  `Nazev` varchar(40) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Typ` varchar(7) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `SouborID` int(11) NOT NULL,
  `Soubor` blob NOT NULL,
  `UdalostID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabulky `Typupozorneni`
--

CREATE TABLE `Typupozorneni` (
  `Nazev` varchar(20) NOT NULL,
  `TypupozorneniID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabulky `Udalost`
--

CREATE TABLE `Udalost` (
  `Datum` datetime NOT NULL,
  `Nazev` varchar(50) NOT NULL,
  `Popis` varchar(120) DEFAULT NULL,
  `Upozorneni` tinyint(1) DEFAULT NULL,
  `TypupozorneniID` int(11) DEFAULT NULL,
  `UdalostID` int(11) NOT NULL,
  `UzivatelID` int(11) DEFAULT NULL,
  `SkupinaID` int(11) DEFAULT NULL,
  `PSC` int(5) DEFAULT NULL,
  `Adresa` varchar(250) DEFAULT NULL,
  `Soubor` blob
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vypisuji data pro tabulku `Udalost`
--

INSERT INTO `Udalost` (`Datum`, `Nazev`, `Popis`, `Upozorneni`, `TypupozorneniID`, `UdalostID`, `UzivatelID`, `SkupinaID`, `PSC`, `Adresa`, `Soubor`) VALUES
('2019-06-03 18:00:00', 'mojeudalsot1564', 'Moje test Udalosts https://www.seznam.cz/ a seznam.cz', 0, NULL, 58, 75, NULL, 753159, 'Rychnov Nepomockeho 495', NULL),
('2019-06-04 08:02:00', 'isuUdalost', 'Test udalosti', 0, NULL, 59, 75, NULL, 34567, 'Nachod Nepomockeho 495', NULL),
('2019-06-04 08:02:00', 'isuUdalost', 'Test udalosti', 0, NULL, 60, 75, NULL, 34567, 'Nachod Nepomockeho 495', NULL),
('2019-06-05 06:20:00', 'mojeudalsot021', 'Test udalosti', 0, NULL, 61, 75, NULL, 95173, 'Hrade Kralove Nepomockeho 495', NULL),
('2019-06-07 10:00:00', 'mojeudalsots', 'Moje test Udalosts https://www.seznam.cz/ a seznam.cz', 0, NULL, 67, 75, NULL, 123458, 'Hradec Kralove Nepomockeho 495', NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `Uzivatel`
--

CREATE TABLE `Uzivatel` (
  `Email` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Heslo` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `UzivatelID` int(11) NOT NULL,
  `Username` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vypisuji data pro tabulku `Uzivatel`
--

INSERT INTO `Uzivatel` (`Email`, `Heslo`, `UzivatelID`, `Username`) VALUES
('pica@email.com', '$2a$10$JAbW7Etog/i95dqjOpShWeuiav2HycgiLiHGTQrkELYVPOl4VcSS6', 74, 'tomasrysalek'),
('kkk@gmail.com', '$2a$10$b2Kh9.Aanzqj9ALPVDwwEOtnF9hCNvW0KXXvs7Skq0/k8RMIKPMeS', 75, 'Gogousek'),
('3k@gmail.com', '$2a$10$GG.sIfDJAxT90DY0LIJyTeTAwIQ1zdyjXnnTVVRaMsKGhFNmg8LGC', 77, 'misarko'),
('tomas.rysalek@gmail.com', '$2a$10$Tk379Ov6wSZEtcLuf4EGl.HZblWaHWc4Ms5CTSF7ZsWxJjviFuIjK', 78, 'Tomáš Ryšálek');

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `Adresa`
--
ALTER TABLE `Adresa`
  ADD PRIMARY KEY (`PSC`);

--
-- Klíče pro tabulku `Chat`
--
ALTER TABLE `Chat`
  ADD PRIMARY KEY (`ID`);

--
-- Klíče pro tabulku `Prava`
--
ALTER TABLE `Prava`
  ADD PRIMARY KEY (`IDPrava`);

--
-- Klíče pro tabulku `Skupina`
--
ALTER TABLE `Skupina`
  ADD PRIMARY KEY (`SkupinaID`);

--
-- Klíče pro tabulku `SkupinaUzivatel`
--
ALTER TABLE `SkupinaUzivatel`
  ADD PRIMARY KEY (`SU_ID`),
  ADD KEY `IXFK_SkupinaUzivatel_Prava` (`ID_Prava`),
  ADD KEY `FK_SkupinaUzivatel_Uzivatel` (`UzivatelID`),
  ADD KEY `FK_SkupinaUzivatel_Skupina` (`SkupinaID`);

--
-- Klíče pro tabulku `Soubor`
--
ALTER TABLE `Soubor`
  ADD PRIMARY KEY (`SouborID`),
  ADD KEY `FK_Soubor_Udalost` (`UdalostID`);

--
-- Klíče pro tabulku `Typupozorneni`
--
ALTER TABLE `Typupozorneni`
  ADD PRIMARY KEY (`TypupozorneniID`);

--
-- Klíče pro tabulku `Udalost`
--
ALTER TABLE `Udalost`
  ADD PRIMARY KEY (`UdalostID`),
  ADD KEY `IXFK_Udalost_Skupina` (`SkupinaID`),
  ADD KEY `IXFK_Udalost_Uzivatel` (`UzivatelID`),
  ADD KEY `FK_Udalost_Typupozorneni` (`TypupozorneniID`);

--
-- Klíče pro tabulku `Uzivatel`
--
ALTER TABLE `Uzivatel`
  ADD PRIMARY KEY (`UzivatelID`),
  ADD UNIQUE KEY `UzivatelID` (`UzivatelID`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `Chat`
--
ALTER TABLE `Chat`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pro tabulku `Prava`
--
ALTER TABLE `Prava`
  MODIFY `IDPrava` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pro tabulku `Skupina`
--
ALTER TABLE `Skupina`
  MODIFY `SkupinaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pro tabulku `SkupinaUzivatel`
--
ALTER TABLE `SkupinaUzivatel`
  MODIFY `SU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pro tabulku `Soubor`
--
ALTER TABLE `Soubor`
  MODIFY `SouborID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `Typupozorneni`
--
ALTER TABLE `Typupozorneni`
  MODIFY `TypupozorneniID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `Udalost`
--
ALTER TABLE `Udalost`
  MODIFY `UdalostID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT pro tabulku `Uzivatel`
--
ALTER TABLE `Uzivatel`
  MODIFY `UzivatelID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `SkupinaUzivatel`
--
ALTER TABLE `SkupinaUzivatel`
  ADD CONSTRAINT `FK_SkupinaUzivatel_Prava` FOREIGN KEY (`ID_Prava`) REFERENCES `Prava` (`IDPrava`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_SkupinaUzivatel_Skupina` FOREIGN KEY (`SkupinaID`) REFERENCES `Skupina` (`skupinaid`),
  ADD CONSTRAINT `FK_SkupinaUzivatel_Uzivatel` FOREIGN KEY (`UzivatelID`) REFERENCES `Uzivatel` (`uzivatelid`);

--
-- Omezení pro tabulku `Soubor`
--
ALTER TABLE `Soubor`
  ADD CONSTRAINT `FK_Soubor_Udalost` FOREIGN KEY (`UdalostID`) REFERENCES `Udalost` (`udalostid`);

--
-- Omezení pro tabulku `Udalost`
--
ALTER TABLE `Udalost`
  ADD CONSTRAINT `FK_Udalost_Typupozorneni` FOREIGN KEY (`TypupozorneniID`) REFERENCES `Typupozorneni` (`typupozorneniid`),
  ADD CONSTRAINT `FK_Udalost_Uzivatel` FOREIGN KEY (`UzivatelID`) REFERENCES `Uzivatel` (`uzivatelid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
