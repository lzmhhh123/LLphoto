drop database if exists mobile_pj;
create database mobile_pj;
use mobile_pj;

create table users (
    username char(128),
    password char(128)
);

-- images are encrypted by users pub_key
create table images_bak (
    username char(128),
    img_hash char(128),
    tags char(128),
    sentence text
);
