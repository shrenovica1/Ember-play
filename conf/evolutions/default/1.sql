# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table "city" (
  id                            uuid not null,
  name                          varchar(255),
  country                       uuid,
  constraint pk_city primary key (id)
);

create table "country" (
  id                            uuid not null,
  name                          varchar(255),
  constraint pk_country primary key (id)
);

create table "cousine" (
  id                            uuid not null,
  name                          varchar(255),
  constraint pk_cousine primary key (id)
);

create table "photo" (
  id                            uuid not null,
  photopath                     varchar(255),
  restaurant_id                 uuid,
  constraint pk_photo primary key (id)
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
  address                       varchar(255),
  description                   varchar(255),
  pricerange                    float,
  rating                        float,
  profileimagefile              varchar(255),
  opentime                      varchar(255),
  closetime                     varchar(255),
  phone                         varchar(255),
  coverfile                     varchar(255),
  longitude                     float,
  latitude                      float,
  constraint pk_restaurant primary key (id)
);

create table "review" (
  id                            uuid not null,
  name                          varchar(255),
  constraint pk_review primary key (id)
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

alter table "city" add constraint fk_city_country foreign key (country) references "country" (id) on delete restrict on update restrict;
create index ix_city_country on "city" (country);


# --- !Downs

alter table if exists "city" drop constraint if exists fk_city_country;
drop index if exists ix_city_country;

drop table if exists "city" cascade;

drop table if exists "country" cascade;

drop table if exists "cousine" cascade;

drop table if exists "photo" cascade;

drop table if exists "restaurant_table" cascade;

drop table if exists "restaurant" cascade;

drop table if exists "review" cascade;

drop table if exists "users" cascade;

