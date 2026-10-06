-- Active: 1763642358709@@127.0.0.1@3306@arda68

/*table  พฤติกรรม ************************************/




create or replace procedure sp_dropTable ()
BEGIN
  DROP TABLE IF EXISTS LOGINS;
  DROP TABLE IF EXISTS COMMUNITY_MEMBER;
  DROP TABLE IF EXISTS COMMUNITY_ENTERPRISE_MEMBER;
  DROP TABLE IF EXISTS COMMUNITY;
  DROP TABLE IF EXISTS COMMUNITY_ENTERPRISE;

  DROP TABLE IF EXISTS DISASTER_PICTURE;
  DROP TABLE IF EXISTS ACTIVITY_PICTURE;
  DROP TABLE IF EXISTS SUBPLANG_PICTURE;
  DROP TABLE IF EXISTS PLANG_PICTURE;
  DROP TABLE IF EXISTS DISASTER;
  DROP TABLE IF EXISTS ACTIVITY;
  DROP TABLE IF EXISTS WATER_SUPPLY;
  DROP TABLE IF EXISTS WATER_SOURCE;
  DROP TABLE IF EXISTS SUBPLANG;
  DROP TABLE IF EXISTS PLANG;
  DROP TABLE IF EXISTS USER_ROLE;
  DROP TABLE IF EXISTS ROLE;
  DROP TABLE IF EXISTS USERS;

  DROP TABLE IF EXISTS MODEL_SSI;
  DROP TABLE IF EXISTS MODEL_NDVI;
  DROP TABLE IF EXISTS MODEL_SPI;
  DROP TABLE IF EXISTS MODEL_SRI;
  DROP TABLE IF EXISTS MODEL_WDI;
  DROP TABLE IF EXISTS SOIL_LOCATION;
  DROP TABLE IF EXISTS SOIL_PLANT;
  DROP TABLE IF EXISTS STATION;
  DROP TABLE IF EXISTS STATION_CODE;
  DROP TABLE IF EXISTS ALERT;
  DROP TABLE IF EXISTS STATION;
  DROP TABLE IF EXISTS ACTIVITY_MASTER;
end;





/*

DROP TABLE IF EXISTS LOGINS;
DROP TABLE IF EXISTS COMMUNITY_MEMBER;
DROP TABLE IF EXISTS COMMUNITY_ENTERPRISE_MEMBER;
DROP TABLE IF EXISTS COMMUNITY;
DROP TABLE IF EXISTS COMMUNITY_ENTERPRISE;

DROP TABLE IF EXISTS DISASTER_PICTURE;
DROP TABLE IF EXISTS ACTIVITY_PICTURE;
DROP TABLE IF EXISTS SUBPLANG_PICTURE;
DROP TABLE IF EXISTS PLANG_PICTURE;
DROP TABLE IF EXISTS DISASTER;
DROP TABLE IF EXISTS ACTIVITY;
DROP TABLE IF EXISTS WATER_SUPPLY;
DROP TABLE IF EXISTS WATER_SOURCE;
DROP TABLE IF EXISTS SUBPLANG;
DROP TABLE IF EXISTS PLANG;
DROP TABLE IF EXISTS USER_ROLE;
DROP TABLE IF EXISTS ROLE;
DROP TABLE IF EXISTS USERS;

DROP TABLE IF EXISTS MODEL_SSI;
DROP TABLE IF EXISTS MODEL_NDVI;
DROP TABLE IF EXISTS MODEL_SPI;
DROP TABLE IF EXISTS MODEL_SRI;
DROP TABLE IF EXISTS MODEL_WDI;
DROP TABLE IF EXISTS SOIL_LOCATION;
DROP TABLE IF EXISTS SOIL_PLANT;
DROP TABLE IF EXISTS STATION;
DROP TABLE IF EXISTS STATION_CODE;
DROP TABLE IF EXISTS ALERT;
DROP TABLE IF EXISTS STATION;
DROP TABLE IF EXISTS ACTIVITY_MASTER;

*/
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arda66`
--

-- --------------------------------------------------------

--
-- Table structure for table `ACTIVITY`
--

CREATE TABLE `ACTIVITY` (
  `activity_id` bigint(20) NOT NULL,
  `plang_id` int(11) DEFAULT 0,
  `subplang_id` int(11) DEFAULT NULL,
  `type1` varchar(100) DEFAULT '' COMMENT 'ประเภท เช่นปลูกข้าว ผัก สวน ปศุสัตว์ ประมงน้ำจืด',
  `type2` varchar(100) DEFAULT '' COMMENT 'ประเภท เช่นข้าวเจ้า ข้าวเหนียว ไก่ เป็ด',
  `type3` varchar(100) DEFAULT '' COMMENT 'พันธุ์ เช่น ปลาทับทิม พันธ์มะม่วง',
  `original` int(11) DEFAULT 1 COMMENT 'เป็นกิจกรรมแบบอาชีพ หรือ ทำเพิ่ม เช่นเผาถ่าน ใส่ปุ๋ย พรวนดิน',
  `valid` int(11) DEFAULT 1 COMMENT '1 ทำอยู่,  0 เลิกทำแล้ว',
  `pattern` int(11) DEFAULT 0 COMMENT 'จำนวน/พื้นที่/อื่นๆ 1 พื้นที่, 2 จำนวน, 3 พื้นที่/จำนวน, 4 บ่อกระชังและจำนวน',
  `msquare` double DEFAULT 0 COMMENT 'เกิดจากการคำนวน ไร่ งาน วา',
  `rai` double DEFAULT 0 COMMENT 'ถ้าเป็นปลา เก็บ ตัว/บ่อ',
  `ngan` double DEFAULT 0 COMMENT 'ถ้าเป็นปลา เก็บ จำนวนบ่อ',
  `wa` double DEFAULT 0 COMMENT 'ถ้าเป็นปลา เก็บ จำนวนกระชัง',
  `pond` int(11) DEFAULT 0 COMMENT 'ประมง เก็บจำนวนบ่อ',
  `amount_per_pond` int(11) DEFAULT 0 COMMENT 'ประมง เก็บจำนวนตัวต่อบ่อ และคำนวณไปเก็บ amount ด้วย',
  `amount` int(11) DEFAULT 0 COMMENT 'ถ้า pattern มีการเก็บจำนวน เก็บเป็นต้น หรือ ตัว',
  `unit` varchar(100) DEFAULT '' COMMENT 'ลักษณะนาม เช่น ตัว ถาด ต้น ก้อน กอ',
  `start_date` date DEFAULT current_timestamp(),
  `end_date` date DEFAULT NULL,
  `detail` text DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ACTIVITY_MASTER`
