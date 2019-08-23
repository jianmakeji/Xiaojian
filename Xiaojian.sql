# Host: 192.168.3.110  (Version 5.6.28-log)
# Date: 2019-08-23 16:49:24
# Generator: MySQL-Front 6.0  (Build 2.25)


#
# Structure for table "class"
#

CREATE TABLE `class` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(30) NOT NULL DEFAULT '',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "class"
#


#
# Structure for table "course"
#

CREATE TABLE `course` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(60) NOT NULL DEFAULT '',
  `courseAbstract` varchar(255) DEFAULT NULL,
  `h5Address` varchar(100) DEFAULT NULL,
  `courseThumb` varchar(80) DEFAULT NULL,
  `courseType` tinyint(3) NOT NULL DEFAULT '0' COMMENT '0:基础课程 1：辅助课程 2：体育课程',
  `courseSubType` smallint(6) DEFAULT NULL COMMENT '0:成语故事 1：儿童诗歌 2：常识 3：美术 4：篮球',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "course"
#


#
# Structure for table "course_choose"
#

CREATE TABLE `course_choose` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `shopId` int(11) NOT NULL DEFAULT '0',
  `courseNumber` tinyint(3) DEFAULT NULL COMMENT '1: 9:00-10:00 2:13:00-14:00 3:16:00-17:00 4:19:00-20:00',
  `teacherId` int(11) NOT NULL DEFAULT '0',
  `courseAId` int(11) DEFAULT NULL,
  `courseBId` int(11) DEFAULT NULL,
  `classId` int(11) NOT NULL DEFAULT '0' COMMENT '班级ID',
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `shopId` (`shopId`,`teacherId`,`courseAId`,`courseBId`,`classId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "course_choose"
#


#
# Structure for table "course_student"
#

CREATE TABLE `course_student` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `courseId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `courseId` (`courseId`,`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "course_student"
#


#
# Structure for table "role"
#

CREATE TABLE `role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "role"
#

INSERT INTO `role` VALUES (1,'manage'),(2,'teacher'),(3,'student');

#
# Structure for table "shop"
#

CREATE TABLE `shop` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `shopName` varchar(60) NOT NULL DEFAULT '',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "shop"
#


#
# Structure for table "user"
#

CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(60) NOT NULL DEFAULT '',
  `shopId` int(11) NOT NULL DEFAULT '0',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "user"
#


#
# Structure for table "user_role"
#

CREATE TABLE `user_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT '0',
  `roleId` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `userId` (`userId`,`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "user_role"
#

