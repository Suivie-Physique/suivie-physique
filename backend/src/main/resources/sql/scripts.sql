-- auto-generated definition
create table _user
(
    id                 bigint auto_increment
        primary key,
    account_locked     bit          not null,
    created_date       datetime(6)  not null,
    email              varchar(255) null,
    enabled            bit          not null,
    first_name         varchar(255) null,
    last_modified_date datetime(6)  null,
    last_name          varchar(255) null,
    password           varchar(255) null,
    constraint UK_k11y3pdtsrjgy8w9b6q4bjwrx
        unique (email)
);




-- auto-generated definition
create table _user_roles
(
    users_id bigint not null,
    roles_id bigint not null,
    constraint FK70hxe7dmigy3o5rabfjb3c8v7
        foreign key (roles_id) references _role (id),
    constraint FKkna43mk14wb08rt62w1982ki6
        foreign key (users_id) references _user (id)
);




create table _role
(
    id                 bigint auto_increment
        primary key,
    created_date       datetime(6)  not null,
    last_modified_date datetime(6)  null,
    name               varchar(255) null,
    constraint UK_ie6hi5cwdc7dcvmwvaaaay9vl
        unique (name)
);



-- auto-generated definition
create table token
(
    id           bigint auto_increment
        primary key,
    created_at   datetime(6)  null,
    expires_at   datetime(6)  null,
    token        varchar(255) null,
    validated_at datetime(6)  null,
    user_id      bigint       not null,
    constraint FKiblu4cjwvyntq3ugo31klp1c6
        foreign key (user_id) references _user (id)
);

-- partie paramétrage : jours fériés

create table _jour_ferier_demande
(
    id                  bigint auto_increment
        primary key,
    created_date        datetime(6)  not null,
    end_date            datetime(6)  null,
    last_modified_date  datetime(6)  null,
    start_date          datetime(6)  null,
    status              varchar(255) null,
    jour_ferier_type_id bigint       not null,
    user_id             bigint       not null,
    title               varchar(255) null,
    constraint FKjbs106ffk9poc7ybj9t5fsm0s
        foreign key (user_id) references _user (id),
    constraint FKk1dq9lkyh0muaqqsql3clxx5m
        foreign key (jour_ferier_type_id) references _jour_ferier_type (id)
);

create table _jour_ferier_type
(
    id                 bigint auto_increment
        primary key,
    created_date       datetime(6)  not null,
    description        varchar(255) null,
    last_modified_date datetime(6)  null,
    type               varchar(255) null
);


CREATE TABLE Lecteur
(
    id       INT PRIMARY KEY,
    Lecteur  VARCHAR(5) NULL
);

CREATE TABLE Circuit
(
    id       INT PRIMARY KEY,
    Circuit  TEXT NULL
);

CREATE TABLE points_de_capture
(
    id_Lecteur     INT,
    Libellet       TEXT,
    Type           CHAR(2) DEFAULT 'AG',
    id_Circuit     INT,
    Secteur        TEXT,
    Client_banque  CHAR(3),
    FOREIGN KEY (id_Lecteur) REFERENCES Lecteur(id),
    FOREIGN KEY (id_Circuit) REFERENCES Circuit(id)
);



insert into _role (created_date, name) values (now(), 'USER');
insert into _role (created_date, name) values (now(), 'ADMIN');
insert into _role (created_date, name) values (now(), 'EXPLOITANT');
insert into _role (created_date, name) values (now(), 'TRAIT_CHEQUE');
insert into _role (created_date, name) values (now(), 'TRAIT_EFFET');