--

CREATE TABLE `ACTIVITY_MASTER` (
  `aid` int(11) NOT NULL,
  `type1` varchar(100) DEFAULT '' COMMENT 'ประเภท เช่นปลูกข้าว ผัก สวน ปศุสัตว์ ประมงน้ำจืด',
  `type2` varchar(100) DEFAULT '' COMMENT 'ประเภท เช่นข้าวเจ้า ข้าวเหนียว ไก่ เป็ด',
  `type3` varchar(100) DEFAULT '' COMMENT 'พันธุ์ เช่น ปลาทับทิม พันธ์มะม่วง',
  `pattern` int(11) DEFAULT 0 COMMENT 'จำนวน/พื้นที่/อื่นๆ 1 พื้นที่, 2 จำนวน, 3 พื้นที่/จำนวน, 4 ตัวบ่อกระชัง',
  `unit` varchar(100) DEFAULT '' COMMENT 'ลักษณะนาม เช่น ตัว ถาด ต้น ก้อน กอ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ACTIVITY_PICTURE`
--

CREATE TABLE `ACTIVITY_PICTURE` (
  `picture_id` int(11) NOT NULL,
  `activity_id` int(11) DEFAULT 0,
  `picture` varchar(255) DEFAULT '',
  `detail` varchar(500) DEFAULT '',
  `upload_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ALERT`
--

CREATE TABLE `ALERT` (
  `alert_id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `alert_date` datetime DEFAULT current_timestamp(),
  `alert_enddate` datetime DEFAULT NULL,
  `alert_type` varchar(100) DEFAULT '' COMMENT 'พืช สัตว์ ภัยพิบัติ อื่น ๆ',
  `detail` varchar(500) DEFAULT '',
  `picture` varchar(500) DEFAULT '',
  `response_id` int(11) DEFAULT 0,
  `announcement` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `COMMUNITY`
--

CREATE TABLE `COMMUNITY` (
  `community_id` int(11) NOT NULL,
  `community_name` varchar(100) DEFAULT '',
  `head_user` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `COMMUNITY_ENTERPRISE`
--

CREATE TABLE `COMMUNITY_ENTERPRISE` (
  `ce_id` int(11) NOT NULL,
  `ce_name` varchar(100) DEFAULT '',
  `head_user` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `COMMUNITY_ENTERPRISE_MEMBER`
--

CREATE TABLE `COMMUNITY_ENTERPRISE_MEMBER` (
  `mid` int(11) NOT NULL,
  `ce_id` int(11) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `COMMUNITY_MEMBER`
--

CREATE TABLE `COMMUNITY_MEMBER` (
  `mid` int(11) NOT NULL,
  `community_id` int(11) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `DISASTER`
--

CREATE TABLE `DISASTER` (
  `disaster_id` int(11) NOT NULL,
  `plang_id` int(11) DEFAULT 0,
  `category` varchar(100) DEFAULT '' COMMENT 'ภัยพิบัติ โรคพืช โรคสัตว์',
  `type` varchar(100) DEFAULT '' COMMENT 'น้ำท่วม แล้ง ชื่อโรคพืช ชื่อโรคสัตว์',
  `affect` varchar(500) DEFAULT '' COMMENT 'ผลกระทบต่อรากใบ วัว หมู',
  `start_date` date DEFAULT current_timestamp(),
  `end_date` date DEFAULT NULL,
  `size` double DEFAULT 0,
  `unit` varchar(10) DEFAULT '',
  `detail` text DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `DISASTER_PICTURE`
--

CREATE TABLE `DISASTER_PICTURE` (
  `picture_id` int(11) NOT NULL,
  `disaster_id` int(11) DEFAULT 0,
  `picture` varchar(255) DEFAULT '',
  `detail` varchar(500) DEFAULT '',
  `upload_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `MODEL_NDVI`
--

CREATE TABLE `MODEL_NDVI` (
  `id` int(11) NOT NULL,
  `station_code` varchar(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `value` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `MODEL_SPI`
--

CREATE TABLE `MODEL_SPI` (
  `id` int(11) NOT NULL,
  `station_code` varchar(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `value` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `MODEL_SRI`
--

CREATE TABLE `MODEL_SRI` (
  `id` int(11) NOT NULL,
  `station_code` varchar(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `value` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `MODEL_SSI`
--

CREATE TABLE `MODEL_SSI` (
  `id` int(11) NOT NULL,
  `station_code` varchar(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `value` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `MODEL_WDI`
--

CREATE TABLE `MODEL_WDI` (
  `id` bigint(20) NOT NULL,
  `station_code` varchar(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `river` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `PLANG`
--

CREATE TABLE `PLANG` (
  `plang_id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT '',
  `lat_long` text DEFAULT NULL,
  `center` varchar(255) DEFAULT '',
  `msquare` double DEFAULT 0,
  `rai` double DEFAULT 0,
  `ngan` double DEFAULT 0,
  `wa` double DEFAULT 0,
  `address_code` varchar(10) DEFAULT '',
  `moo` varchar(10) DEFAULT '',
  `village` varchar(100) DEFAULT '',
  `road` varchar(100) DEFAULT '',
  `subdistrict` varchar(100) DEFAULT '',
  `district` varchar(100) DEFAULT '',
  `province` varchar(100) DEFAULT '',
  `plang_name` varchar(100) DEFAULT '',
  `title_deed` varchar(100) DEFAULT '',
  `own_type` varchar(100) DEFAULT '',
  `detail` varchar(500) DEFAULT '',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `PLANG_PICTURE`
--

CREATE TABLE `PLANG_PICTURE` (
  `picture_id` int(11) NOT NULL,
  `plang_id` int(11) DEFAULT 0,
  `picture` varchar(255) DEFAULT '',
  `detail` varchar(500) DEFAULT '',
  `upload_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ROLE`
--

CREATE TABLE `ROLE` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(100) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `SOIL_LOCATION`
--

CREATE TABLE `SOIL_LOCATION` (
  `id` int(11) NOT NULL,
  `latitude` varchar(30) DEFAULT '',
  `longitude` varchar(30) DEFAULT '',
  `soil_group` varchar(30) DEFAULT '' COMMENT 'กลุ่มชุดดิน เช่น MA',
  `soil_aka` varchar(30) DEFAULT '' COMMENT 'ชื่อชุดดินตัวย่อ  เช่น MA, St, Pt',
  `soil_name` varchar(500) DEFAULT '' COMMENT 'ชื่อชุดดิน เช่น ประทาย',
  `soil_fertility` varchar(30) DEFAULT '' COMMENT 'ความอุดมสมบูรณ์ของดิน ต่ำ ปานกลาง',
  `soil_ph` varchar(100) DEFAULT '' COMMENT 'ค่าความเป็นกรด-ด่าง',
  `soil_texture` varchar(500) DEFAULT '' COMMENT 'ลักษณะเนื้อดิน เช่น ดินร่วน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `SOIL_PLANT`
--

CREATE TABLE `SOIL_PLANT` (
  `id` int(11) NOT NULL,
  `soil_aka` varchar(30) DEFAULT NULL,
  `suitable_plant` varchar(300) DEFAULT '',
  `soil_property` text DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `STATION`
--

CREATE TABLE `STATION` (
  `sid` int(11) NOT NULL,
  `station_code` varchar(20) DEFAULT NULL,
  `station_type` int(11) DEFAULT 0,
  `district_code` varchar(10) DEFAULT '',
  `latitude` varchar(30) DEFAULT '',
  `longitude` varchar(30) DEFAULT '',
  `subdistrict` varchar(100) DEFAULT '',
  `district` varchar(100) DEFAULT '',
  `province` varchar(100) DEFAULT '',
  `detail` varchar(500) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `STATION_CODE`
--

CREATE TABLE `STATION_CODE` (
  `sid` int(11) NOT NULL,
  `station_code` varchar(20) DEFAULT NULL,
  `nameTH` varchar(500) DEFAULT '',
  `nameEN` varchar(500) DEFAULT '',
  `areaTH` varchar(500) DEFAULT '',
  `station_type` varchar(100) DEFAULT '',
  `district_code` varchar(10) DEFAULT '',
  `latitude` varchar(30) DEFAULT '',
  `longitude` varchar(30) DEFAULT '',
  `subdistrict` varchar(100) DEFAULT '',
  `district` varchar(100) DEFAULT '',
  `province` varchar(100) DEFAULT '',
  `detail` varchar(500) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `SUBPLANG`
--

CREATE TABLE `SUBPLANG` (
  `subplang_id` int(11) NOT NULL,
  `plang_id` int(11) DEFAULT 0,
  `lat_long` text DEFAULT NULL,
  `center` varchar(255) DEFAULT '',
  `msquare` double DEFAULT 0,
  `rai` double DEFAULT 0,
  `ngan` double DEFAULT 0,
  `wa` double DEFAULT 0,
  `detail` varchar(500) DEFAULT '',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `SUBPLANG_PICTURE`
--

CREATE TABLE `SUBPLANG_PICTURE` (
  `picture_id` int(11) NOT NULL,
  `subplang_id` int(11) DEFAULT 0,
  `picture` varchar(255) DEFAULT '',
  `detail` varchar(500) DEFAULT '',
  `upload_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `username` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(100) DEFAULT NULL,
  `title` varchar(50) DEFAULT '',
  `name` varchar(100) DEFAULT '',
  `surname` varchar(100) DEFAULT '',
  `email` varchar(200) DEFAULT '',
  `idcard` varchar(13) DEFAULT '0000000000000',
  `gender` char(1) DEFAULT '',
  `birthday` date DEFAULT NULL,
  `family_member` int(11) DEFAULT 0,
  `address_code` varchar(10) DEFAULT '',
  `houseid` varchar(10) DEFAULT '',
  `moo` varchar(10) DEFAULT '',
  `village` varchar(100) DEFAULT '',
  `road` varchar(100) DEFAULT '',
  `subdistrict` varchar(100) DEFAULT '',
  `district` varchar(100) DEFAULT '',
  `province` varchar(100) DEFAULT '',
  `post` varchar(5) DEFAULT '',
  `phone` varchar(20) DEFAULT '',
  `info` varchar(255) DEFAULT '',
  `picture` varchar(255) DEFAULT '',
  `user_role` varchar(10) DEFAULT '2',
  `user_type` varchar(100) DEFAULT '',
  `education` varchar(100) DEFAULT '',
  `position` varchar(100) DEFAULT '',
  `company` varchar(100) DEFAULT '',
  `star_farmer` int(11) DEFAULT 0,
  `consent` int(11) DEFAULT 0,
  `register_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `register_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `USER_ROLE`
--

CREATE TABLE `USER_ROLE` (
  `uroleid` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `WATER_SOURCE`
--

CREATE TABLE `WATER_SOURCE` (
  `wid` int(11) NOT NULL,
  `plang_id` int(11) DEFAULT NULL,
  `source_type` varchar(50) DEFAULT '' COMMENT 'ประเภท เช่น ห้วย หนอง คลอง บึง แม่น้ำ',
  `source_name` varchar(100) DEFAULT '',
  `width` float DEFAULT 0,
  `depth` float DEFAULT 0,
  `water_depth` float DEFAULT 0,
  `detail` text DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `WATER_SUPPLY`
--

CREATE TABLE `WATER_SUPPLY` (
  `wid` int(11) NOT NULL,
  `plang_id` int(11) DEFAULT NULL,
  `supply_type` varchar(50) DEFAULT '' COMMENT 'ประเภท - บ่อจิ๋ว, น้ำบาดาล',
  `width` float DEFAULT 0,
  `depth` float DEFAULT 0,
  `water_depth` float DEFAULT 0,
  `detail` text DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ACTIVITY`
--
ALTER TABLE `ACTIVITY`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `activityn_plangid_fk` (`plang_id`),
  ADD KEY `activityn_subplangid_fk` (`subplang_id`);

--
-- Indexes for table `ACTIVITY_MASTER`
--
ALTER TABLE `ACTIVITY_MASTER`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `ACTIVITY_PICTURE`
--
ALTER TABLE `ACTIVITY_PICTURE`
  ADD PRIMARY KEY (`picture_id`);

--
-- Indexes for table `ALERT`
--
ALTER TABLE `ALERT`
  ADD PRIMARY KEY (`alert_id`),
  ADD KEY `alert_username_fk` (`username`);

--
-- Indexes for table `COMMUNITY`
--
ALTER TABLE `COMMUNITY`
  ADD PRIMARY KEY (`community_id`),
  ADD KEY `HC_fk_headuser` (`head_user`);

--
-- Indexes for table `COMMUNITY_ENTERPRISE`
--
ALTER TABLE `COMMUNITY_ENTERPRISE`
  ADD PRIMARY KEY (`ce_id`),
  ADD KEY `CE_fk_headuser` (`head_user`);

--
-- Indexes for table `COMMUNITY_ENTERPRISE_MEMBER`
--
ALTER TABLE `COMMUNITY_ENTERPRISE_MEMBER`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `CE_MEMBER_cmid` (`ce_id`),
  ADD KEY `CE_MEMBER_username` (`username`);

--
-- Indexes for table `COMMUNITY_MEMBER`
--
ALTER TABLE `COMMUNITY_MEMBER`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `COMMUNITY_MEMBER_community_id` (`community_id`),
  ADD KEY `COMMUNITY_MEMBER_username` (`username`);

--
-- Indexes for table `DISASTER`
--
ALTER TABLE `DISASTER`
  ADD PRIMARY KEY (`disaster_id`),
  ADD KEY `disaster_plangid_fk` (`plang_id`);

--
-- Indexes for table `DISASTER_PICTURE`
--
ALTER TABLE `DISASTER_PICTURE`
  ADD PRIMARY KEY (`picture_id`),
  ADD KEY `disaster_picture_fk_disasterid` (`disaster_id`);

--
-- Indexes for table `MODEL_NDVI`
--
ALTER TABLE `MODEL_NDVI`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MODEL_SPI`
--
ALTER TABLE `MODEL_SPI`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MODEL_SRI`
--
ALTER TABLE `MODEL_SRI`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MODEL_SSI`
--
ALTER TABLE `MODEL_SSI`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MODEL_WDI`
--
ALTER TABLE `MODEL_WDI`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `PLANG`
--
ALTER TABLE `PLANG`
  ADD PRIMARY KEY (`plang_id`),
  ADD KEY `plang_username_fk` (`username`);

--
-- Indexes for table `PLANG_PICTURE`
--
ALTER TABLE `PLANG_PICTURE`
  ADD PRIMARY KEY (`picture_id`),
  ADD KEY `plang_picture_fk_plangid` (`plang_id`);

--
-- Indexes for table `ROLE`
--
ALTER TABLE `ROLE`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `SOIL_LOCATION`
--
ALTER TABLE `SOIL_LOCATION`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SOIL_PLANT`
--
ALTER TABLE `SOIL_PLANT`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `soil_aka` (`soil_aka`);

--
-- Indexes for table `STATION`
--
ALTER TABLE `STATION`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `station_code` (`station_code`);

--
-- Indexes for table `STATION_CODE`
--
ALTER TABLE `STATION_CODE`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `station_unique` (`station_code`);

--
-- Indexes for table `SUBPLANG`
--
ALTER TABLE `SUBPLANG`
  ADD PRIMARY KEY (`subplang_id`),
  ADD KEY `subplang_fk_plangid` (`plang_id`);

--
-- Indexes for table `SUBPLANG_PICTURE`
--
ALTER TABLE `SUBPLANG_PICTURE`
  ADD PRIMARY KEY (`picture_id`),
  ADD KEY `subplang_picture_fk_subplangid` (`subplang_id`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `register_id` (`register_id`);

--
-- Indexes for table `USER_ROLE`
--
ALTER TABLE `USER_ROLE`
  ADD PRIMARY KEY (`uroleid`),
  ADD UNIQUE KEY `ur_pk` (`username`,`role_id`),
  ADD KEY `ur_roleid_fk` (`role_id`);

--
-- Indexes for table `WATER_SOURCE`
--
ALTER TABLE `WATER_SOURCE`
  ADD PRIMARY KEY (`wid`),
  ADD KEY `water_source_plangid` (`plang_id`);

--
-- Indexes for table `WATER_SUPPLY`
--
ALTER TABLE `WATER_SUPPLY`
  ADD PRIMARY KEY (`wid`),
  ADD KEY `water_supply_plangid` (`plang_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ACTIVITY`
--
ALTER TABLE `ACTIVITY`
  MODIFY `activity_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ACTIVITY_MASTER`
--
ALTER TABLE `ACTIVITY_MASTER`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ACTIVITY_PICTURE`
--
ALTER TABLE `ACTIVITY_PICTURE`
  MODIFY `picture_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ALERT`
--
ALTER TABLE `ALERT`
  MODIFY `alert_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `COMMUNITY`
--
ALTER TABLE `COMMUNITY`
  MODIFY `community_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `COMMUNITY_ENTERPRISE`
--
ALTER TABLE `COMMUNITY_ENTERPRISE`
  MODIFY `ce_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `COMMUNITY_ENTERPRISE_MEMBER`
--
ALTER TABLE `COMMUNITY_ENTERPRISE_MEMBER`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `COMMUNITY_MEMBER`
--
ALTER TABLE `COMMUNITY_MEMBER`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DISASTER`
--
ALTER TABLE `DISASTER`
  MODIFY `disaster_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DISASTER_PICTURE`
--
ALTER TABLE `DISASTER_PICTURE`
  MODIFY `picture_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MODEL_NDVI`
--
ALTER TABLE `MODEL_NDVI`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MODEL_SPI`
--
ALTER TABLE `MODEL_SPI`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MODEL_SRI`
--
ALTER TABLE `MODEL_SRI`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MODEL_SSI`
--
ALTER TABLE `MODEL_SSI`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MODEL_WDI`
--
ALTER TABLE `MODEL_WDI`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PLANG`
--
ALTER TABLE `PLANG`
  MODIFY `plang_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PLANG_PICTURE`
--
ALTER TABLE `PLANG_PICTURE`
  MODIFY `picture_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SOIL_LOCATION`
--
ALTER TABLE `SOIL_LOCATION`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SOIL_PLANT`
--
ALTER TABLE `SOIL_PLANT`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `STATION`
--
ALTER TABLE `STATION`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `STATION_CODE`
--
ALTER TABLE `STATION_CODE`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SUBPLANG`
--
ALTER TABLE `SUBPLANG`
  MODIFY `subplang_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SUBPLANG_PICTURE`
--
ALTER TABLE `SUBPLANG_PICTURE`
  MODIFY `picture_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `register_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USER_ROLE`
--
ALTER TABLE `USER_ROLE`
  MODIFY `uroleid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `WATER_SOURCE`
--
ALTER TABLE `WATER_SOURCE`
  MODIFY `wid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `WATER_SUPPLY`
--
ALTER TABLE `WATER_SUPPLY`
  MODIFY `wid` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ACTIVITY`
--
ALTER TABLE `ACTIVITY`
  ADD CONSTRAINT `activityn_plangid_fk` FOREIGN KEY (`plang_id`) REFERENCES `PLANG` (`plang_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `activityn_subplangid_fk` FOREIGN KEY (`subplang_id`) REFERENCES `SUBPLANG` (`subplang_id`) ON DELETE CASCADE;

--
-- Constraints for table `ALERT`
--
ALTER TABLE `ALERT`
  ADD CONSTRAINT `alert_username_fk` FOREIGN KEY (`username`) REFERENCES `USERS` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `COMMUNITY`
--
ALTER TABLE `COMMUNITY`
  ADD CONSTRAINT `HC_fk_headuser` FOREIGN KEY (`head_user`) REFERENCES `USERS` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `COMMUNITY_ENTERPRISE`
--
ALTER TABLE `COMMUNITY_ENTERPRISE`
  ADD CONSTRAINT `CE_fk_headuser` FOREIGN KEY (`head_user`) REFERENCES `USERS` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `COMMUNITY_ENTERPRISE_MEMBER`
--
ALTER TABLE `COMMUNITY_ENTERPRISE_MEMBER`
  ADD CONSTRAINT `CE_MEMBER_cmid` FOREIGN KEY (`ce_id`) REFERENCES `COMMUNITY_ENTERPRISE` (`ce_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `CE_MEMBER_username` FOREIGN KEY (`username`) REFERENCES `USERS` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `COMMUNITY_MEMBER`
--
ALTER TABLE `COMMUNITY_MEMBER`
  ADD CONSTRAINT `COMMUNITY_MEMBER_community_id` FOREIGN KEY (`community_id`) REFERENCES `COMMUNITY` (`community_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `COMMUNITY_MEMBER_username` FOREIGN KEY (`username`) REFERENCES `USERS` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `DISASTER`
--
ALTER TABLE `DISASTER`
  ADD CONSTRAINT `disaster_plangid_fk` FOREIGN KEY (`plang_id`) REFERENCES `PLANG` (`plang_id`) ON DELETE CASCADE;

--
-- Constraints for table `DISASTER_PICTURE`
--
ALTER TABLE `DISASTER_PICTURE`
  ADD CONSTRAINT `disaster_picture_fk_disasterid` FOREIGN KEY (`disaster_id`) REFERENCES `DISASTER` (`disaster_id`) ON DELETE CASCADE;

--
-- Constraints for table `PLANG`
--
ALTER TABLE `PLANG`
  ADD CONSTRAINT `plang_username_fk` FOREIGN KEY (`username`) REFERENCES `USERS` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PLANG_PICTURE`
--
ALTER TABLE `PLANG_PICTURE`
  ADD CONSTRAINT `plang_picture_fk_plangid` FOREIGN KEY (`plang_id`) REFERENCES `PLANG` (`plang_id`) ON DELETE CASCADE;

--
-- Constraints for table `SUBPLANG`
--
ALTER TABLE `SUBPLANG`
  ADD CONSTRAINT `subplang_fk_plangid` FOREIGN KEY (`plang_id`) REFERENCES `PLANG` (`plang_id`) ON DELETE CASCADE;

--
-- Constraints for table `SUBPLANG_PICTURE`
--
ALTER TABLE `SUBPLANG_PICTURE`
  ADD CONSTRAINT `subplang_picture_fk_subplangid` FOREIGN KEY (`subplang_id`) REFERENCES `SUBPLANG` (`subplang_id`) ON DELETE CASCADE;

--
-- Constraints for table `USER_ROLE`
--
ALTER TABLE `USER_ROLE`
  ADD CONSTRAINT `ur_roleid_fk` FOREIGN KEY (`role_id`) REFERENCES `ROLE` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ur_username_fk` FOREIGN KEY (`username`) REFERENCES `USERS` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `WATER_SOURCE`
--
ALTER TABLE `WATER_SOURCE`
  ADD CONSTRAINT `water_source_plangid` FOREIGN KEY (`plang_id`) REFERENCES `PLANG` (`plang_id`) ON DELETE CASCADE;

--
-- Constraints for table `WATER_SUPPLY`
--
ALTER TABLE `WATER_SUPPLY`
  ADD CONSTRAINT `water_supply_plangid` FOREIGN KEY (`plang_id`) REFERENCES `PLANG` (`plang_id`) ON DELETE CASCADE;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



-- DROP TABLE IF EXISTS LOGINS;
CREATE TABLE LOGINS (
	login_id 				    serial 		    NOT NULL 	PRIMARY KEY,
	login_ip 				    varchar(255) 	NULL,
	login_device 			    varchar(255) 	NOT NULL,
	login_uuid 				    varchar(255) 	NOT NULL 	unique,
	login_retoken 			    varchar(255) 	NOT NULL,
	login_enable_flag 		    boolean 		NOT NULL,
	login_created_date 		    timestamp 		NULL,
	login_updated_date 		    timestamp 		NULL,
	login_retoken_expire_date 	timestamp 		NULL,
	username 					          varchar(100) 	NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ALTER TABLE `LOGINS`
--   ADD CONSTRAINT `login_username_fk` FOREIGN KEY (`username`) REFERENCES `USERS` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;



/*********** แก้อันนี้ใน cloud ด้วย **************************/

ALTER TABLE `COMMUNITY`
  ADD CONSTRAINT `COMMUNITY_fk_headuser` FOREIGN KEY (`head_user`) REFERENCES `USERS` (`username`) ON DELETE cascade on update  CASCADE;

--
-- Constraints for table `COMMUNITY_ENTERPRISE`
--
ALTER TABLE `COMMUNITY_ENTERPRISE`
  ADD CONSTRAINT `CE_fk_headuser` FOREIGN KEY (`head_user`) REFERENCES `USERS` (`username`) ON DELETE cascade on update  CASCADE;


/*******************************/

-- drop table `USERS_LOGIN_COUNT`
CREATE TABLE `USERS_LOGIN_COUNT` (
  `username` varchar(100) NOT NULL PRIMARY KEY,
  `last_login_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `amount` bigint(20) NOT NULL
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `USERS_LOGIN_COUNT`
add constraint `USERS_LOGIN_COUNT_FK` FOREIGN KEY(`username`) REFERENCES `USERS`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--------------
export const ROLE_GENERAL          = 1;  // ผู้ใช้งานทั่วไป
export const ROLE_FARMER           = 2;  // เกษตกร
export const ROLE_HEAD_CE          = 3;  // หัวหน้าสหกิจชุมชุน
export const ROLE_SUBDISTRICT_OFFICIER   = 4;  // ผู้นำชุมชน
export const ROLE_DISTRICT_OFFICER = 5;  // จนท. ระดับอำเภอ
export const ROLE_PROVINCE_OFFICER = 6;  // จนท. ระดับจังหวัด
export const ROLE_SE               = 7;  // วิสาหกิจชุมชน
export const ROLE_ADMIN            = 9;   // admin

insert into ROLE values(
  (1, 'ผู้ใช้งานทั่วไป',       'ROLE_GENERAL'),
  (2, 'เกษตกร',           'ROLE_FARMER'),
  (3, 'หัวหน้าสหกิจชุมชุน',   'ROLE_HEAD_CE'),
  (4, 'ผู้นำชุมชน',         'ROLE_SUBDISTRICT_OFFICIER'),
  (5, 'จนท. ระดับอำเภอ',    'ROLE_DISTRICT_OFFICER'),
  (6, 'จนท. ระดับจังหวัด',   'ROLE_PROVINCE_OFFICER'),
  (7, 'วิสาหกิจชุมชน',       'ROLE_SE'),
  (9, 'admin',            'admin')
);


-- drop table `CONFIG_SYSTEM`
CREATE TABLE `CONFIG_SYSTEM` (
    keyid   varchar(10) NOT NULL PRIMARY KEY,
    value   varchar(100)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;

-------------------------------------------------------------
-------------------------------------------------------------
-------------------------------------------------------------

CREATE TABLE ACTION_MASTER (
    aid             INT AUTO_INCREMENT PRIMARY KEY,
    activity_type1  VARCHAR(100) DEFAULT ''  COMMENT 'ชื่อ activity.type1 เช่น ปลูกข้าว พืชไร่ พืชสวน ประมง',
    action_name     VARCHAR(100) DEFAULT ''  COMMENT 'ชื่อพฤติกรรม เช่น ใส่ปุ๋ย ดำนา ล้างบ่อ', 
    unit            VARCHAR(100) DEFAULT ''  COMMENT 'หน่วย เช่น  ถุง กิโล บ่อ'
);

create table ACTION(
  action_id     int             AUTO_INCREMENT PRIMARY KEY,
  plang_id      int             references PLANG(plang_id),
  activity_id   int             references ACTIVITY(activity_id),
  action_name   varchar(100),
  amount        int,
  start_date    date,
  end_date      date,
  status        int       comment 'สถานะว่าทำเสร็จหรือยัง มั้ง 0 คือยังไม่เสร็จ 1 คือเสร็จแล้ว',
  detail        varchar(1000)
);




CREATE EVENT update_status_event
ON SCHEDULE EVERY 1 DAY
DO
    UPDATE ACTION
    SET status = 1
    WHERE end_date < CURDATE() AND status = 1;


-----------------------------------------------------
insert into ACTION_MASTER(activity_type1, action_name, unit)
  

create table SOIL_METER(
  sid           int             AUTO_INCREMENT PRIMARY KEY,
  record_date	datetime 		DEFAULT current_timestamp(),
  plang_id      int             references PLANG(plang_id),
  soil          float           default 0,
  t             float           default 0,
  ph            float           default 0,
  ec            float           default 0,
  n             float           default 0,
  p             float           default 0,
  k             float           default 0,
  detail        varchar(1000)
);

