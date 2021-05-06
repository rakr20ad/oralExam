create table admin
(
    firstName varchar(50)  not null,
    lastName  varchar(50)  not null,
    email     varchar(255) not null,
    password  varchar(50)  not null,
    online    bit default 0,
    id        int identity
        constraint admin_pk
            primary key nonclustered
)
go

create unique index admin_email_uindex
    on admin (email)
go

create table datingUser
(
    id               int identity
        constraint users_pk
            primary key nonclustered,
    firstName        varchar(50) not null,
    lastName         varchar(40) not null,
    email            varchar(50) not null,
    password         varchar(50) not null,
    age              int         not null,
    city             varchar(50) not null,
    country          varchar(3)  not null,
    gender           varchar(20),
    preferred_gender varchar(20) not null,
    online           bit default 0
)
go

create unique index users_id_uindex
    on datingUser (id)
go

create unique index users_email_uindex
    on datingUser (email)
go

create table dislikes
(
    id                 int identity
        constraint dislikes_pk
            primary key nonclustered,
    dislikeSender_id   int not null
        constraint dislikes_datingUser_id_fk
            references datingUser,
    dislikeReceiver_id int not null
        constraint dislikes_datingUser_id_fk_2
            references datingUser,
    createdAt          date default getdate()
)
go

create table likes
(
    sender_id   int not null
        constraint likes_datingUser_id_fk
            references datingUser,
    receiver_id int not null
        constraint likes_datingUser_id_fk_2
            references datingUser,
    id          int identity
        constraint likes_pk
            primary key nonclustered
)
go

create index likes_receiver_id_index
    on likes (receiver_id)
go

create index likes_sender_id_index
    on likes (sender_id)
go

create table matches
(
    like_id   int not null
        constraint matches_pk
            primary key nonclustered
        constraint matches_likes_id_fk
            references likes,
    user1     int
        constraint matches_datingUser_id_fk
            references datingUser,
    user2     int
        constraint matches_datingUser_id_fk_2
            references datingUser,
    createdAt date default getdate()
)
go