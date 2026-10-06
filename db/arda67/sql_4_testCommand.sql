-- Active: 1763642358709@@127.0.0.1@3306@arda68
select * from activity;

select * from users;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 20, 2025 at 01:04 PM
-- Server version: 10.3.32-MariaDB-0ubuntu0.20.04.1
-- PHP Version: 8.2.12


update plang set username = 'p1' where plang_id < 100;

delete from users_login_count;

delete from logins;

delete from plang where plang_id > 200;

select distinct type1 from activity_master

CREATE TABLE activity_type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_th VARCHAR(100) NOT NULL
);

CREATE TABLE action_master (
    id INT PRIMARY KEY AUTO_INCREMENT,
    activity_type_id INT NOT NULL,

    action1 VARCHAR(255),
    action2 VARCHAR(255),
    action3 VARCHAR(255),

    FOREIGN KEY (activity_type_id) REFERENCES activity_type(id)
);


drop table action_master;
drop table `action`;