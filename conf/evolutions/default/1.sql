# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table "city" (
  id                            uuid not null,
  name                          varchar(255),
  constraint pk_city primary key (id)
);

create table "cousine" (
  id                            uuid not null,
  name                          varchar(255),
  constraint pk_cousine primary key (id)
);

create table "restaurant_table" (
  id                            uuid not null,
  restaurant_id                 uuid,
  chairs                        integer,
  constraint pk_restaurant_table primary key (id)
);

create table "restaurant" (
  id                            uuid not null,
  name                          varchar(255),
  constraint pk_restaurant primary key (id)
);

create table "users" (
  id                            uuid not null,
  firstname                     varchar(255),
  lastname                      varchar(255),
  city                          varchar(255),
  country                       varchar(255),
  phone                         varchar(255),
  email                         varchar(255),
  passwor                       varchar(255),
  is_admin                      boolean,
  constraint pk_users primary key (id)
);


# --- !Downs

drop table if exists "city" cascade;

drop table if exists "cousine" cascade;

drop table if exists "restaurant_table" cascade;

drop table if exists "restaurant" cascade;

drop table if exists "users" cascade;

