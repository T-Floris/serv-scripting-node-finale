create database if not exists personale;

use personale;

drop table if exists persons;

CREATE TABLE `persons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(48) NOT NULL,
  `lname` varchar(48) NOT NULL,
  `email` varchar(48) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
