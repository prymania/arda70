
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
  `action_type` int    DEFAULT 1 COMMENT 'เพื่อดู action โดย 1 ข้าว 2 พืชผัก/สมุนไพร พืชไร่ พืชสวน 3 ปศุสัตว์ 4 ประมงน้ำจืด',
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
-- Table structure for table `CONFIG_SYSTEM`
--

CREATE TABLE `CONFIG_SYSTEM` (
  `keyid` varchar(10) NOT NULL,
  `value` varchar(100) DEFAULT NULL
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
-- Table structure for table `LOGINS`
--

CREATE TABLE `LOGINS` (
  `login_id` bigint(20) UNSIGNED NOT NULL,
  `login_ip` varchar(255) DEFAULT NULL,
  `login_device` varchar(255) NOT NULL,
  `login_uuid` varchar(255) NOT NULL,
  `login_retoken` varchar(1000) NOT NULL,
  `login_enable_flag` tinyint(1) NOT NULL,
  `login_created_date` timestamp NULL DEFAULT NULL,
  `login_updated_date` timestamp NULL DEFAULT NULL,
  `login_retoken_expire_date` timestamp NULL DEFAULT NULL,
  `username` varchar(100) NOT NULL
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
-- Table structure for table `PLANTS_BY_SPI_INDEX`
--

CREATE TABLE `PLANTS_BY_SPI_INDEX` (
  `id` bigint(20) NOT NULL,
  `plant_index` int(11) DEFAULT NULL,
  `plant` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ROLE`
--

CREATE TABLE `ROLE` (
  `role_id` int(11) NOT NULL,
  `role_name_thai` varchar(255) DEFAULT NULL,
  `role_name_english` varchar(255) DEFAULT NULL
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
-- Table structure for table `SOIL_METER`
--

CREATE TABLE `SOIL_METER` (
  `sid` int(11) NOT NULL,
  `record_date` datetime DEFAULT current_timestamp(),
  `plang_id` int(11) DEFAULT NULL,
  `soil` float DEFAULT 0,
  `t` float DEFAULT 0,
  `ph` float DEFAULT 0,
  `ec` float DEFAULT 0,
  `n` float DEFAULT 0,
  `p` float DEFAULT 0,
  `k` float DEFAULT 0,
  `detail` varchar(1000) DEFAULT ''
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
  `register_id` bigint(20) NOT NULL,
  `user_status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `USERS_LOGIN_COUNT`
--

CREATE TABLE `USERS_LOGIN_COUNT` (
  `username` varchar(100) NOT NULL,
  `last_login_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `amount` bigint(20) NOT NULL
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

