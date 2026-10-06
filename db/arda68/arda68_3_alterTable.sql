
--
-- Indexes for table `ACTION`
--
ALTER TABLE `ACTION`
  ADD PRIMARY KEY (`action_id`);

--
-- Indexes for table `ACTION_MASTER`
--
ALTER TABLE `ACTION_MASTER`
  ADD PRIMARY KEY (`aid`);

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
-- Indexes for table `BACKUP_ACTIVITY`
--
ALTER TABLE `BACKUP_ACTIVITY`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `activity_plangid_fk` (`plang_id`),
  ADD KEY `activity_subplangid_fk` (`subplang_id`);

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
-- Indexes for table `CONFIG_SYSTEM`
--
ALTER TABLE `CONFIG_SYSTEM`
  ADD PRIMARY KEY (`keyid`);

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
-- Indexes for table `LOGINS`
--
ALTER TABLE `LOGINS`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `login_uuid` (`login_uuid`);

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
-- Indexes for table `PLANTS_BY_SPI_INDEX`
--
ALTER TABLE `PLANTS_BY_SPI_INDEX`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `SOIL_METER`
--
ALTER TABLE `SOIL_METER`
  ADD PRIMARY KEY (`sid`);

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
-- Indexes for table `USERS_LOGIN_COUNT`
--
ALTER TABLE `USERS_LOGIN_COUNT`
  ADD PRIMARY KEY (`username`);

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
-- AUTO_INCREMENT for table `ACTION`
--
ALTER TABLE `ACTION`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ACTION_MASTER`
--
ALTER TABLE `ACTION_MASTER`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `BACKUP_ACTIVITY`
--
ALTER TABLE `BACKUP_ACTIVITY`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `LOGINS`
--
ALTER TABLE `LOGINS`
  MODIFY `login_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `PLANTS_BY_SPI_INDEX`
--
ALTER TABLE `PLANTS_BY_SPI_INDEX`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SOIL_LOCATION`
--
ALTER TABLE `SOIL_LOCATION`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SOIL_METER`
--
ALTER TABLE `SOIL_METER`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `BACKUP_ACTIVITY`
--
ALTER TABLE `BACKUP_ACTIVITY`
  ADD CONSTRAINT `activity_plangid_fk` FOREIGN KEY (`plang_id`) REFERENCES `PLANG` (`plang_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `activity_subplangid_fk` FOREIGN KEY (`subplang_id`) REFERENCES `SUBPLANG` (`subplang_id`) ON DELETE CASCADE;

--
-- Constraints for table `COMMUNITY`
--
ALTER TABLE `COMMUNITY`
  ADD CONSTRAINT `HC_fk_headuser` FOREIGN KEY (`head_user`) REFERENCES `USERS` (`username`) ON DELETE NO ACTION;

--
-- Constraints for table `COMMUNITY_ENTERPRISE`
--
ALTER TABLE `COMMUNITY_ENTERPRISE`
  ADD CONSTRAINT `CE_fk_headuser` FOREIGN KEY (`head_user`) REFERENCES `USERS` (`username`) ON DELETE NO ACTION;

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
  ADD CONSTRAINT `plang_username_fk` FOREIGN KEY (`username`) REFERENCES `USERS` (`username`) ON DELETE CASCADE;

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
-- Constraints for table `USERS_LOGIN_COUNT`
--
ALTER TABLE `USERS_LOGIN_COUNT`
  ADD CONSTRAINT `USERS_LOGIN_COUNT_FK` FOREIGN KEY (`username`) REFERENCES `USERS` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

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
COMMIT;
